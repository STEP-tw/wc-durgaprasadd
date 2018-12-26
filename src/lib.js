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
  let content = reader(args[0], 'utf8');
  let wordCount = wordCounter(content);
  let characterCount = characterCounter(content);
  let lineCount = lineCounter(content);
  return ['', lineCount, wordCount, characterCount].join('\t') + ` ${args[0]}`;
};

module.exports = { wc };
