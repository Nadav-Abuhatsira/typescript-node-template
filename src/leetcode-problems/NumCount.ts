export default class NumCount<FROM> {
  private dict: Map<FROM, number> = new Map();

  public get(num: FROM): number {
    const count = this.dict.get(num);
    return count != null ? count : 0;
  }

  public add(num: FROM): void {
    this.dict.set(num, this.get(num) + 1);
  }

  public subtract(num: FROM): void {
    this.dict.set(num, this.get(num) - 1);
  }

  public contains(num: FROM): boolean {
    return this.dict.get(num) != undefined;
  }

  public getKeys(): FROM[] {
    return [...this.dict.keys()];
  }

  public getValues(): number[] {
    return [...this.dict.values()];
  }
}
