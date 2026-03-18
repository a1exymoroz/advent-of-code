const fs = require('fs');
const path = require('path');

const testData = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;


const giftShop = (input) => {
    const lines = input.trim().split(',');
    let count = 0;
    for (const line of lines) {
        const [min, max] = line.split('-').map(Number);
        for (let i = min; i <= max; i++) {

            const str = i.toString();
            if (str.length % 2 !== 0) {
                continue;
            }


            const mid = Math.floor(str.length / 2);
            const left = str.slice(0, mid);
            const right = str.slice(mid);
            // console.log('left', left, 'right', right);
            if (left === right) {
                count += i;
            }
        }
    }
    return count;
}

const digitsRepeated = (str) => {
    // Check if the entire string is made up of a repeating pattern
    // Try different pattern lengths (must divide evenly into string length)
    for (let patternLen = 1; patternLen <= str.length / 2; patternLen++) {
        // Check if string length is divisible by pattern length
        if (str.length % patternLen !== 0) {
            continue;
        }

        const pattern = str.slice(0, patternLen);
        let isRepeated = true;
        
        // Check if the entire string is made up of repetitions of this pattern
        for (let i = patternLen; i < str.length; i += patternLen) {
            if (str.slice(i, i + patternLen) !== pattern) {
                isRepeated = false;
                break;
            }
        }
        
        if (isRepeated) {
            return true;
        }
    }
    return false;
}

const giftShop2 = (input) => {
    const lines = input.trim().split(',');
    let count = 0;
    for (const line of lines) {
        const [min, max] = line.split('-').map(Number);
        for (let i = min; i <= max; i++) {
            const str = i.toString();
            
            // Check if left half equals right half (only for even length)
            if (str.length % 2 === 0) {
                const mid = Math.floor(str.length / 2);
                const left = str.slice(0, mid);
                const right = str.slice(mid);
                if (left === right) {
                    count += i;
                    continue;
                }
            }

            // Check if the entire string is made up of a repeating pattern
            if (digitsRepeated(str)) {
                count += i;
            }
        }
    }
    return count;
}

console.log('Part 1: 1227775554', giftShop(testData));  // 1227775554
console.log('Part 2: 4174379265', giftShop2(testData));  // 2503764021

// Read the input file
const inputPath = path.join(__dirname, '2.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log('Part 1: 2503764021', giftShop(data));
    console.log('Part 2: 4174379265', giftShop2(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}