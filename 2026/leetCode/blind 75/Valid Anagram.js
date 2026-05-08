isAnagram(s, t) {
    if (s.lenght !== t.length) {
        return false;
    }

    const letters = new Map();

    for (let i = 0; i < s.length; i++) {
        const currentLetter = s[i];
        if (letters.has(currentLetter)) {
            letters.set(currentLetter, letters.get(currentLetter) + 1);
        } else {
            letters.set(currentLetter, 1);
        }
    }

    console.log(letters);

    for (let i = 0; i < t.length; i++) {
        const currentLetter = s[i];
        if (letters.get(currentLetter) <= 0) {
            return false
        } else {
            letters.set(currentLetter, letters.get(currentLetter) - 1);
        }
    }

    return true;
}

// console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("racecar", "carrace")); // false
