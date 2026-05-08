var isAnagram = function(s, t) {
    if (s.length !== t.length) {
        return false;
    }

    const count = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
        count[t.charCodeAt(i) - 'a'.charCodeAt(0)]--;
    }
    return count.every((val) => val === 0);
}

// console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("racecar", "carrace")); // false
// console.log(isAnagram("jar", "jam")); // false

