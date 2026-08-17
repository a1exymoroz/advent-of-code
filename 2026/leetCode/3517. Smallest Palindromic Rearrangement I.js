// You are given a palindromic string s.

// Return the lexicographically smallest palindromic permutation of s.

 

// Example 1:

// Input: s = "z"

// Output: "z"

// Explanation:

// A string of only one character is already the lexicographically smallest palindrome.

// Example 2:

// Input: s = "babab"

// Output: "abbba"

// Explanation:

// Rearranging "babab" → "abbba" gives the smallest lexicographic palindrome.

// Example 3:

// Input: s = "daccad"

// Output: "acddca"

// Explanation:

// Rearranging "daccad" → "acddca" gives the smallest lexicographic palindrome.


/**
 * @param {string} s
 * @return {string}
 */
var smallestPalindrome = function(s) {
    if (s.length <= 0) {
        return s;
    }

    const left = s.slice(0, Math.floor(s.length / 2)).split('').sort((a, b) => a.localeCompare(b));
    const right = [...left].reverse();

    return left.join('') + (s.length % 2 === 0 ? '' : s[Math.floor(s.length / 2)]) + right.join('');

    
};

console.log(smallestPalindrome("z"));
console.log(smallestPalindrome("babab"));
console.log(smallestPalindrome("daccad"));