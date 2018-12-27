const parse = function(args) {
  let options = args.filter(arg => arg.startsWith('-'));
  let fileNames = args.slice(options.length);
  if (options.length == 0) {
    options = ['-l', '-w', '-c'];
  }
  return { options, fileNames };
};

module.exports = { parse };
