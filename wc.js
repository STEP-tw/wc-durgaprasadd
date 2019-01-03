const { wc } = require('./src/lib.js');
const readFile = require('fs').readFile;

wc(process.argv.slice(2), readFile, console);
