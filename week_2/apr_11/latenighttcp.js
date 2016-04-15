const net = require('net');

const server = net.createServer((socket) => {
  socket.pipe(process.stdout);
});



server.listen(3000, () => {
  process.stdout.write('server up on 3000\n');
});
