const fs = require('fs');
const path = require('path');

/**
 * Generate all possible combinations of operators for a given number of positions
 * @param {number} count - Number of operator positions needed
 * @param {Array} operators - Array of operators to use (default: ['+', '*'])
 * @returns {Array} Array of all possible operator combinations
 */
const generateOperatorCombinations = (count, operators = ['+', '*']) => {
    if (count === 0) return [[]];
    if (count === 1) return operators.map(op => [op]);
    
    const combinations = [];
    const smallerCombinations = generateOperatorCombinations(count - 1, operators);
    
    for (const operator of operators) {
        for (const combination of smallerCombinations) {
            combinations.push([operator, ...combination]);
        }
    }
    
    return combinations;
};

/**
 * Evaluate an expression with numbers and operators from left to right
 * @param {Array} numbers - Array of numbers
 * @param {Array} operators - Array of operators
 * @returns {number} Result of the calculation
 */
const evaluateExpression = (numbers, operators) => {
    let result = numbers[0];
    
    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        const nextNumber = numbers[i + 1];
        
        if (operator === '+') {
            result += nextNumber;
        } else if (operator === '*') {
            result *= nextNumber;
        } else if (operator === '||') {
            result = Number(result.toString() + nextNumber.toString());
        }
    }
    
    return result;
};

/**
 * Check if any combination of operators can produce the target value
 * @param {number} target - Target value to achieve
 * @param {Array} numbers - Array of numbers to use
 * @returns {boolean} True if target can be achieved
 */
const canProduceTarget = (target, numbers) => {
    if (numbers.length === 1) {
        return numbers[0] === target;
    }
    
    const operatorCount = numbers.length - 1;
    const combinations = generateOperatorCombinations(operatorCount);
    
    for (const operators of combinations) {
        const result = evaluateExpression(numbers, operators);
        if (result === target) {
            return true;
        }
    }
    
    return false;
};

const bridgeRepair = (str) => {
    // Split the input string into lines
    const lines = str.trim().split('\n');

    let sum = 0;

    for (const line of lines) {
        const [targetStr, numbersStr] = line.split(':');
        const target = Number(targetStr.trim());
        const numbers = numbersStr.trim().split(' ').map(Number);
        
        if (canProduceTarget(target, numbers)) {
            sum += target;
        }
    }

    return sum;
}

/**
 * Check if any combination of operators can produce the target value
 * @param {number} target - Target value to achieve
 * @param {Array} numbers - Array of numbers to use
 * @returns {boolean} True if target can be achieved
 */
const canProduceTarget2 = (target, numbers) => {
    if (numbers.length === 1) {
        return numbers[0] === target;
    }
    
    const operatorCount = numbers.length - 1;
    const combinations = generateOperatorCombinations(operatorCount);
    
    for (const operators of combinations) {
        const result = evaluateExpression(numbers, operators);
        if (result === target) {
            return true;
        }
    }

    const combinationsWithOr = generateOperatorCombinations(operatorCount, ['+', '*', '||']);

    for (const operators of combinationsWithOr) {
        const result = evaluateExpression(numbers, operators);
        if (result === target) {
            return true;
        }
    }
    
    return false;
};

const bridgeRepair2 = (str) => {
    // Split the input string into lines
    const lines = str.trim().split('\n');

    let sum = 0;

    for (const line of lines) {
        const [targetStr, numbersStr] = line.split(':');
        const target = Number(targetStr.trim());
        const numbers = numbersStr.trim().split(' ').map(Number);

        if (canProduceTarget2(target, numbers)) {
            sum += target;
        }
    }

    return sum;
}

const testData = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

// Demonstration of operator combinations
console.log('=== Operator Combinations Demo ===');
console.log('For 2 positions:', generateOperatorCombinations(2));
console.log('For 3 positions:', generateOperatorCombinations(3));
console.log('For 4 positions:', generateOperatorCombinations(4));

// Example calculation demonstration
console.log('\n=== Example Calculations ===');
const exampleNumbers = [10, 19];
const exampleCombinations = generateOperatorCombinations(1);
console.log(`Numbers: [${exampleNumbers.join(', ')}]`);
for (const ops of exampleCombinations) {
    const result = evaluateExpression(exampleNumbers, ops);
    console.log(`${exampleNumbers[0]} ${ops[0]} ${exampleNumbers[1]} = ${result}`);
}

console.log('\n=== Test Results ===');
console.log('Test result:', bridgeRepair(testData));
console.log('\n=== Test Results Part 2 ===');
console.log('Test result part 2:', bridgeRepair2(testData));


// Read the actual input file
const inputPath = path.join(__dirname, '7.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log('Actual result:', bridgeRepair2(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}