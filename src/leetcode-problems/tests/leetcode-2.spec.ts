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
            hist.subtract(comp);
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

  context('643. Maximum Average Subarray I', () => {
    // You are given an integer array nums consisting of n elements, and an integer k.
    // Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value. Any answer with a calculation error less than 10-5 will be accepted.

    function findMaxAverage(nums: number[], k: number): number {
      let max = Number.MIN_SAFE_INTEGER;
      for (let i = 0; i <= nums.length - k; i++) {
        let sum = 0;
        for (let j = i; j < i + k; j++) {
          sum += nums[j];
        }
        max = Math.max(max, sum);
      }
      return max / k;
    }

    it('should work', () => {
      expect(findMaxAverage([1, 12, -5, -6, 50, 3], 4)).toEqual(12.75);
      expect(findMaxAverage([5], 1)).toEqual(5);
      expect(findMaxAverage([-1], 1)).toEqual(-1);
    });
  });

  context('1456. Maximum Number of Vowels in a Substring of Given Length', () => {
    // Given a string s and an integer k, return the maximum number of vowel letters in any substring of s with length k.

    function isVowel(s: string): boolean {
      return s === 'a' || s === 'e' || s === 'i' || s === 'o' || s === 'u';
    }

    function maxVowels(s: string, k: number): number {
      let max = 0;
      let curSubStringVowels = 0;
      for (let i = 0; i < k; i++) {
        if (isVowel(s[i])) curSubStringVowels++;
      }
      max = curSubStringVowels;
      for (let i = k; i < s.length; i++) {
        if (isVowel(s[i - k])) curSubStringVowels--;
        if (isVowel(s[i])) curSubStringVowels++;
        max = Math.max(max, curSubStringVowels);
      }
      return max;
    }

    it('should work', () => {
      expect(maxVowels('abciiidef', 3)).toEqual(3);
      expect(maxVowels('aeiou', 2)).toEqual(2);
      expect(maxVowels('leetcode', 3)).toEqual(2);
      expect(maxVowels('tryhard', 4)).toEqual(1);
    });
  });

  context("1493. Longest Subarray of 1's After Deleting One Element", () => {
    // Given a binary array nums, you should delete one element from it.
    // Return the size of the longest non-empty subarray containing only 1's in the resulting array. Return 0 if there is no such subarray.

    function longestSubarray(nums: number[]): number {
      let max = 0;
      let prevNum = undefined;
      let s1 = 0;
      let s2 = 0;
      for (let i = 0; i < nums.length; i++) {
        const currNum = nums[i];
        if (currNum === 0 && prevNum === 0) {
          max = Math.max(max, s1 + s2);
          s1 = s2 = 0;
        }
        if (currNum === 1) {
          if (prevNum === 0 || prevNum === undefined) {
            if (s1 > 0 && s2 > 0) {
              max = Math.max(max, s1 + s2);
              s1 = s2;
              s2 = 0;
            }
            if (s1 === 0) s1++;
            else s2++;
          } else if (prevNum === 1) {
            if (s2 === 0) s1++;
            else s2++;
          }
        }

        prevNum = currNum;
      }
      max = Math.max(max, s1 + s2);
      if (max === nums.length) return max - 1;
      return max;
    }

    it('should work', () => {
      expect(longestSubarray([1, 1, 0, 1])).toEqual(3);
      expect(longestSubarray([0, 1, 1, 1, 0, 1, 1, 0, 1])).toEqual(5);
      expect(longestSubarray([1, 1, 1])).toEqual(2);
    });
  });
});
