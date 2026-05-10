// Given an integer array nums, return an array output where output[i] is the product of all the elements of nums except nums[i].

// Each product is guaranteed to fit in a 32-bit integer.

// Follow-up: Could you solve it in O(n) time without using the division operation?

// Example 1:

// Input: nums = [1,2,4,6]

// Output: [48,24,12,8]
// Example 2:

// Input: nums = [-1,0,1,2,3]

// Output: [0,-6,0,0,0]

var productExceptSelf = function(nums) {
    const output = new Array(nums.length).fill(1);
    let prefix = 1;
    for (let i = 0; i < nums.length; i++) {
        output[i] = prefix;
        prefix *= nums[i];
    }
    let postfix = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        output[i] *= postfix;
        postfix *= nums[i];
    }
    return output;
}

var productExceptSelf2 = function(nums) {
    const n = nums.length;
    const res = new Array(n);
    const pref = new Array(n);
    const suff = new Array(n);

    pref[0] = 1;
    suff[n - 1] = 1;
    for (let i = 1; i < n; i++) {
        pref[i] = nums[i - 1] * pref[i - 1];
    }
    for (let i = n - 2; i >= 0; i--) {
        suff[i] = nums[i + 1] * suff[i + 1];
    }
    for (let i = 0; i < n; i++) {
        res[i] = pref[i] * suff[i];
    }
    return res;
}
// console.log(productExceptSelf([1,2,4,6]));
// console.log(productExceptSelf([-1,0,1,2,3]));
console.log(productExceptSelf2([1,2,4,6]));
console.log(productExceptSelf2([-1,0,1,2,3]));