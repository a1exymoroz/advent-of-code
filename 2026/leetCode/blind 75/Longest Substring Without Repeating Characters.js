// Given a string s, find the length of the longest substring without duplicate characters.

// A substring is a contiguous sequence of characters within a string.

// Example 1:

// Input: s = "zxyzxyz"

// Output: 3
// Explanation: The string "xyz" is the longest without duplicate characters.

// Example 2:

// Input: s = "xxxx"

// Output: 1


var lengthOfLongestSubstring = function(s) {
    let length = 0;
    let str = ''

    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        const index = str.indexOf(char);
        if (index === -1) {
            str += char;
        } else {
            length = Math.max(length, str.length);
            str = str.substring(index + 1) + char;
        }

    }
    return Math.max(length, str.length);
}

var lengthOfLongestSubstring2 = function(s) {
    const charSet = new Set();
    let l = 0;
    let res = 0;

    for (let r = 0; r < s.length; r++) {
        while (charSet.has(s[r])) {
            charSet.delete(s[l]);
            l++;
        }
        charSet.add(s[r]);
        res = Math.max(res, r - l + 1);
    }
    return res;
}

// console.log(lengthOfLongestSubstring("zxyzxyz"));
// console.log(lengthOfLongestSubstring("xxxx"));
// console.log(lengthOfLongestSubstring("dvdf"));
console.log(lengthOfLongestSubstring2("zxyzxyz"));
console.log(lengthOfLongestSubstring2("xxxx"));
console.log(lengthOfLongestSubstring2("dvdf"));
