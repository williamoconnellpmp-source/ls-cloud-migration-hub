function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Don’t rewrite real files (has an extension)
  if (uri.indexOf('.') !== -1) return request;

  // Don’t rewrite Next/static asset paths
  if (uri.startsWith('/_next') || uri.startsWith('/images') || uri.startsWith('/icons')) {
    return request;
  }

  // Normalize directory-style routes to index.html
  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
    return request;
  }

  // If it's a "route" like /life-sciences or /vdc, serve /route/index.html
  request.uri = uri + '/index.html';
  return request;
}
