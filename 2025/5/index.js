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
    const [ranges, numbers] = input.trim().split('\n\n');
    const rangeNumbers = ranges.split('\n').map(line => line.split('-').map(Number));
    const numberNumbers = numbers.split('\n').map(line => parseInt(line));
    let count = 0;
    for (const number of numberNumbers) {
        for (const range of rangeNumbers) {
            if (number >= range[0] && number <= range[1]) {
                count++;
                break;
            }
        }
    }
    return count;
}

console.log('Part 1: 3', cafeteria(testData));
// console.log('Part 2: 43', cafeteria(testData));



// Read the input file
const inputPath = path.join(__dirname, 'input.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log('Part 2: 13', cafeteria(data));

    // console.log('Part 1: 13', printingDepartment(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}

