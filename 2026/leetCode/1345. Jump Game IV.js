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

    const valueToIndices = new Map();
    for (let i = 0; i < arr.length; i++) {
        if (!valueToIndices.has(arr[i])) valueToIndices.set(arr[i], []);
        valueToIndices.get(arr[i]).push(i);
    }

    const visited = new Set([0]);
    const queue = [0];
    let steps = 0;

    while (queue.length > 0) {
        const size = queue.length;
        for (let s = 0; s < size; s++) {
            const i = queue.shift();
            if (i === arr.length - 1) return steps;

            const value = arr[i];
            for (const j of valueToIndices.get(value) || []) {
                if (!visited.has(j)) {
                    visited.add(j);
                    queue.push(j);
                }
            }
            valueToIndices.delete(value);

            for (const next of [i - 1, i + 1]) {
                if (next >= 0 && next < arr.length && !visited.has(next)) {
                    visited.add(next);
                    queue.push(next);
                }
            }
        }
        steps++;
    }

    return -1;
};

console.log(minJumps([100,-23,-23,404,100,23,23,23,3,404]));
console.log(minJumps([7]));
console.log(minJumps([7,6,9,6,9,6,9,7]));

console.log(minJumps([6,1,9]));