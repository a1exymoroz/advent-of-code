// Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

 

// Example 1:

// Input: n = 2
// Output: [0,1,1]
// Explanation:
// 0 --> 0
// 1 --> 1
// 2 --> 10
// Example 2:

// Input: n = 5
// Output: [0,1,1,2,1,2]
// Explanation:
// 0 --> 0
// 1 --> 1
// 2 --> 10
// 3 --> 11
// 4 --> 100
// 5 --> 101
 



/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
    const result = [];

    const numberOf1Bits = (n) => {
        let count = 0;

        while (n != 0) {
            n &= (n - 1);
            count++;
        }
        return count
    }

    for (let i = 0; i <= n; i++) {
        result.push(numberOf1Bits(i));
    }
    return result;
};

console.log(countBits(2));
console.log(countBits(5));


// class Solution {
//     public int[] countBits(int n) {
//         int[] result = new int[n + 1];

//         for (int i = 0; i <= n; i++) {
//             result[i] = this.numberOf1Bits(i);
//         }
//         return result;
//     }

//     public int numberOf1Bits(int n) {
//         int count = 0;

//         while (n != 0) {
//             n &= (n - 1);
//             count++;
//         }
//         return count;
//     }
// }