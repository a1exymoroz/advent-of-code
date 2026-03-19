const fs = require('fs');
const path = require('path');


// console.log('Part 1: 13', printingDepartment(testData));
// console.log('Part 2: 43', printingDepartment2(testData));



// Read the input file
const inputPath = path.join(__dirname, 'input.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    // console.log('Part 1: 13', printingDepartment(data));
    console.log('Part 2: 13', printingDepartment2(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}

