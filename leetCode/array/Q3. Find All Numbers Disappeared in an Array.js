// Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.

 

// Example 1:

// Input: nums = [4,3,2,7,8,2,3,1]
// Output: [5,6]
// Example 2:

// Input: nums = [1,1]
// Output: [2]
 

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function(nums) {
    nums.sort((a,b) => a - b);
    const start = nums[0];
    const numsArray = Array.from({length: nums.length}, (_, index) => start + index);
    const numsSet = new Set(numsArray);
    console.log(nums);
    const array = [];

    for (let i = 0; i < nums.length; i++) {
        if (numsSet.has(nums[i])) {
            numsSet.delete(nums[i]);
        }
    }

    return [...numsSet];
};

console.log(findDisappearedNumbers([4,3,2,7,8,2,3,1]));