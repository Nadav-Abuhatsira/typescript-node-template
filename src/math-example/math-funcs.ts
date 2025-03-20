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
}
