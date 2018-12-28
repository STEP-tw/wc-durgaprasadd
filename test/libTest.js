const assert = require('assert');
const { wc, wcForSingleFile } = require('../src/lib.js');

const contents = {
  file: 'a',
  file1: 'a\n',
  file2: 'a b\nc d'
};

const reader = fileName => contents[fileName];

describe('wc', () => {
  it('should return wordCount, lineCount and characterCount', () => {
    let actual = wc(['file'], reader);
    let expected = '0\t1\t1 file';
    assert.deepEqual(actual, expected);
  });
  it('should return lineCount of how many \\n characters present', () => {
    let actual = wc(['file1'], reader);
    let expected = '1\t1\t2 file1';
    assert.deepEqual(actual, expected);
  });
  it('should return only count which present in args', () => {
    let actual = wc(['-l', 'file1'], reader);
    let expected = '1 file1';
    assert.deepEqual(actual, expected);

    actual = wc(['-w', 'file1'], reader);
    expected = '1 file1';
    assert.deepEqual(actual, expected);

    actual = wc(['-c', 'file1'], reader);
    expected = '2 file1';
    assert.deepEqual(actual, expected);
  });
  it('should return combined counts when args contains combined options', () => {
    let actual = wc(['-wl', 'file1'], reader);
    let expected = '1\t1 file1';
    assert.deepEqual(actual, expected);
  });
  it('should return total for multiple files', () => {
    let actual = wc(['-wl', 'file', 'file1'], reader);
    let expected = ['0\t1 file', '1\t1 file1', '1\t2 total'].join('\n');
    assert.deepEqual(actual, expected);
  });
});

describe('wcForSingleFile', () => {
  it('should return counts of singleFile for the options given', () => {
    let actual = wcForSingleFile(['lineCount', 'wordCount'], reader, 'file');
    let expected = [0, 1];
    assert.deepEqual(actual, expected);
  });
});
