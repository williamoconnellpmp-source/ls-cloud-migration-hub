function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // If the URI ends with '/', rewrite to '/index.html'
  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
    return request;
  }

  // If the URI has no file extension, treat it like a directory and add '/index.html'
  if (!uri.includes('.') ) {
    request.uri = uri + '/index.html';
    return request;
  }

  return request;
}
