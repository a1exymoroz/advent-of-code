// Given a string s, return true if it is a palindrome, otherwise return false.

// A palindrome is a string that reads the same forward and backward. It is also case-insensitive and ignores all non-alphanumeric characters.

// Note: Alphanumeric characters consist of letters (A-Z, a-z) and numbers (0-9).

// Example 1:

// Input: s = "Was it a car or a cat I saw?"

// Output: true
// Explanation: After considering only alphanumerical characters we have "wasitacaroracatisaw", which is a palindrome.

// Example 2:

// Input: s = "tab a cat"

// Output: false

var isPalindrome = function(s) {
    const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return cleaned === cleaned.split('').reverse().join('');
}

var isPalindrome2 = function(s) {
    let left = 0;
    let right = s.length - 1;
    while(left < right) {
        while(left < right && !s[left].match(/[^a-zA-Z0-9]/g)) {
            left++;
        }
        while(left < right && !s[right].match(/[^a-zA-Z0-9]/g)) {
            right--;
        }
        
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

console.log(isPalindrome("Was it a car or a cat I saw?"));
console.log(isPalindrome("tab a cat"));