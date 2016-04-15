const http = require('http');

module.exports = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write('{"msg" : "hello world!"}');
  res.end();
}).listen(3000, () => console.log('server up'));
