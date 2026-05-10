// Given an array of strings strs, group all anagrams together into sublists. You may return the output in any order.

// An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.

// Example 1:

// Input: strs = ["act","pots","tops","cat","stop","hat"]

// Output: [["hat"],["act", "cat"],["stop", "pots", "tops"]]
// Example 2:

// Input: strs = ["x"]

// Output: [["x"]]
// Example 3:

// Input: strs = [""]

// Output: [[""]]

var groupAnagrams = function(strs) {
    const anagrams = {};
    for (let i = 0; i < strs.length; i++) {
        const str = strs[i];
        const sortedStr = str.split('').sort().join('');
        if (anagrams[sortedStr]) {
            anagrams[sortedStr].push(str);
        } else {
            anagrams[sortedStr] = [str];
        }
    }
    return Object.values(anagrams);
}

var groupAnagrams2 = function(strs) {
    const res = {};
    for (let s of strs) {
        const count = new Array(26).fill(0);
        for (let c of s) {
            count[c.charCodeAt(0) - 'a'.charCodeAt(0)] += 1;
        }
        const key = count.join(',');
        if (!res[key]) {
            res[key] = [];
        }
        res[key].push(s);
    }
    return Object.values(res);
}

// console.log(groupAnagrams(["act","pots","tops","cat","stop","hat"]));
// console.log(groupAnagrams(["x"]));
// console.log(groupAnagrams([""]));

console.log(groupAnagrams2(["act","pots","tops","cat","stop","hat"]));
console.log(groupAnagrams2(["x"]));
console.log(groupAnagrams2([""]));