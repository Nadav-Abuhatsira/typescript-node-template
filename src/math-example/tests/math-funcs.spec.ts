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

  context('IsUpperCaseWord', () => {
    it('simple case', () => {
      expect(MathFuncs.IsUpperCaseWord('A')).toBe(true);
      expect(MathFuncs.IsUpperCaseWord('a')).toBe(false);
      expect(MathFuncs.IsUpperCaseWord('Aaaaa')).toBe(true);
      expect(MathFuncs.IsUpperCaseWord('AaaaB')).toBe(false);
      expect(MathFuncs.IsUpperCaseWord('1aaa')).toBe(false);
      expect(MathFuncs.IsUpperCaseWord('12Ab')).toBe(false);
      expect(MathFuncs.IsUpperCaseWord('abcdY')).toBe(false);
      expect(MathFuncs.IsUpperCaseWord('Abcd')).toBe(true);
      expect(MathFuncs.IsUpperCaseWord('AbCd')).toBe(false);
      expect(MathFuncs.IsUpperCaseWord('Abcd?')).toBe(false);
      expect(MathFuncs.IsUpperCaseWord('?123')).toBe(false);
      expect(MathFuncs.IsUpperCaseWord('')).toBe(false);
    });

    it('isLetter simple case', () => {
      expect(MathFuncs.isLetter('A')).toBe(true);
      expect(MathFuncs.isLetter('a')).toBe(true);
      expect(MathFuncs.isLetter('5')).toBe(false);
    });

    it('capitalizeWord simple case', () => {
      expect(MathFuncs.capitalizeWord('A')).toBe('A');
      expect(MathFuncs.capitalizeWord('hi')).toBe('Hi');
      expect(MathFuncs.capitalizeWord('5hi')).toBe('Hi');
      //12Ab - Ab
      expect(MathFuncs.capitalizeWord('12Ab')).toBe('Ab');
      // abcdY - Abcdy
      expect(MathFuncs.capitalizeWord('abcdY')).toBe('Abcdy');
      // Abcd - Abcd
      expect(MathFuncs.capitalizeWord('Abcd')).toBe('Abcd');
      // ?Abcd? - Abcd
      expect(MathFuncs.capitalizeWord('?Abcd?')).toBe('Abcd');
      // AB[cd] - Abcd
      expect(MathFuncs.capitalizeWord('AB[cd]')).toBe('Abcd');
      // a - A
      expect(MathFuncs.capitalizeWord('a')).toBe('A');
      // 123? - “”
      expect(MathFuncs.capitalizeWord('123?')).toBe('');
    });
  });
});
