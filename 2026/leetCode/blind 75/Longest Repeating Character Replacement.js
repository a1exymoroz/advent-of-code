// You are given a string s consisting of only uppercase english characters and an integer k. You can choose up to k characters of the string and replace them with any other uppercase English character.

// After performing at most k replacements, return the length of the longest substring which contains only one distinct character.

// Example 1:

// Input: s = "XYYX", k = 2

// Output: 4
// Explanation: Either replace the 'X's with 'Y's, or replace the 'Y's with 'X's.

// Example 2:

// Input: s = "AAABABB", k = 1

// Output: 5


var longestRepeatingCharacterReplacement = function(s, k) {
    let count = new Map();
    let res = 0;

    let l = 0,
        maxf = 0;
    for (let r = 0; r < s.length; r++) {
        count.set(s[r], (count.get(s[r]) || 0) + 1);
        maxf = Math.max(maxf, count.get(s[r]));

        while (r - l + 1 - maxf > k) {
            count.set(s[l], count.get(s[l]) - 1);
            l++;
        }
        res = Math.max(res, r - l + 1);
    }

    return res;
}

console.log(longestRepeatingCharacterReplacement("XYYX", 2));
console.log(longestRepeatingCharacterReplacement("AAABABB", 1));



// class Solution {
//     public int characterReplacement(String s, int k) {
//         var count = new HashMap<Character, Integer>();
//         int res = 0;

//         int l = 0,
//             maxf = 0;
//         for (int r = 0; r < s.length(); r++) {
//             count.put(s.charAt(r), count.getOrDefault(s.charAt(r), 0) + 1);
//             maxf = Math.max(maxf, count.get(s.charAt(r)));

//             while (r - l + 1 - maxf > k) {
//                 count.put(s.charAt(l), count.get(s.charAt(l)) - 1);
//                 l++;
//             }
//             res = Math.max(res, r - l + 1);
//         }

//         return res;
//     }
// }