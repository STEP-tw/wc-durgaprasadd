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
  it('should return combined counts when args contains combined options', () => {
    let actual = wc(['-wl', 'file1'], reader);
    let expected = '\t1\t1 file1';
    assert.deepEqual(actual, expected);
  });
  it('should return total for multiple files', () => {
    let actual = wc(['-wl', 'file', 'file1'], reader);
    let expected = ['\t0\t1 file', '\t1\t1 file1', '\t1\t2 total'].join('\n');
    assert.deepEqual(actual, expected);
  });
});

describe('wcForSingleFile', () => {
  it('should return counts of singleFile for the options given', () => {
    let actual = wcForSingleFile(['-l', '-w'], reader, 'file');
    let expected = ['', 0, 1];
    assert.deepEqual(actual, expected);
  });
  it('should return counts of singleFile for combined options also', () => {
    let actual = wcForSingleFile(['-wl'], reader, 'file');
    let expected = ['', 0, 1];
    assert.deepEqual(actual, expected);
  });
});
