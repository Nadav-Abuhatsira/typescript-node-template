import expect from 'expect';
import NumCount from '../NumCount';

describe('leetcode problems tests 2', () => {
  context('283. Move Zeroes', () => {
    //Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
    //Do not return anything, modify nums in-place instead.

    function moveZeroes(nums: number[]): void {
      let zeroCount = 0;
      let nextIdx = 0;
      for (let i = 0; i < nums.length; i++) {
        const currNum = nums[i];
        if (currNum === 0) {
          zeroCount++;
        } else {
          nums[nextIdx] = currNum;
          nextIdx++;
        }
      }
      for (let i = nums.length - zeroCount; i < nums.length; i++) {
        nums[i] = 0;
      }
    }

    it('should work', () => {
      let nums = [0, 1, 0, 3, 12];
      moveZeroes(nums);
      expect(nums).toEqual([1, 3, 12, 0, 0]);

      nums = [0];
      moveZeroes(nums);
      expect(nums).toEqual([0]);
    });
  });

  context('392. Is Subsequence', () => {
    //Given two strings s and t, return true if s is a subsequence of t, or false otherwise.
    // A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).

    function isSubsequence(s: string, t: string): boolean {
      if (s === '' && t === '') return true;
      let sIdx = 0;
      for (let tIdx = 0; tIdx < t.length; tIdx++) {
        if (t[tIdx] === s[sIdx]) {
          sIdx++;
        }
        if (sIdx >= s.length) return true;
      }
      return false;
    }

    it('should work', () => {
      expect(isSubsequence('abc', 'ahbgdc')).toEqual(true);
      expect(isSubsequence('axc', 'ahbgdc')).toEqual(false);
    });
  });

  context('1679. Max Number of K-Sum Pairs', () => {
    // You are given an integer array nums and an integer k.
    // In one operation, you can pick two numbers from the array whose sum equals k and remove them from the array.
    // Return the maximum number of operations you can perform on the array.

    function maxOperations(nums: number[], k: number): number {
      let ops = 0;
      const hist = new NumCount();
      for (let i = 0; i < nums.length; i++) {
        const currNum = nums[i];
        if (currNum < k) {
          const comp = k - currNum;
          if (hist.get(comp) > 0) {
            hist.subsract(comp);
            ops++;
          } else {
            hist.add(currNum);
          }
        }
      }
      return ops;
    }

    it('should work', () => {
      expect(maxOperations([1, 2, 3, 4], 5)).toEqual(2);
      expect(maxOperations([3, 1, 3, 4, 3], 6)).toEqual(1);
    });
  });
});
