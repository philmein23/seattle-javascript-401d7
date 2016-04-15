const net = require('net');

const server = net.createServer((socket) => {
  socket.on('data', (chunk) => {
    //DO SOMETHING WITH THE CHUNK
  });
});
