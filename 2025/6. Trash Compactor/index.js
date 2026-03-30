const fs = require('fs');
const path = require('path');

const testData = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

const trashCompactor = (input) => {
   
}
// Read the input file
const inputPath = path.join(__dirname, 'input.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    // console.log('Part 2: 511', trashCompactor(data));
    // console.log('Part 2: 13', trashCompactor(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}

