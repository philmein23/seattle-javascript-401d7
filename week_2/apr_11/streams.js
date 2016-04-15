const fs = require('fs');

const text = fs.createReadStream(__dirname + '/bigfile.txt');


process.stdin.on('data', (chunk) => {
  chunk = chunk.toString().toUpperCase();
  process.stdout.write(chunk);
});

