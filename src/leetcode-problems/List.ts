export class ListNode {
  val: number;

  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function listFromArray(array: number[] | null): ListNode | null {
  if (array == null) return null;
  let head: ListNode | null = null;
  for (let i = array.length - 1; i >= 0; i--) {
    head = new ListNode(array[i], head);
  }
  return head;
}

export function listToArray(head: ListNode | null): number[] {
  const arr: number[] = [];
  let curNode: ListNode | null = head;
  if (curNode == null) return arr;
  while (curNode != null) {
    arr.push(curNode.val);
    curNode = curNode.next;
  }
  return arr;
}
