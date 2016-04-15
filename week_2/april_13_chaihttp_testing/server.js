const http = require('http');

const server = module.exports = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/someroute') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>wow such GET</h1>');
    return res.end();
  }

  if (req.method === 'POST' && req.url === '/someroute'){
    req.on('data', (data) => {
      var parsed = JSON.parse(data);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(parsed.never);
      return res.end();
    });
   return;
  }


  // if it gets to here then it is a 404
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.write('this be a 404 message, yo');
  return res.end();
});

server.listen(3000, () => process.stdout.write('server up on 3000'));
