const fs = require('fs');
const path = require('path');

const mullItOver = (str) => {
    let sum = 0;

    const matchMul = /(mul\((\d+),(\d+)\)|do(n't)?\(\))/g;

    const matchArray = [...str.matchAll(matchMul)];

    let skip = false;
    for (const match of matchArray) {

        if (match[0].startsWith("don't()")) {
            skip = true;
            continue;
        }

        if (match[0].startsWith("do()")) {
            skip = false;
            continue;
        }

        if (skip) {
            continue;
        }

        const a = parseInt(match[2]);
        const b = parseInt(match[3]);
        sum += a * b;
    }

    return sum;
}

const testData = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const testData2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`

// console.log('Actual result:', mullItOver(testData2));

// Read the actual input file
const inputPath = path.join(__dirname, '3.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log('Actual result:', mullItOver(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}