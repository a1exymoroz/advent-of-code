const fs = require('fs');
const path = require('path');

const getPossibleCombinations = (ax, ay, bx, by, px, py, cachedCombinations) => {
    const maxMultiplierAX = Math.floor(px / ax);
    const maxMultiplierBX = Math.floor(px / bx);

    const possibleCombinationsX = [];

    for (let i = 1; i <= maxMultiplierAX; i++) {
        for (let j = 1; j <= maxMultiplierBX; j++) {
            const keyA = `${i},${ax}`;
            let sumA = 0;
            if (cachedCombinations.has(keyA)) {
                sumA = cachedCombinations.get(keyA);
            } else {
                sumA = i * ax;
                cachedCombinations.set(keyA, sumA);
            }

            const keyB = `${j},${bx}`;
            let sumB = 0;
            if (cachedCombinations.has(keyB)) {
                sumB = cachedCombinations.get(keyB);
            } else {
                sumB = j * bx;
                cachedCombinations.set(keyB, sumB);
            }

            if (sumA + sumB === px) {
                possibleCombinationsX.push([i, j]);
            }
        }
    }

    const possibleCombinations = [];
    
    for (const combination of possibleCombinationsX) {
        const [i, j] = combination;
        if (i * ay + j * by === py) {
            possibleCombinations.push([i, j]);
        }
    }

    return possibleCombinations;
}

const getCheapestCombination = (possibleCombinations) => {
    const tokenA = 3;
    const tokenB = 1;
    let cheapestCost = Infinity;
    let cheapestCombination = null;

    for (const combination of possibleCombinations) {
        const [i, j] = combination;
        const cost = i * tokenA + j * tokenB;
        console.log('combination', combination, 'cost', cost);
        if (cost < cheapestCost) {
            cheapestCost = cost;
            cheapestCombination = combination;
        }
    }
    return [cheapestCombination, cheapestCost];
}


const clawContraption = (input) => {
    const sections = input.trim().split('\n\n');
    let sum = 0;
    let cachedCombinations = new Map();

    for (const section of sections) {
        const lines = section.split('\n');
        const buttonA = lines[0].match(/X([+-]\d+), Y([+-]\d+)/);
        const buttonB = lines[1].match(/X([+-]\d+), Y([+-]\d+)/);
        const prize = lines[2].match(/X=(\d+), Y=(\d+)/);

        const ax = parseInt(buttonA[1], 10);
        const ay = parseInt(buttonA[2], 10);
        const bx = parseInt(buttonB[1], 10);
        const by = parseInt(buttonB[2], 10);
        const px = parseInt(prize[1], 10);
        const py = parseInt(prize[2], 10);

        const possibleCombinations = getPossibleCombinations(ax, ay, bx, by, px, py, cachedCombinations);
        if (possibleCombinations.length === 0) {
            continue;
        }
        const [cheapestCombination, cheapestCost] = getCheapestCombination(possibleCombinations);
        sum += cheapestCost;
    }

    return sum; // Change to totalPart2 for part 2   
};

// Test data
const testData = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;

const testData2 = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=10000000008400, Y=10000000005400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=10000000012748, Y=10000000012176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=10000000007870, Y=10000000006450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=10000000018641, Y=10000000010279`;

console.log('\n=== Expected vs Actual ===');
console.log('Part 1 - Actual: 100', clawContraption(testData2));
// console.log('Part 2 - Actual: 81', clawContraption(testData));

// Read the actual input file
const inputPath = path.join(__dirname, '13.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log('\n=== Actual Results ===');
    // console.log('Part 1: 652', clawContraption(data));
    // console.log('Part 2: 1432', clawContraption(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}