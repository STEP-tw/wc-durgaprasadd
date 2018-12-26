const assert = require('assert');
const { wc } = require('../src/lib.js');

const contents = {
  file: 'a',
  file1: 'a b\nc d'
};

const reader = fileName => contents[fileName];

describe('wc', () => {
  it('should return wordCount, lineCount and characterCount', () => {
    let actual = wc(['file'], reader);
    let expected = '\t1\t1\t1 file';
    assert.deepEqual(actual, expected);
  });
});
