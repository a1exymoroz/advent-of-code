// You are given an integer array heights where heights[i] represents the height of the 
// i
// t
// h
// i 
// th
//   bar.

// You may choose any two bars to form a container. Return the maximum amount of water a container can store.

// Example 1:



// Input: height = [1,7,2,5,4,7,3,6]

// Output: 36
// Example 2:

// Input: height = [2,2,2]

// Output: 4

var maxArea = function(heights) {
    let res = 0;
    let left = 0;
    let right = heights.length - 1;

    while(left < right) {
        const leftHeight = heights[left];
        const rightHeight = heights[right];

        const sum = (right - left) * Math.min(leftHeight, rightHeight);

        res = Math.max(res, sum);
        if (leftHeight < rightHeight) {
            left++;
        } else {
            right--;
        }
    }

    return res;
}

console.log(maxArea([1,7,2,5,4,7,3,6]));
console.log(maxArea([2,2,2]));