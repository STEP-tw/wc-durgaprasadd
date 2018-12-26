const { parse } = require('../src/parser.js');
const assert = require('assert');

describe('parse', () => {
  it('should return default options if args not contains any options', () => {
    let actual = parse(['file']);
    let expected = { options: ['-l', '-w', '-c'], fileName: 'file' };
    assert.deepEqual(actual, expected);
  });
});
