// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] where nums[i] + nums[j] + nums[k] == 0, and the indices i, j and k are all distinct.

// The output should not contain any duplicate triplets. You may return the output and the triplets in any order.

// Example 1:

// Input: nums = [-1,0,1,2,-1,-4]

// Output: [[-1,-1,2],[-1,0,1]]
// Explanation:
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].

// Example 2:

// Input: nums = [0,1,1]

// Output: []
// Explanation: The only possible triplet does not sum up to 0.

// Example 3:

// Input: nums = [0,0,0]

// Output: [[0,0,0]]


// Input: nums = [-1,0,1,2,-1,-4]
// sorted: [-4,-1,-1,0,1,2]
// target: -4
// numbers: [-1,-1,0,1,2]
// target: -1
// numbers: [-1,0,1,2]
// target: -1
// numbers: [0,1,2]
// target: 0
// numbers: [1,2]
// target: 1
// numbers: [2]
var threeSum = function(nums) {
    const triplets = [];
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        const target = nums[i];
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
            const sum = target + nums[left] + nums[right];
            if (sum > 0) {
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                triplets.push([target, nums[left], nums[right]]);
                left++;
                while (nums[left] === nums[left - 1] && left < right) left++;
            }
        }
    }
    return triplets;
}

// console.log(threeSum([-1,0,1,2,-1,-4]));
// console.log(threeSum([0,1,1]));
// console.log(threeSum([0,0,0]));
console.log(threeSum([-1,0,1,2,-1,-4,-2,-3,3,0,4]));

// Input:


// nums=[-1,0,1,2,-1,-4,-2,-3,3,0,4]
// Your Output:


// [[-4,1,3],[-3,1,2],[-2,0,2],[-1,0,1],[-1,-1,2],[-2,-1,3],[-3,-1,4]]
// Expected output:


// [[-4,0,4],[-4,1,3],[-3,-1,4],[-3,0,3],[-3,1,2],[-2,-1,3],[-2,0,2],[-1,-1,2],[-1,0,1]]


// Java
// class Solution {
//     public List<List<Integer>> threeSum(int[] nums) {
//         List<List<Integer>> triplets = new ArrayList<>();
//         Arrays.sort(nums);
//         for (int i = 0; i < nums.length; i++) {
//             if (i > 0 && nums[i] == nums[i - 1]) continue;
//             int target = nums[i];
//             int left = i + 1;
//             int right = nums.length - 1;
//             while (left < right) {
//                 int sum = target + nums[left] + nums[right];
//                 if (sum > 0) {
//                     right--;
//                 } else if (sum < 0) {
//                     left++;
//                 } else {
//                     triplets.add(Arrays.asList(target, nums[left], nums[right]));
//                     left++;
//                     while (nums[left] == nums[left - 1] && left < right) left++;
//                 }
//             }
//         }
//         return triplets;
//     }
// }