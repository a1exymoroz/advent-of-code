// Given an integer array nums and an integer k, return the k most frequent elements within the array.

// The test cases are generated such that the answer is always unique.

// You may return the output in any order.

// Example 1:

// Input: nums = [1,2,2,3,3,3], k = 2

// Output: [2,3]
// Example 2:

// Input: nums = [7,7], k = 1

// Output: [7]


var topKFrequent = function(nums, k) {
    const freq = {};
    for (let i = 0; i < nums.length; i++) {
        const currentNumber = nums[i];
        if (freq[currentNumber]) {
            freq[currentNumber]++;
        } else {
            freq[currentNumber] = 1;
        }
    }
    const sortedFreq = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    return sortedFreq.slice(0, k).map(entry => parseInt(entry[0]));
}
// python freq = [[] for i in range(len(nums) + 1)]
// javascript freq = new Array(nums.length + 1).fill([]);
var topKFrequent2 = function(nums, k) {
    const count = {};
    const freq = Array.from({length: nums.length + 1}, () => []);
    for (let i = 0; i < nums.length; i++) {
        count[nums[i]] = (count[nums[i]] || 0) + 1;
    }

    for (const [number, countValue] of Object.entries(count)) {
        freq[countValue].push(parseInt(number));
    }

    const result = [];
    for (let i = freq.length - 1; i >= 0; i--) {

        for (let p of freq[i]) {
            result.push(p);
            if (result.length >= k) {
                return result;
            }
        }
    }
}

console.log(topKFrequent2([1,2,2,3,3,3], 2));
console.log(topKFrequent2([7,7], 1));