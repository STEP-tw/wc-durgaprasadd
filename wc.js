const { wc } = require('./src/lib.js');
const readFileSync = require('fs').readFileSync;

console.log(wc(process.argv.slice(2), readFileSync));
