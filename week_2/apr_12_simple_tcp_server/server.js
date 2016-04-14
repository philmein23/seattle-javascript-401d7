'use strict';
const net = require('net');
const fs = require('fs');

net.createServer((socket) => {
  var ct = new Date();
  var log = fs.createWriteStream(__dirname + '/log/' + ct);
  socket.pipe(log);
  socket.on('data', () => {
    socket.end('' + ct);
  });
}).listen(3000);
