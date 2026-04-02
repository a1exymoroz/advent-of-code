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

const trashCompactorPart2 = (input) => {
    const lines = input.split('\n');
    
    // Remove trailing empty lines
    while (lines.length && lines[lines.length - 1].trim() === '') {
        lines.pop();
    }
    
    const operatorRow = lines[lines.length - 1];
    const numberRows = lines.slice(0, lines.length - 1);
    
    // Find the width of the grid (max line length)
    const width = Math.max(...lines.map(l => l.length));
    
    // Pad all rows to the same width
    const paddedRows = numberRows.map(row => row.padEnd(width, ' '));
    const paddedOperatorRow = operatorRow.padEnd(width, ' ');
    
    // Process column by column
    let problems = [];
    let currentNumbers = [];
    let currentOperator = null;
    
    for (let col = 0; col < width; col++) {
        // Build the vertical string for this column (digits top-to-bottom)
        let colStr = '';
        for (let row = 0; row < paddedRows.length; row++) {
            colStr += paddedRows[row][col] || ' ';
        }
        
        const operatorChar = paddedOperatorRow[col];
        
        // If column is all spaces and operator is space, we're between problems
        if (colStr.trim() === '' && operatorChar === ' ') {
            if (currentNumbers.length > 0 && currentOperator) {
                problems.push({ numbers: currentNumbers, operator: currentOperator });
                currentNumbers = [];
                currentOperator = null;
            }
        } else {
            // This column forms a number (read top-to-bottom)
            const number = colStr.trim();
            if (number !== '') {
                currentNumbers.push(number);
            }
            if (operatorChar === '+' || operatorChar === '*') {
                currentOperator = operatorChar;
            }
        }
    }
    
    // Don't forget the last problem
    if (currentNumbers.length > 0 && currentOperator) {
        problems.push({ numbers: currentNumbers, operator: currentOperator });
    }
    
    // Calculate sum
    let sum = 0;
    for (const problem of problems) {
        if (problem.operator === '+') {
            sum += problem.numbers.reduce((acc, num) => acc + Number(num), 0);
        } else if (problem.operator === '*') {
            sum += problem.numbers.reduce((acc, num) => acc * Number(num), 1);
        }
    }
    
    return sum;
}

// console.log('Part 1: 4277556', trashCompactor(testData));
console.log('Part 2 (test): 3263827', trashCompactorPart2(testData));
// Read the input file
const inputPath = path.join(__dirname, 'input.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    // console.log('Part 1: 4277556', trashCompactor(data));
    console.log('Part 2 (real):', trashCompactorPart2(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}

