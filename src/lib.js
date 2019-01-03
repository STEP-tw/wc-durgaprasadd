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

const getWcResult = function(optionArgs, fileNames, fileContents) {
  if (fileNames.length == 1) {
    return (
      wcForSingleFile(optionArgs, fileContents, fileNames[0]).join('\t') +
      ' ' +
      fileNames[0]
    );
  }

  let counts = fileNames.map(
    wcForSingleFile.bind(null, optionArgs, fileContents)
  );

  counts.push(totalOfWc(counts));
  fileNames.push('total');
  return outputFormat(counts, fileNames).join('\n');
};

const getContent = function(
  optionArgs,
  fileNames,
  fileContents,
  range,
  reader,
  print,
  fileName
) {
  reader(fileName, 'utf8', (err, data) => {
    fileContents[fileName] = data;
    if (Object.keys(fileContents).length == range) {
      print.log(getWcResult(optionArgs, fileNames, fileContents));
    }
  });
};

const wc = function(args, reader, print) {
  let { optionArgs, fileNames } = parse(args);
  let uniqFileNames = fileNames.reduce((list, element) => {
    if (!list.includes(element)) list.push(element);
    return list;
  }, []);
  let getContentsBound = getContent.bind(
    null,
    optionArgs,
    fileNames,
    {},
    uniqFileNames.length,
    reader,
    print
  );
  uniqFileNames.forEach(getContentsBound);
};

const wcForSingleFile = function(options, fileContents, fileName) {
  const optionFunctions = {
    lineCount: lineCounter,
    wordCount: wordCounter,
    characterCount: characterCounter
  };
  let content = fileContents[fileName];
  return options.map(option => optionFunctions[option](content));
};

module.exports = { wc, wcForSingleFile };
