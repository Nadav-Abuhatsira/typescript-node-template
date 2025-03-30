import expect from 'expect';
import { listFromArray, ListNode, listToArray } from '../List';

describe('leetcode problems tests 3', () => {
  context('2095. Delete the Middle Node of a Linked List', () => {
    //You are given the head of a linked list. Delete the middle node, and return the head of the modified linked list.
    // The middle node of a linked list of size n is the ⌊n / 2⌋th node from the start using 0-based indexing, where ⌊x⌋ denotes the largest integer less than or equal to x.
    // For n = 1, 2, 3, 4, and 5, the middle nodes are 0, 1, 1, 2, and 2, respectively.

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

  context('328. Odd Even Linked List', () => {
    // Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.
    // The first node is considered odd, and the second node is even, and so on.
    // Note that the relative order inside both the even and odd groups should remain as it was in the input.
    // You must solve the problem in O(1) extra space complexity and O(n) time complexity.

    function oddEvenList(head: ListNode | null): ListNode | null {
      if (head == null) return null;
      let oddHead: ListNode | null = null;
      let evenHead: ListNode | null = null;
      let oddTail: ListNode | null = null;
      let evenTail: ListNode | null = null;

      let isOdd = true;
      let curNode: ListNode | null = head;
      while (curNode != null) {
        if (isOdd) {
          if (oddHead == null) oddHead = curNode;
          if (oddTail != null) oddTail.next = curNode;
          oddTail = curNode;
        } else {
          //even
          if (evenHead == null) evenHead = curNode;
          if (evenTail != null) evenTail.next = curNode;
          evenTail = curNode;
        }
        curNode = curNode.next;
        isOdd = !isOdd;
      }

      if (oddTail != null) oddTail.next = evenHead;
      if (evenTail != null) evenTail.next = null;

      return oddHead;
    }

    it('should work', () => {
      expect(listToArray(oddEvenList(listFromArray([1, 2, 3, 4, 5])))).toEqual([1, 3, 5, 2, 4]);
    });
  });

  context('206. Reverse Linked List', () => {
    // Given the head of a singly linked list, reverse the list, and return the reversed list.

    function reverseList(head: ListNode | null): ListNode | null {
      if (head == null) return null;
      let reversedHead: ListNode | null = null;
      let currNode: ListNode | null = head;
      while (currNode != null) {
        const prevHead = reversedHead;
        reversedHead = currNode;
        currNode = currNode.next;
        reversedHead.next = prevHead;
      }
      return reversedHead;
    }

    it('should work', () => {
      expect(listToArray(reverseList(listFromArray([1, 2, 3, 4, 5])))).toEqual([5, 4, 3, 2, 1]);
    });
  });
});
