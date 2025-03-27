export default class NumCount {
  private dict: Map<number, number> = new Map();

  public get(num: number): number {
    const count = this.dict.get(num);
    return count != null ? count : 0;
  }

  public add(num: number): void {
    this.dict.set(num, this.get(num) + 1);
  }

  public subtract(num: number): void {
    this.dict.set(num, this.get(num) - 1);
  }
}
