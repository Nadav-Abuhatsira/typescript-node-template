import expect from 'expect';
import NumCount from '../NumCount';
import { Queue } from '../Queue';

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

  context('1732. Find the Highest Altitude', () => {
    // There is a biker going on a road trip. The road trip consists of n + 1 points at different altitudes. The biker starts his trip on point 0 with altitude equal 0.
    // You are given an integer array gain of length n where gain[i] is the net gain in altitude between points i​​​​​​ and i + 1 for all (0 <= i < n). Return the highest altitude of a point.

    function largestAltitude(gain: number[]): number {
      let max = 0;
      let gainFromStart = 0;
      for (let i = 0; i < gain.length; i++) {
        const currGain = gain[i];
        gainFromStart += currGain;
        max = Math.max(max, gainFromStart);
      }
      return max;
    }

    it('should work', () => {
      expect(largestAltitude([-5, 1, 5, 0, -7])).toEqual(1);
      expect(largestAltitude([-4, -3, -2, -1, 4, 3, 2])).toEqual(0);
    });
  });

  context('724. Find Pivot Index', () => {
    // Given an array of integers nums, calculate the pivot index of this array.
    // The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.
    // If the index is on the left edge of the array, then the left sum is 0 because there are no elements to the left. This also applies to the right edge of the array.
    // Return the leftmost pivot index. If no such index exists, return -1.

    function pivotIndex(nums: number[]): number {
      if (nums.length === 1) return 0;
      if (nums.length <= 1) return -1;
      let leftSum = nums[0];
      let rightSum = 0;
      for (let i = 2; i < nums.length; i++) rightSum += nums[i];
      if (rightSum + nums[1] === 0) return 0;
      for (let i = 1; i < nums.length - 1; i++) {
        if (leftSum === rightSum) return i;
        leftSum += nums[i];
        rightSum -= nums[i + 1];
      }
      if (leftSum === 0) return nums.length - 1;
      return -1;
    }

    it('should work', () => {
      expect(pivotIndex([1, 7, 3, 6, 5, 6])).toEqual(3);
      expect(pivotIndex([1, 2, 3])).toEqual(-1);
      expect(pivotIndex([2, 1, -1])).toEqual(0);
      expect(pivotIndex([-1, -1, 0, 1, 1, 0])).toEqual(5);
      expect(pivotIndex([-1, -1, -1, 1, 1, 1])).toEqual(-1);
      expect(pivotIndex([0])).toEqual(0);
    });
  });

  context('2215. Find the Difference of Two Arrays', () => {
    // Given two 0-indexed integer arrays nums1 and nums2, return a list answer of size 2 where:
    // answer[0] is a list of all distinct integers in nums1 which are not present in nums2.
    // answer[1] is a list of all distinct integers in nums2 which are not present in nums1.
    // Note that the integers in the lists may be returned in any order.

    function findDifference(nums1: number[], nums2: number[]): number[][] {
      const notIn1 = new NumCount<number>();
      const notIn2 = new NumCount<number>();
      const in1 = new NumCount();
      const in2 = new NumCount();

      for (let i = 0; i < nums1.length; i++) {
        in1.add(nums1[i]);
      }
      for (let i = 0; i < nums2.length; i++) {
        const n2 = nums2[i];
        in2.add(n2);
        if (!in1.contains(n2)) notIn1.add(n2);
      }

      for (let i = 0; i < nums1.length; i++) {
        const n1 = nums1[i];
        if (!in2.contains(n1)) notIn2.add(n1);
      }
      return [notIn2.getKeys(), notIn1.getKeys()];
    }

    it('should work', () => {
      expect(findDifference([1, 2, 3], [2, 4, 6])).toEqual([
        [1, 3],
        [4, 6],
      ]);
      expect(findDifference([1, 2, 3, 3], [1, 1, 2, 2])).toEqual([[3], []]);
    });
  });

  context('1207. Unique Number of Occurrences', () => {
    // Given an array of integers arr, return true if the number of occurrences of each value in the array is unique or false otherwise.

    function uniqueOccurrences(arr: number[]): boolean {
      const count = new NumCount();
      for (let i = 0; i < arr.length; i++) {
        count.add(arr[i]);
      }
      const occurrences = count.getValues();
      const occurrencesMap = new NumCount();
      for (let i = 0; i < occurrences.length; i++) {
        const occurrence = occurrences[i];
        occurrencesMap.add(occurrence);
        if (occurrencesMap.get(occurrence) > 1) return false;
      }
      return true;
    }

    it('should work', () => {
      expect(uniqueOccurrences([1, 2, 2, 1, 1, 3])).toEqual(true);
      expect(uniqueOccurrences([1, 2])).toEqual(false);
      expect(uniqueOccurrences([-3, 0, 1, -3, 1, 1, 1, -3, 10, 0])).toEqual(true);
    });
  });

  context('1657. Determine if Two Strings Are Close', () => {
    // Two strings are considered close if you can attain one from the other using the following operations:
    // Operation 1: Swap any two existing characters.
    // For example, abcde -> aecdb
    // Operation 2: Transform every occurrence of one existing character into another existing character, and do the same with the other character.
    // For example, aacabb -> bbcbaa (all a's turn into b's, and all b's turn into a's)
    // You can use the operations on either string as many times as necessary.
    // Given two strings, word1 and word2, return true if word1 and word2 are close, and false otherwise.

    const arrayEquals = (a: any[], b: any[]) => {
      if (a.length !== b.length) return false;
      else {
        // Comparing each element of your array
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) {
            return false;
          }
        }
        return true;
      }
    };

    function closeStrings(word1: string, word2: string): boolean {
      if (word1.length !== word2.length) return false;
      const letter1 = new NumCount<string>();
      const letter2 = new NumCount<string>();
      for (let i = 0; i < word1.length; i++) {
        letter1.add(word1[i]);
      }
      for (let i = 0; i < word2.length; i++) {
        letter2.add(word2[i]);
      }
      return (
        arrayEquals(letter1.getValues().sort(), letter2.getValues().sort()) &&
        arrayEquals(letter1.getKeys().sort(), letter2.getKeys().sort())
      );
    }

    it('should work', () => {
      expect(closeStrings('abc', 'bca')).toEqual(true);
      expect(closeStrings('a', 'aa')).toEqual(false);
      expect(closeStrings('cabbba', 'abbccc')).toEqual(true);
    });
  });

  context('2352. Equal Row and Column Pairs', () => {
    // Given a 0-indexed n x n integer matrix grid, return the number of pairs (ri, cj) such that row ri and column cj are equal.
    // A row and column pair is considered equal if they contain the same elements in the same order (i.e., an equal array).

    function equalPairs(grid: number[][]): number {
      const n = grid.length;
      let pairs = 0;
      for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
          let isPair = true;
          for (let i = 0; i < n; i++) {
            if (grid[row][i] !== grid[i][col]) {
              isPair = false;
              break;
            }
          }
          if (isPair) pairs++;
        }
      }
      return pairs;
    }

    it('should work', () => {
      expect(
        equalPairs([
          [3, 2, 1],
          [1, 7, 6],
          [2, 7, 7],
        ])
      ).toEqual(1);
      expect(
        equalPairs([
          [3, 1, 2, 2],
          [1, 4, 4, 5],
          [2, 4, 2, 2],
          [2, 4, 2, 2],
        ])
      ).toEqual(3);
    });
  });

  context('735. Asteroid Collision', () => {
    // We are given an array asteroids of integers representing asteroids in a row. The indices of the asteriod in the array represent their relative position in space.
    // For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.
    // Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

    function asteroidCollision(asteroids: number[]): number[] {
      let survivors: number[] = [];
      let lastGroup: number[] = [];
      for (let i = 0; i < asteroids.length; i++) {
        const asteroid = asteroids[i];
        if (lastGroup.length == 0) {
          lastGroup.push(asteroid);
        } else {
          let lastAsteroid = lastGroup[lastGroup.length - 1];
          if (Math.sign(asteroid) === Math.sign(lastAsteroid)) {
            lastGroup.push(asteroid);
          } else if (asteroid < 0 && lastAsteroid > 0) {
            //collide
            for (let j = lastGroup.length - 1; j >= 0; j--) {
              lastAsteroid = lastGroup[j];
              if (Math.abs(lastAsteroid) > Math.abs(asteroid)) break;
              else if (Math.abs(lastAsteroid) == Math.abs(asteroid)) {
                lastGroup.pop();
                break;
              } else {
                lastGroup.pop();
                if (lastGroup.length === 0) lastGroup = [asteroid];
              }
            }
          } else {
            survivors = [...survivors, ...lastGroup];
            lastGroup = [asteroid];
          }
        }
      }
      survivors = [...survivors, ...lastGroup];
      return survivors;
    }

    it('should work', () => {
      expect(asteroidCollision([5, 10, -5])).toEqual([5, 10]);
      expect(asteroidCollision([8, -8])).toEqual([]);
      expect(asteroidCollision([10, 2, -5])).toEqual([10]);
      expect(asteroidCollision([-2, -1, 1, 2])).toEqual([-2, -1, 1, 2]);
      expect(asteroidCollision([-2, -2, 1, -2])).toEqual([-2, -2, -2]);
    });
  });

  context('394. Decode String', () => {
    // Given an encoded string, return its decoded string.
    // The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.
    // You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there will not be input like 3a or 2[4].
    // The test cases are generated so that the length of the output will never exceed 105.

    function isDigit(char: string): boolean {
      if (char.length !== 1) {
        return false; // Handle cases where the input is not a single character
      }
      const charCode = char.charCodeAt(0);
      return charCode >= 48 && charCode <= 57; // ASCII codes for '0' to '9'
    }

    function stringToInt(str: string): number {
      return parseInt(str, 10);
    }

    class Expression {
      constructor(repeats: number) {
        this.repeats = repeats;
      }

      public readonly repeats: number;

      public str = '';

      parse(): string {
        let res = '';
        for (let i = 0; i < this.repeats; i++) {
          res += this.str;
        }
        return res;
      }
    }

    function decodeString(s: string): string {
      const expressions: Expression[] = [new Expression(1)];
      let curNum = '';
      for (let i = 0; i < s.length; i++) {
        const letter = s[i];
        const curExp = expressions[expressions.length - 1];
        if (isDigit(letter)) curNum += letter;
        else if (letter === '[') {
          const exp = new Expression(stringToInt(curNum));
          curNum = '';
          expressions.push(exp);
        } else if (letter === ']') {
          const res = curExp.parse();
          expressions.pop();
          expressions[expressions.length - 1].str += res;
        } else {
          curExp.str += letter;
        }
      }
      return expressions[0].parse();
    }

    it('should work', () => {
      expect(decodeString('abc')).toEqual('abc');
      expect(decodeString('11[d]')).toEqual('ddddddddddd');
      expect(decodeString('3[a]2[bc]')).toEqual('aaabcbc');
      expect(decodeString('3[a2[c]]')).toEqual('accaccacc');
      expect(decodeString('2[abc]3[cd]ef')).toEqual('abcabccdcdcdef');
    });
  });

  context('933. Number of Recent Calls', () => {
    class RecentCounter {
      private times = new Queue<number>();

      readonly span = 3000;

      ping(t: number): number {
        this.times.enqueue(t);
        while (1) {
          const peek = this.times.peek();
          if (peek == null || peek >= t - this.span) break;
          this.times.dequeue();
        }
        return this.times.size();
      }
    }

    it('should work', () => {
      const rc = new RecentCounter();
      expect(rc.ping(1)).toEqual(1);
      expect(rc.ping(100)).toEqual(2);
      expect(rc.ping(3001)).toEqual(3);
      expect(rc.ping(3002)).toEqual(3);
    });
  });
});
