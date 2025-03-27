export default class NumCount {
  private dict: Record<number, number> = {};

  public get(num: number): number {
    const count = this.dict[num];
    return count != null ? count : 0;
  }

  public add(num: number): void {
    this.dict[num] = this.get(num) + 1;
  }
}
