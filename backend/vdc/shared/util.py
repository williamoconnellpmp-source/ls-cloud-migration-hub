import os
import json
import uuid
import base64
import hashlib
from datetime import datetime, timezone

import boto3

# ====== AWS clients ======
s3 = boto3.client("s3")
ddb = boto3.resource("dynamodb")

# NOTE: QLDB has a session API; simplest v1 approach is to log an audit event to DynamoDB as well,
# and add QLDB write in the next iteration once ledger is created.
# We'll include a safe stub so code doesn't break if QLDB env vars are not set.
qldb = boto3.client("qldb-session")


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def response(status_code: int, body: dict):
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": os.environ.get("CORS_ALLOW_ORIGIN", "*"),
            "Access-Control-Allow-Headers": "Content-Type,Authorization",
            "Access-Control-Allow-Methods": "POST,OPTIONS",
        },
        "body": json.dumps(body),
    }


def get_user_context(event: dict) -> dict:
    """
    Expecting API Gateway JWT authorizer to inject claims.
    If not present (early dev), fall back to anonymous placeholders.
    """
    try:
        claims = event["requestContext"]["authorizer"]["jwt"]["claims"]
        user_id = claims.get("sub", "unknown")
        username = claims.get("cognito:username", claims.get("username", "unknown"))
        groups = claims.get("cognito:groups", "")
        # groups might be a string like "Uploaders,Approvers" or missing
        if isinstance(groups, str):
            group_list = [g.strip() for g in groups.split(",") if g.strip()]
        elif isinstance(groups, list):
            group_list = groups
        else:
            group_list = []
        return {"userId": user_id, "username": username, "groups": group_list}
    except Exception:
        return {"userId": "anonymous", "username": "anonymous", "groups": []}


def require_uploader(ctx: dict):
    # In early dev, allow anonymous; once Cognito is wired, enforce group.
    if os.environ.get("ENFORCE_AUTH", "false").lower() == "true":
        if "Uploaders" not in ctx.get("groups", []):
            raise PermissionError("Uploader role required")


def sha256_of_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def handler(event, context):
    # Handle preflight
    if event.get("httpMethod") == "OPTIONS":
        return response(200, {"ok": True})

    # Config
    bucket = os.environ["DOCS_BUCKET"]
    table_name = os.environ["DDB_TABLE"]
    env_name = os.environ.get("ENV_NAME", "dev")
    presign_ttl = int(os.environ.get("PRESIGN_TTL_SECONDS", "900"))

    table = ddb.Table(table_name)

    # User context
    ctx = get_user_context(event)
    try:
        require_uploader(ctx)
    except PermissionError as e:
        return response(403, {"error": str(e)})

    # Parse request
    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return response(400, {"error": "Invalid JSON body"})

    filename = body.get("filename")
    content_type = body.get("contentType", "application/octet-stream")

    if not filename or not isinstance(filename, str):
        return response(400, {"error": "filename is required"})

    # Optional: caller can provide sha256 to bind the expected upload; we can store it.
    expected_sha256 = body.get("expectedSha256")

    document_id = str(uuid.uuid4())
    created_at = utc_now_iso()

    # Store documents under a predictable prefix
    s3_key = f"{env_name}/documents/{document_id}/{filename}"

    # Generate presigned PUT URL
    try:
        presigned_url = s3.generate_presigned_url(
            ClientMethod="put_object",
            Params={
                "Bucket": bucket,
                "Key": s3_key,
                "ContentType": content_type,
                # NOTE: We do not enforce checksum at presign here; we will verify on submit step.
            },
            ExpiresIn=presign_ttl,
        )
    except Exception as e:
        return response(500, {"error": f"Failed to generate presigned URL: {str(e)}"})

    # Write initial metadata record (DRAFT)
    item = {
        "pk": f"DOC#{document_id}",
        "sk": "METADATA",
        "documentId": document_id,
        "title": None,
        "description": None,
        "ownerUserId": ctx["userId"],
        "ownerUsername": ctx["username"],
        "status": "DRAFT",
        "s3Bucket": bucket,
        "s3Key": s3_key,
        "s3VersionId": None,
        "contentType": content_type,
        "expectedSha256": expected_sha256,
        "sha256": None,
        "createdAt": created_at,
        "updatedAt": created_at,
    }

    try:
        table.put_item(Item=item)
    except Exception as e:
        return response(500, {"error": f"Failed to write metadata to DynamoDB: {str(e)}"})

    # Audit event (v1: store as a lightweight record in the same table or separate; for now, same table)
    audit_id = str(uuid.uuid4())
    audit_item = {
        "pk": f"DOC#{document_id}",
        "sk": f"AUDIT#{created_at}#{audit_id}",
        "eventId": audit_id,
        "eventType": "DOC_UPLOAD_INITIATED",
        "timestampUtc": created_at,
        "actorUserId": ctx["userId"],
        "actorUsername": ctx["username"],
        "actorGroups": ctx.get("groups", []),
        "details": {
            "filename": filename,
            "contentType": content_type,
            "env": env_name,
        },
        "integrity": {
            "s3Bucket": bucket,
            "s3Key": s3_key,
            "s3VersionId": None,
            "sha256": expected_sha256,
        },
    }

    try:
        table.put_item(Item=audit_item)
    except Exception as e:
        # Don't block user if audit write fails, but return warning
        return response(
            200,
            {
                "documentId": document_id,
                "upload": {
                    "bucket": bucket,
                    "key": s3_key,
                    "contentType": content_type,
                    "presignedUrl": presigned_url,
                    "expiresInSeconds": presign_ttl,
                },
                "warning": f"Metadata saved but audit write failed: {str(e)}",
            },
        )

    return response(
        200,
        {
            "documentId": document_id,
            "upload": {
                "bucket": bucket,
                "key": s3_key,
                "contentType": content_type,
                "presignedUrl": presigned_url,
                "expiresInSeconds": presign_ttl,
            },
        },
    )
