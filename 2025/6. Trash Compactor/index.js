const fs = require('fs');
const path = require('path');


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

