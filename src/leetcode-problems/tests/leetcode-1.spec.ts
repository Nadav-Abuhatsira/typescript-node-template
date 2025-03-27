import expect from 'expect';

describe('leetcode problems tests 1', () => {
  context('1431. Kids With the Greatest Number of Candies', () => {
    function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {
      let max = 0;
      for (let i = 0; i < candies.length; i++) {
        if (candies[i] > max) max = candies[i];
      }
      const res = [];
      for (let i = 0; i < candies.length; i++) {
        res[i] = candies[i] + extraCandies >= max;
      }
      return res;
    }

    it('should work', () => {
      expect(kidsWithCandies([2, 3, 5, 1, 3], 3)).toEqual([true, true, true, false, true]);
    });
  });

  context('605. Can Place Flowers', () => {
    function canPlaceFlowers(flowerbed: number[], n: number): boolean {
      let flowersToPlant = n;
      if (flowersToPlant === 0) return true;
      for (let i = 0; i < flowerbed.length; i++) {
        if (
          flowerbed[i] == 0 &&
          (flowerbed[i - 1] == 0 || i - 1 < 0) &&
          (flowerbed[i + 1] == 0 || i + 1 >= flowerbed.length)
        ) {
          flowersToPlant--;
          flowerbed[i] = 1;
          if (flowersToPlant === 0) return true;
        }
      }
      return false;
    }

    it('should work', () => {
      expect(canPlaceFlowers([1, 0, 0, 0, 1], 1)).toEqual(true);
      expect(canPlaceFlowers([1, 0, 0, 0, 1], 2)).toEqual(false);
      expect(canPlaceFlowers([1, 0, 0, 0, 0, 1], 2)).toEqual(false);
    });
  });

  context('345. Reverse Vowels of a String', () => {
    function isVowel(str: string) {
      return str === 'a' || str === 'e' || str === 'i' || str === 'o' || str === 'u';
    }

    function reverseVowels(s: string): string {
      const vowels = [];
      const res = [];
      for (let i = 0; i < s.length; i++) {
        res[i] = s[i];
        if (isVowel(s[i].toLowerCase())) vowels.push(i);
      }

      const vowelsNum = vowels.length;
      for (let i = 0; i < vowelsNum / 2; i++) {
        res[vowels[i]] = s[vowels[vowelsNum - 1 - i]];
        res[vowels[vowelsNum - 1 - i]] = s[vowels[i]];
      }

      let resStr = '';
      for (let i = 0; i < s.length; i++) {
        resStr += res[i];
      }
      return resStr;
    }

    it('should work', () => {
      expect(reverseVowels('IceCreAm')).toEqual('AceCreIm');
    });
  });

  context('151. Reverse Words in a String', () => {
    function reverseWords(s: string): string {
      const words = s.split(/\s/);
      return words
        .filter((w) => w.trim() != '')
        .reverse()
        .join(' ');
    }

    it('should work', () => {
      expect(reverseWords('the sky is blue')).toEqual('blue is sky the');
      expect(reverseWords('  hello world  ')).toEqual('world hello');
      expect(reverseWords('a good   example')).toEqual('example good a');
    });
  });

  context('2390. Removing Stars From a String', () => {
    function removeStars(s: string): string {
      const res: string[] = [];
      for (let i = 0; i < s.length; i++) {
        if (s[i] === '*') {
          if (res.length > 0) res.pop();
        } else res.push(s[i]);
      }
      return res.join('');
    }

    it('should work', () => {
      expect(removeStars('leet**cod*e')).toEqual('lecoe');
      expect(removeStars('erase*****')).toEqual('');
    });
  });

  context('238. Product of Array Except Self', () => {
    //Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
    // The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
    // You must write an algorithm that runs in O(n) time and without using the division operation.

    function productExceptSelf(nums: number[]): number[] {
      const prefixProducts: number[] = [];
      let prefixMult = 1;
      const postfixProducts: number[] = [];
      let postfixMult = 1;
      for (let i = 0, endIdx = nums.length - 1; i < nums.length; i++, endIdx--) {
        if (i === 0) prefixProducts[i] = 0;
        else prefixProducts[i] = prefixMult;
        prefixMult *= nums[i];

        if (endIdx === nums.length - 1) postfixProducts[endIdx] = 0;
        else postfixProducts[endIdx] = postfixMult;
        postfixMult *= nums[endIdx];
      }

      const res: number[] = [];
      for (let i = 0; i < nums.length; i++) {
        if (i === 0) res[i] = postfixProducts[i];
        else if (i === nums.length - 1) res[i] = prefixProducts[i];
        else res[i] = prefixProducts[i] * postfixProducts[i];
        if (res[i] === -0) res[i] = 0;
      }
      return res;
    }

    it('should work', () => {
      expect(productExceptSelf([1, 2, 3, 4])).toEqual([24, 12, 8, 6]);
      expect(productExceptSelf([-1, 1, 0, -3, 3])).toEqual([0, 0, 9, 0, 0]);
    });
  });

  context('443. String Compression', () => {
    //Given an array of characters chars, compress it using the following algorithm:
    // Begin with an empty string s. For each group of consecutive repeating characters in chars:
    // If the group's length is 1, append the character to s.
    // Otherwise, append the character followed by the group's length.
    // The compressed string s should not be returned separately, but instead, be stored in the input character array chars. Note that group lengths that are 10 or longer will be split into multiple characters in chars.
    // After you are done modifying the input array, return the new length of the array.
    // You must write an algorithm that uses only constant extra space.

    function compress(chars: string[]): number {
      let currChar: string | undefined = undefined;
      let currCount = 0;

      let res = ''; //toDo need to use the imput array
      for (let i = 0; i < chars.length; i += 1) {
        const char = chars[i];
        if (currChar === char) currCount++;
        else {
          if (currChar != null) {
            //printChar - move to func
            if (currCount === 1) res += currChar;
            else if (currCount > 0) res += `${currChar}${currCount}`;
          }

          currChar = char;
          currCount = 1;
        }
      }

      //printChar - move to func
      if (currCount === 1) res += currChar;
      else if (currCount > 0) res += `${currChar}${currCount}`;

      for (let i = 0; i < res.length; i += 1) {
        chars[i] = res[i];
      }
      return res.length;
    }

    it('should work', () => {
      let input = ['a', 'a', 'b', 'b', 'c', 'c', 'c'];
      let count = compress(input);
      expect(count).toEqual(6);
      expect(input.slice(0, count)).toEqual(['a', '2', 'b', '2', 'c', '3']);

      input = ['a'];
      count = compress(input);
      expect(count).toEqual(1);
      expect(input.slice(0, count)).toEqual(['a']);

      input = ['a', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'];
      count = compress(input);
      expect(count).toEqual(4);
      expect(input.slice(0, count)).toEqual(['a', 'b', '1', '2']);
    });
  });
});
