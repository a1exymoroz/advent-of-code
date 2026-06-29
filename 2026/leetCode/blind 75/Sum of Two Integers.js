// Given two integers a and b, return the sum of the two integers without using the + and - operators.

// Example 1:

// Input: a = 1, b = 1

// Output: 2
// Example 2:

// Input: a = 4, b = 7

// Output: 11


var getSum = function(a, b) {
    while (b !== 0) {
        const carry = a & b;
        a = a ^ b;
        b = carry << 1;
    }
    return a;
}

console.log(getSum(1, 1));
console.log(getSum(4, 7));