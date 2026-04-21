const fs = require('fs');
const path = require('path');

const testData = `987654321111111
811111111111119
234234234234278
818181911112111`;

const getNumber = (line) => {
    // Handle empty line
    if (!line || line.length === 0) {
        return 0;
    }
    
    // Handle single digit line
    if (line.length === 1) {
        const digit = +line[0];
        return +`${digit}${digit}`;
    }
    
    let left = 0;
    let right = 0;
    for (let i = 0; i < line.length; i++) {
        const current = +line[i];
        const next = i < line.length - 1 ? +line[i + 1] : undefined;
        
        if (current > left && i < line.length - 1 && next !== undefined) {
            left = current;
            right = next;
            continue;
        }
        if (current > right) {
            right = current;
        }
    }
    // console.log('line', line);
    // console.log('left', left, 'right', right);
    return +`${left}${right}`;
}

const lobbyBattery = (input) => {
    // console.log('input', input);
    const lines = input.trim().split('\n');
    let count = 0;
    for (const line of lines) {
        count += getNumber(line);
    }
    return count;
}
const get12Numbers = (line) => {
    const numbers = line.split('').map(Number);
    let length = 12;
    let index = 0;
    let number = '';

    while (number.length < 12) {
        let currentIndex = index;
        let currentNumber = 0;
        for (let i = index; i <= numbers.length - length + number.length; i++) {
            const current = numbers[i];
            if (current > currentNumber) {
                currentNumber = current;
                currentIndex = i;
            }
        }
        number += currentNumber;
        index = currentIndex + 1;
    }

    console.log('number', number, line);
    return +number;
}

const lobbyBattery2 = (input) => {
    // console.log('input', input);
    const lines = input.trim().split('\n');
    let count = 0;
    for (const line of lines) {
        count += get12Numbers(line);
    }
    return count;
}


// console.log('Part 1: 357', lobbyBattery(testData));
console.log('Part 1: 3121910778619', lobbyBattery2(testData));


// Read the input file
const inputPath = path.join(__dirname, 'input.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    // console.log('Part 1: 17179', lobbyBattery(data));
    console.log('Part 2: 3121910778619', lobbyBattery2(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}

