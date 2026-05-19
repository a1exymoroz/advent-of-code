// Given two integer arrays nums1 and nums2, sorted in non-decreasing order, return the minimum integer common to both arrays. If there is no common integer amongst nums1 and nums2, return -1.

// Note that an integer is said to be common to nums1 and nums2 if both arrays have at least one occurrence of that integer.

 

// Example 1:

// Input: nums1 = [1,2,3], nums2 = [2,4]
// Output: 2
// Explanation: The smallest element common to both arrays is 2, so we return 2.
// Example 2:

// Input: nums1 = [1,2,3,6], nums2 = [2,3,4,5]
// Output: 2
// Explanation: There are two common elements in the array 2 and 3 out of which 2 is the smallest, so 2 is returned.


var getCommon = function(nums1, nums2) {
    let index1 = 0;
    let index2 = 0;

    while(index1 !== nums1.length - 1 && index2 !== nums2.length - 1) {
        if (nums1[index1] === nums2[index2]){
            return nums1[index1];
        }

        if (nums1[index1] < nums2[index2]) {
            index1 = index1 + 1 === nums1.length - 1 ? nums1.length - 1 : index1 + 1
        } else {
            index2 = index2 + 1 === nums2.length - 1 ? nums2.length - 1 : index2 + 1
        }
    }

    return -1;
};

// console.log(getCommon([1,2,3], [2,4]));
// console.log(getCommon([1,2,3,6], [2,3,4,5]));
console.log(getCommon([1,2], [2,4]));