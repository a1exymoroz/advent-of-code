const fs = require('fs');
const path = require('path');

const testData = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

const cafeteria = (input) => {
    const lines = input.trim().split('\n');
    const numbers = lines.map(line => line.split('-').map(Number));
    return numbers.reduce((acc, curr) => acc + curr[1] - curr[0] + 1, 0);
}

console.log('Part 1: 13', cafeteria(testData));
// console.log('Part 2: 43', cafeteria(testData));



// Read the input file
const inputPath = path.join(__dirname, 'input.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    // console.log('Part 1: 13', printingDepartment(data));
    // console.log('Part 2: 13', cafeteria(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}

