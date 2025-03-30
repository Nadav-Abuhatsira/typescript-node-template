export class Queue<T> {
  private items: { [key: number]: T };

  private headIndex: number;

  private tailIndex: number;

  constructor() {
    this.items = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  enqueue(item: T): void {
    this.items[this.tailIndex] = item;
    this.tailIndex++;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const item = this.items[this.headIndex];
    delete this.items[this.headIndex];
    this.headIndex++;
    return item;
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.headIndex];
  }

  isEmpty(): boolean {
    return this.headIndex === this.tailIndex;
  }

  size(): number {
    return this.tailIndex - this.headIndex;
  }

  clear(): void {
    this.items = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }
}
