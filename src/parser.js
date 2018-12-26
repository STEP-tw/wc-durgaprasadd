const parse = function(args) {
  let options = args.filter(arg => arg.startsWith('-'));
  let fileName = args[options.length];
  if (options.length == 0) {
    options = ['-l', '-w', '-c'];
  }
  return { options, fileName };
};

module.exports = { parse };
