ar http = require('http');
var handleRequest = function(request, response) {
console.log('Received request for URL: ' + request.url);
response.writeHead(200);
response.end('Hello Guo Da Niu!');
};
var www = http.createServer(handleRequest);
www.listen(3000);