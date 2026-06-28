// Given an array of integers nums, find the subarray with the largest sum and return the sum.

// A subarray is a contiguous non-empty sequence of elements within an array.

// Example 1:

// Input: nums = [2,-3,4,-2,2,1,-1,4]

// Output: 8
// Explanation: The subarray [4,-2,2,1,-1,4] has the largest sum 8.

// Example 2:

// Input: nums = [-1]

// Output: -1

var maxSubArray = function(nums) {
    // Kadane's algorithm: at each index, decide whether to extend the current
    // subarray or start a new one at nums[i].
    let maxSum = nums[0];   // best sum seen so far
    let currentSum = 0;     // best sum ending at the current index
    for (let i = 0; i < nums.length; i++) {
        // Either extend the running subarray, or drop it and begin at nums[i].
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }   
    return maxSum;
}

console.log(maxSubArray([2,-3,4,-2,2,1,-1,4]));