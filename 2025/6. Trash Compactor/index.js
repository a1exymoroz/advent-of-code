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
    const lines = input.trim().split('\n');
    // console.log('lines', lines);
    let numberLength = 0;

    for (let number of lines[0].split(' ')) {
        if (number.length > numberLength) {
            numberLength = number.length;
        }
    }

    console.log('numberLength', numberLength);
    
    for (let i = 0; i < lines.length; i++) {
        const array = [];
        for (let j = 0; j < lines[i].length; j += numberLength) {   
            const number = lines[i].slice(j, j + numberLength);
            array.push(number);
            j++;
        }
        lines[i] = array;
    }
    const operators = lines.pop().map(char => char.trim());
    // console.log('operators', operators);
    // console.log('lines', lines);

    // console.log('numberLength', numberLength);
 
    const arrays = [];
    for (let i = 0; i < lines[0].length; i++) {
        const array = [];
        for (let j = 0; j < lines.length; j++) {
            const number = lines[j][i];
            for (let k = 0; k < numberLength; k++) {
                array[k] = array[k] ? array[k] + number[k] : number[k];
            }
        }
        console.log('before array', array);
        arrays.push(array.map(value => value.trim()).filter(value => value !== ''));
        console.log('after array', arrays);
    }
    // console.log('arrays', arrays);
 
    let sum = 0;
 
    for (let i = 0; i < arrays.length; i++) {
     const array = arrays[i];
     const operator = operators[i];
     if (operator === '+') {
         sum += array.reduce((acc, num) => acc + Number(num), 0);
     } else if (operator === '*') {
         sum += array.reduce((acc, num) => acc * Number(num), 1);
     }
    }
 
    return sum;
 }

// console.log('Part 1: 4277556', trashCompactor(testData));
// console.log('Part 2: 3263827', trashCompactorPart2(testData));
// Read the input file
const inputPath = path.join(__dirname, 'input.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    // console.log('Part 1: 4277556', trashCompactor(data));
    console.log('Part 2: 23159217', trashCompactorPart2(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}

