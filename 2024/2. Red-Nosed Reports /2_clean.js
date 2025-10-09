const fs = require('fs');
const path = require('path');

// Helper function to check if a sequence is safe according to the rules
const isSafeSequence = (levels) => {
    if (levels.length < 2) return true;
    
    // Determine if sequence should be increasing or decreasing
    let isIncreasing = null;
    
    for (let i = 1; i < levels.length; i++) {
        const diff = levels[i] - levels[i - 1];
        
        // Check if difference is within valid range (1 to 3)
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false;
        }
        
        // Determine direction on first valid difference
        if (isIncreasing === null) {
            isIncreasing = diff > 0;
        } else {
            // Check if direction is consistent
            if ((diff > 0) !== isIncreasing) {
                return false;
            }
        }
    }
    
    return true;
};

// Helper function to check if a sequence can be made safe by removing one level
const canBeMadeSafe = (levels) => {
    // Try removing each level one at a time
    for (let i = 0; i < levels.length; i++) {
        const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
        if (isSafeSequence(modifiedLevels)) {
            return true;
        }
    }
    return false;
};

const red_nosed_reports = (str) => {
    let safeCount = 0;
    const lines = str.trim().split('\n');

    for (const line of lines) {
        const levels = line.trim().split(/\s+/).map(value => parseInt(value));
        
        // Check if already safe
        if (isSafeSequence(levels)) {
            safeCount++;
        } 
        // Check if can be made safe with Problem Dampener
        else if (canBeMadeSafe(levels)) {
            safeCount++;
        }
    }

    return safeCount;
};

// Test with the example data first
const exampleData = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

console.log('Example result:', red_nosed_reports(exampleData));
console.log('Expected: 4');

// Read the actual input file
const inputPath = path.join(__dirname, '2.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log('Actual result:', red_nosed_reports(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}