const { parse } = require('./parser.js');

const lineCounter = function(data) {
  return data.split('\n').length - 1;
};

const wordCounter = function(data) {
  return data.split(/ |\n/).filter(x => x !== '').length;
};

const characterCounter = function(data) {
  return data.length;
};

const wc = function(args, reader) {
  let { options, fileName } = parse(args);
  let content = reader(fileName, 'utf8');
  let output = '';
  if (options.includes('-l') || options[0].includes('l')) {
    output += '\t' + lineCounter(content);
  }

  if (options.includes('-w') || options[0].includes('w')) {
    output += '\t' + wordCounter(content);
  }

  if (options.includes('-c') || options[0].includes('c')) {
    output += '\t' + characterCounter(content);
  }

  return output + ' ' + fileName;
};

module.exports = { wc };
