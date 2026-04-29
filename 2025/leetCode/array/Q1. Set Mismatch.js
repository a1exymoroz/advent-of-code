/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function (nums) {
    const n = nums.length;
    const seen = new Set();
    let duplicate = -1;
    let sum = 0;

    for (const num of nums) {
        if (seen.has(num)) duplicate = num;
        seen.add(num);
        sum += num;
    }

    const expectedSum = (n * (n + 1)) / 2;
    const missing = expectedSum - (sum - duplicate);

    return [duplicate, missing];
};

console.log(findErrorNums([1, 2, 2, 4])); // [2, 3]
console.log(findErrorNums([1, 1]));       // [1, 2]
console.log(findErrorNums([3, 2, 2]));    // [2, 1]
console.log(findErrorNums([2, 2]));       // [2, 1]
