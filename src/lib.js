const lineCounter = function(data) {
  let numberOfLines = data.split('\n').length;
  if (data[data.length - 1] === '\n') return numberOfLines - 1;
  return numberOfLines;
};

const wordCounter = function(data) {
  return data
    .split('\n')
    .join(' ')
    .split(' ')
    .filter(x => x !== '').length;
};

const characterCounter = function(data) {
  return data.split('').length;
};

const wc = function(args, reader) {
  let content = reader(args[0], 'utf8');
  let wordCount = wordCounter(content);
  let characterCount = characterCounter(content);
  let lineCount = lineCounter(content);
  return ['', lineCount, wordCount, characterCount].join('\t') + ` ${args[0]}`;
};

module.exports = { wc };
