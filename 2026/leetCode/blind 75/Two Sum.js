var twoSum = function(nums, target) {
    const sumNumbers = {};

    for (let i = 0; i < nums.length; i++) {
        const currentNumber = nums[i];
        const minusTarget = target - currentNumber;
        
        if (sumNumbers[currentNumber] !== undefined) {
            return [sumNumbers[currentNumber], i]
        }

        sumNumbers[minusTarget] = i;
    }


    return null;
}

// console.log(twoSum([2,5,5,11], 10));
// const nums=[-1,-2,-3,-4,-5], target=-8;
// console.log(twoSum(nums, target));

console.log(twoSum([3,4,5,6], 7));
