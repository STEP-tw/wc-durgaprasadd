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
const totalOfWc = function(wcOfAllFiles) {
  let total = [];
  for (let index = 0; index < wcOfAllFiles[0].length; index++) {
    total.push(wcOfAllFiles.reduce((x, y) => y[index] + x, 0));
  }
  return total;
};
const outputFormat = function(wcOfAllFiles, fileNames) {
  return wcOfAllFiles.map((x, i) => x.join('\t') + ' ' + fileNames[i]);
};

const wc = function(args, reader) {
  let { optionArgs, fileNames } = parse(args);
  if (fileNames.length == 1) {
    return (
      wcForSingleFile(optionArgs, reader, fileNames[0]).join('\t') +
      ' ' +
      fileNames[0]
    );
  }
  let output = fileNames.map(wcForSingleFile.bind(null, optionArgs, reader));
  output.push(totalOfWc(output));
  fileNames.push('total');
  return outputFormat(output, fileNames).join('\n');
};

const wcForSingleFile = function(options, reader, fileName) {
  const optionFunctions = {
    lineCount: lineCounter,
    wordCount: wordCounter,
    characterCount: characterCounter
  };
  let content = reader(fileName, 'utf8');
  return options.map(option => optionFunctions[option](content));
};

module.exports = { wc, wcForSingleFile };
