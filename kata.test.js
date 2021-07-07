/* globals describe, expect, it */
// Wallaby with Quaokka
// Paradigma TDD

const kata = require('./kata');

describe('kata', () => {
  test('should return 76642 with 46672', () => {
    const expected = 76642;
    const result = kata(46672);
    expect(result).toEqual(expected);
  });
});
