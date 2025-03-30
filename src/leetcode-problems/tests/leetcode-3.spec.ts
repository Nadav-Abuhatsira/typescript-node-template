import expect from 'expect';

describe('leetcode problems tests 3', () => {
  context('2095. Delete the Middle Node of a Linked List', () => {
    //You are given the head of a linked list. Delete the middle node, and return the head of the modified linked list.
    // The middle node of a linked list of size n is the ⌊n / 2⌋th node from the start using 0-based indexing, where ⌊x⌋ denotes the largest integer less than or equal to x.
    // For n = 1, 2, 3, 4, and 5, the middle nodes are 0, 1, 1, 2, and 2, respectively.

    class ListNode {
      val: number;

      next: ListNode | null;

      constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
      }
    }

    function listFromArray(array: number[] | null): ListNode | null {
      if (array == null) return null;
      let head: ListNode | null = null;
      for (let i = array.length - 1; i >= 0; i--) {
        head = new ListNode(array[i], head);
      }
      return head;
    }

    function listToArray(head: ListNode | null): number[] {
      const arr: number[] = [];
      let curNode: ListNode | null = head;
      if (curNode == null) return arr;
      arr.push(curNode.val);
      while (curNode.next != null) {
        arr.push(curNode.val);
        curNode = curNode.next;
      }
      return arr;
    }

    function deleteMiddle(head: ListNode | null): ListNode | null {
      if (head == null) return null;
      let listLen = 1;
      let curNode: ListNode | null = head;
      while (curNode.next != null) {
        listLen++;
        curNode = curNode.next;
      }
      const n = Math.floor(listLen / 2);
      if (n === 0) return null;

      curNode = head;
      for (let i = 0; i < n - 1; i++) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        curNode = curNode?.next;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const middle = curNode.next;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      curNode.next = middle.next;
      return head;
    }

    it('should work', () => {
      expect(listToArray(deleteMiddle(listFromArray([2, 1])))).toEqual([2]);
    });
  });
});
