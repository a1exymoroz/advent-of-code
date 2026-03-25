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

const cafeteria2 = (input) => {
    const [ranges, numbers] = input.trim().split('\n\n');
    const rangeNumbers = ranges.split('\n').map(line => line.split('-').map(Number)).sort((a, b) => a[0] - b[0]);
    // console.log(rangeNumbers);
    const rangeMap = [];
    for (const range of rangeNumbers) {
        const [start, end] = range;
        let isOverlap = false;
        for(const currentRange of rangeMap) {
            // start 16 end 20 and currentRange 12,18
            // Inside
            if (start >= currentRange[0] && end <= currentRange[1]) {
                isOverlap = true;
                break;
            }
            // Outside
            if (start < currentRange[0] && end > currentRange[1]) {
                isOverlap = true;
                currentRange[0] = start;
                currentRange[1] = end;
                break;
            }
            // Left Overlap
            if (start < currentRange[0] && end > currentRange[0]) {
                isOverlap = true;
                currentRange[0] = start;
                break;
            }
            // Right Overlap
            if (start <= currentRange[1] && end > currentRange[1]) {
                isOverlap = true;
                currentRange[1] = end;
                break;
            }
        }
        if (!isOverlap) {
            rangeMap.push(range);
        }
    }

    // console.log(rangeMap);

    let count = 0;
    for (const range of rangeMap) {
        count += range[1] - range[0] + 1;
    }
    return count;
}

// console.log('Part 1: 3', cafeteria(testData));
console.log('Part 2: 14', cafeteria2(testData));



// Read the input file
const inputPath = path.join(__dirname, 'input.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    // console.log('Part 2: 511', cafeteria(data));
    console.log('Part 2: 13', cafeteria2(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}

