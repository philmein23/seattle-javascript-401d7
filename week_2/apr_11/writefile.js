const fs = require('fs');

const writeOut = fs.createWriteStream(__dirname + '/writeout.txt');

process.stdin.pipe(writeOut);
