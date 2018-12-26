const assert = require('assert');
const { wc } = require('../src/lib.js');

const contents = {
  file: 'a',
  file1: 'a\n',
  file2: 'a b\nc d'
};

const reader = fileName => contents[fileName];

describe('wc', () => {
  it('should return wordCount, lineCount and characterCount', () => {
    let actual = wc(['file'], reader);
    let expected = '\t0\t1\t1 file';
    assert.deepEqual(actual, expected);
  });
  it('should return lineCount of how many \\n characters present', () => {
    let actual = wc(['file1'], reader);
    let expected = '\t1\t1\t2 file1';
    assert.deepEqual(actual, expected);
  });
  it('should return only count which present in args', () => {
    let actual = wc(['-l', 'file1'], reader);
    let expected = '\t1 file1';
    assert.deepEqual(actual, expected);

    actual = wc(['-w', 'file1'], reader);
    expected = '\t1 file1';
    assert.deepEqual(actual, expected);

    actual = wc(['-c', 'file1'], reader);
    expected = '\t2 file1';
    assert.deepEqual(actual, expected);
  });
});
