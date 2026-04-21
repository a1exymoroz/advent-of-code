const fs = require('fs');
const path = require('path');

const testData = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1]
]

const checkAdjacent = (x, y, array) => {
    let count = 0;
    for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;
        if (newX < 0 || newY < 0 || newY >= array.length || newX >= array[newY].length) {
            continue;
        }   
        if (array[newY][newX] === '@') {
            count++;
        }
    }
    return count < 4 ? 1 : 0;
}

const printingDepartment = (input) => {
    const lines = input.trim().split('\n');
    const copyLines = lines.map(line => line.split(''));
    let count = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const array = line.split('');
        for (let j = 0; j < array.length; j++) {
            const char = array[j];
            if (char === '@') {
                const adjacent = checkAdjacent(j, i, lines);
                count += adjacent;
                if (adjacent === 1) {
                    copyLines[i][j] = 'X';
                }
            }
        }
    }
    // console.log(copyLines.map(line => line.join('')).join('\n'));
    return count;
}

const checkRemovedPaper = (lines) => {
    let count = 0;
    const newLines = lines.map(line => line.map(char => char));
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '@') {
                const adjacent = checkAdjacent(j, i, lines);
                count += adjacent;
                if (adjacent === 1) {
                    newLines[i][j] = '.';
                }
            }
        }
    }
    console.log(newLines.map(line => line.join('')).join('\n'));
    return {count, newLines};
}

const printingDepartment2 = (input) => {
    let lines = input.trim().split('\n').map(line => line.split(''));
    let removedPaper = 0;
    while (true) {
      const {count, newLines} = checkRemovedPaper(lines);
      if (count === 0) {
        break;
      }
      removedPaper += count;
      lines = newLines;
    }

    return removedPaper;
}


// console.log('Part 1: 13', printingDepartment(testData));
console.log('Part 2: 43', printingDepartment2(testData));



// Read the input file
const inputPath = path.join(__dirname, 'input.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    // console.log('Part 1: 13', printingDepartment(data));
    console.log('Part 2: 13', printingDepartment2(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}

