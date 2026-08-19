// You are given an integer array nums where nums[i] represents the amount of money the ith house has. The houses are arranged in a straight line, i.e. the ith house is the neighbor of the (i-1)th and (i+1)th house.

// You are planning to rob money from the houses, but you cannot rob two adjacent houses because the security system will automatically alert the police if two adjacent houses were both broken into.

// Return the maximum amount of money you can rob without alerting the police.


// Example 1:

// Input: nums = [1,1,3,3]

// Output: 4
// Explanation: nums[0] + nums[2] = 1 + 3 = 4.


// Example 2:

// Input: nums = [2,9,8,3,6]

// Output: 16


function rob(nums) {
    // Use dynamic programming (bottom-up) to avoid redundant calculations.
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    let prev2 = 0;             // Robbing up to i-2
    let prev1 = nums[0];       // Robbing up to i-1

    for (let i = 1; i < nums.length; i++) {
        let curr = Math.max(nums[i] + prev2, prev1);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

console.log(rob([1,1,3,3])); // 4
console.log(rob([2,9,8,3,6])); // 16