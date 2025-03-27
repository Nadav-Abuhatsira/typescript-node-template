import expect from 'expect';

describe('leetcode problems tests', () => {
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
});
