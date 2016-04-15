const http = require('http');
const jsonPromise = require(__dirname + '/lib/json_promise');

http.createServer((req, res) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    return jsonPromise(req)
      .then((reqBody) => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write('{"msg": "valid json!"}');
      }, (err) => {
        console.log(err); 
        res.writeHead(422, {'Content-Type': 'application/json'});
        res.write('{"msg": "invalid json"}');
      }).then(() => {
        res.end();
      });
  }

  res.writeHead(404, {
    'Content-Type': 'application/json'
  });

  res.write('{"msg":"not found"}');
  res.end();
}).listen(3000, () => console.log('server up'));
