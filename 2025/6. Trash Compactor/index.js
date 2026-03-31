const fs = require('fs');
const path = require('path');

const testData = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

const trashCompactor = (input) => {
   const lines = input.trim().split('\n').map(line => line.trim().split(/\s+/));

   const arrays = Array.from({ length: lines[0].length }, () => []);
   for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
        arrays[j].push(lines[i][j]);
    }
   }

   let sum = 0;

   for (let i = 0; i < arrays.length; i++) {
    const array = arrays[i];
    const operator = array[array.length - 1];
    const numbers = array.slice(0, array.length - 1);
    if (operator === '+') {
        sum += numbers.reduce((acc, num) => acc + Number(num), 0);
    } else if (operator === '*') {
        sum += numbers.reduce((acc, num) => acc * num, 1);
    }
   }

   return sum;
}

console.log('Part 1: 4277556', trashCompactor(testData));
// Read the input file
const inputPath = path.join(__dirname, 'input.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log('Part 1: 4277556', trashCompactor(data));
    // console.log('Part 2: 13', trashCompactor(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}

