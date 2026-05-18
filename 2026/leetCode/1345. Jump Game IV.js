// Given an array of integers arr, you are initially positioned at the first index of the array.

// In one step you can jump from index i to index:

// i + 1 where: i + 1 < arr.length.
// i - 1 where: i - 1 >= 0.
// j where: arr[i] == arr[j] and i != j.
// Return the minimum number of steps to reach the last index of the array.

// Notice that you can not jump outside of the array at any time.

 

// Example 1:

// Input: arr = [100,-23,-23,404,100,23,23,23,3,404]
// Output: 3
// Explanation: You need three jumps from index 0 --> 4 --> 3 --> 9. Note that index 9 is the last index of the array.
// Example 2:

// Input: arr = [7]
// Output: 0
// Explanation: Start index is the last index. You do not need to jump.
// Example 3:

// Input: arr = [7,6,9,6,9,6,9,7]
// Output: 1
// Explanation: You can jump directly from index 0 to index 7 which is last index of the array.

/**
 * @param {number[]} arr
 * @return {number}
 */
var minJumps = function(arr) {
    if (arr.length === 1) return 0;
    let stack = [[0, 0]];
    let visited = new Set([0]);
    while (stack.length > 0) {
        const [current, steps] = stack.pop();
        if (current === arr.length - 1) return steps;

        let left = current - 1;
        let right = current + 1;
        while (left >= 0 || right < arr.length) {
            if (left >= 0 && !visited.has(left) && arr[current] === arr[left]) {
                stack.push([left, steps + 1]);
                visited.add(left);
                break;
            }
            if (right < arr.length && !visited.has(right) && arr[current] === arr[right]) {
                stack.push([right, steps + 1]);
                visited.add(right);
                break;
            }
            left--;
            right++;
        } 
    }
    return -1;
};

console.log(minJumps([100,-23,-23,404,100,23,23,23,3,404]));
console.log(minJumps([7]));
console.log(minJumps([7,6,9,6,9,6,9,7]));