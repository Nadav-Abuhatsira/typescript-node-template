export default class MathFuncs {
  public static multiply(n1: number, n2: number): number {
    return n1 * n2;
  }

  public static factorial(n: number): number {
    let mult = 1;
    for (let i = 2; i <= n; i++) {
      mult *= i;
    }
    return mult;
  }

  public static IsUpperCaseWord(str: string): boolean {
    if (str == null || str.length == 0) return false;

    const firstLetter = str.charAt(0);
    if (!(firstLetter >= 'A'.charAt(0) && firstLetter <= 'Z'.charAt(0))) return false;
    for (let i = 1; i < str.length; i++) {
      const letter = str.charAt(i);
      if (!(letter >= 'a'.charAt(0) && letter <= 'z'.charAt(0))) return false;
    }
    return true;
  }

  public static isLetter(str: string): boolean {
    //return str.length === 1 && str.match(/[a-zA-Z]/);
    if (str == null || str.length == 0) return false;
    const firstLetter = str.charAt(0);
    if (
      (firstLetter >= 'A'.charAt(0) && firstLetter <= 'Z'.charAt(0)) ||
      (firstLetter >= 'a'.charAt(0) && firstLetter <= 'z'.charAt(0))
    )
      return true;
    return false;
  }

  public static capitalizeWord(str: string): string {
    if (str == null || str.length == 0) return str;

    let resStr = '';
    let foundValidFirst = false;
    for (let i = 0; i < str.length; i++) {
      const letter = str[i];
      if (!foundValidFirst && MathFuncs.isLetter(str[i])) {
        foundValidFirst = true;
        resStr += letter.toUpperCase();
        continue;
      }
      if (foundValidFirst && MathFuncs.isLetter(str[i])) {
        resStr += letter.toLowerCase();
      }
    }
    return resStr;
  }
}
