const fs = require('fs');
const path = require('path');

const testData = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;


const secretEntrance = (input) => {
    const lines = input.trim().split('\n');

    let number = 50;
    let count = 0;
    for (const line of lines) {
        const prevNumber = number;
        
        if (line[0] === 'L') {
            number -= parseInt(line.slice(1));
        } else {
            number += parseInt(line.slice(1));
        }

        // Count how many times the dial points at 0 during this rotation
        // The dial points at 0 at multiples of 100: ..., -200, -100, 0, 100, 200, ...
        // Count how many such multiples we pass through from prevNumber to number
        
        if (prevNumber < number) {
            // Moving forward: count multiples of 100 we cross
            const endMultiples = Math.floor(number / 100);
            count += endMultiples;
        } else if (prevNumber > number) {
            // Moving backward: count multiples of 100 we cross
            if (prevNumber > 0 && number < 0) {
                // Going from positive to negative: we cross 0, then negative multiples
                // Use ceil(-number/100) which counts 0 and all negative multiples
                count += Math.ceil(-number / 100);
            } else if (prevNumber === 0 && number < 0) {
                // Starting at 0, going negative: only count negative multiples (don't count 0 again)
                count += Math.floor(-number / 100);
            }
            // Note: prevNumber < 0 should never happen since prevNumber is always wrapped to [0, 100)
        }

        // Wrap number to be in range [0, 100) using modulo arithmetic
        const wrappedNumber = ((number % 100) + 100) % 100;
        
        // Count when the dial points at 0 at the END of a rotation
        // But don't double-count: if we crossed a positive multiple of 100 (>= 100) during rotation,
        // we already counted it, so don't count again at the end
        if (wrappedNumber === 0) {
            // Only count at end if we didn't cross a positive multiple of 100
            // (crossing negative multiples that wrap to 0 are handled separately)
            const crossedPositiveMultiple = prevNumber < number;
            if (!crossedPositiveMultiple) {
                count++;
            }
        }
        
        number = wrappedNumber;
    }

    return count;
}

console.log('Part 1: 6', secretEntrance(testData));


// Read the input file
const inputPath = path.join(__dirname, '1.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log('Part 1: 6689', secretEntrance(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}