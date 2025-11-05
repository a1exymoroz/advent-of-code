const fs = require('fs');
const path = require('path');

const solveMachine = (ax, ay, bx, by, px, py) => {
    const determinant = ax * by - ay * bx;
    
    if (determinant === 0) {
        return null;
    }
    
    const numeratorI = px * by - py * bx;
    const numeratorJ = ax * py - ay * px;
    
    if (numeratorI % determinant !== 0 || numeratorJ % determinant !== 0) {
        return null;
    }
    
    const i = numeratorI / determinant;
    const j = numeratorJ / determinant;
    
    if (i < 0 || j < 0) {
        return null;
    }
    
    if (ax * i + bx * j !== px || ay * i + by * j !== py) {
        return null;
    }
    
    return { i, j };
};

const calculateCost = (solution) => {
    if (!solution) return 0;
    const tokenA = 3;
    const tokenB = 1;
    return solution.i * tokenA + solution.j * tokenB;
};

const clawContraption = (input, part2 = false) => {
    const sections = input.trim().split('\n\n');
    let totalCost = 0;
    const offset = part2 ? 10000000000000 : 0;

    for (const section of sections) {
        const lines = section.split('\n');
        const buttonA = lines[0].match(/X[+=]([+-]?\d+), Y[+=]([+-]?\d+)/);
        const buttonB = lines[1].match(/X[+=]([+-]?\d+), Y[+=]([+-]?\d+)/);
        const prize = lines[2].match(/X=(\d+), Y=(\d+)/);

        const ax = parseInt(buttonA[1], 10);
        const ay = parseInt(buttonA[2], 10);
        const bx = parseInt(buttonB[1], 10);
        const by = parseInt(buttonB[2], 10);
        const px = parseInt(prize[1], 10) + offset;
        const py = parseInt(prize[2], 10) + offset;

        const solution = solveMachine(ax, ay, bx, by, px, py);
        const cost = calculateCost(solution);
        
        if (cost > 0) {
            totalCost += cost;
        }
    }

    return totalCost;
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

console.log('\n=== Test Results ===');
console.log('Part 1 Expected: 480, Actual:', clawContraption(testData, false));
console.log('Part 2 (only 2 winnable):', clawContraption(testData, true));

// Read the actual input file
const inputPath = path.join(__dirname, '13.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log('\n=== Actual Results ===');
    console.log('Part 1:', clawContraption(data, false));
    console.log('Part 2:', clawContraption(data, true));
} catch (err) {
    console.error('Error reading the input file:', err);
}

