const getLongOptions = function(optionArgs) {
  const options = {
    lineCount: 'l',
    wordCount: 'w',
    characterCount: 'c'
  };
  return Object.keys(options).filter(option =>
    optionArgs.includes(options[option])
  );
};

const parse = function(args) {
  let index = 0;
  let optionArgs = [];
  while (args[index].startsWith('-')) {
    optionArgs = optionArgs.concat(args[index].slice(1).split(''));
    index++;
  }

  optionArgs = getLongOptions(optionArgs);

  let fileNames = args.slice(index);

  if (index == 0) {
    optionArgs = ['lineCount', 'wordCount', 'characterCount'];
  }

  return { optionArgs, fileNames };
};

module.exports = { parse };
