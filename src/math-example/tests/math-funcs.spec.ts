import expect from 'expect';
import MathFuncs from '../math-funcs';

describe('MathFuncs tests', () => {
  it('multiply', () => {
    expect(MathFuncs.multiply(3, 4)).toBe(12);
  });

  context('factorial', () => {
    it('simple case', () => {
      expect(MathFuncs.factorial(1)).toBe(1);
      expect(MathFuncs.factorial(2)).toBe(2);
      expect(MathFuncs.factorial(3)).toBe(6);
      expect(MathFuncs.factorial(4)).toBe(24);
      expect(MathFuncs.factorial(5)).toBe(120);
    });

    it('edge case', () => {
      expect(MathFuncs.factorial(-1)).toBe(1);
      expect(MathFuncs.factorial(0)).toBe(1);
    });
  });
});
