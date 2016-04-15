const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write('{"msg": "hello world"}\n');
  res.end();
}).listen(3000, () => console.log('server up'));
