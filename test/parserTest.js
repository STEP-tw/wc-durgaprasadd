const { parse } = require('../src/parser.js');
const assert = require('assert');

describe('parse', () => {
  it('should return default options if args not contains any options', () => {
    let actual = parse(['file']);
    let expected = {
      optionArgs: ['lineCount', 'wordCount', 'characterCount'],
      fileNames: ['file']
    };
    assert.deepEqual(actual, expected);
  });
  it('should return options of args contains', () => {
    let actual = parse(['-l', '-w', 'file']);
    let expected = {
      optionArgs: ['lineCount', 'wordCount'],
      fileNames: ['file']
    };
    assert.deepEqual(actual, expected);
  });
});
