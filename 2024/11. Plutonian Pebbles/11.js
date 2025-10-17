const plutonianPebbles = (input) => {
    const lines = input.trim().split(' ');

    for (let i = 0; i < 75; i++) {
        for(let j = 0; j < lines.length; j++) {
            const current = lines[j];

            if (current === '0') {
                lines[j] = '1';
            } else if (current.length % 2 === 0) {
                const mid = current.length / 2;
                const left = current.substr(0, mid);
                const right = current.substr(mid);
                
                lines[j] = `${Number(left)}`;
                lines.splice(j + 1, 0, `${Number(right)}`);
                j++; // Skip the next element since we just added it

            } else {
                lines[j] = `${lines[j] * 2024}`;
            }
        }
    }

    // console.log(lines);

    return lines.length;
}


/**
 * Transform a single stone according to the rules
 * @param {string} stone - The stone value as a string
 * @returns {Array<string>} Array of resulting stone(s) after transformation
 */
const transformStone = (stone) => {
    // Rule 1: If stone is 0, replace with 1
    if (stone === '0') {
        return ['1'];
    }
    
    // Rule 2: If stone has even number of digits, split in half
    if (stone.length % 2 === 0) {
        const mid = stone.length / 2;
        const left = stone.slice(0, mid);
        const right = stone.slice(mid);
        
        // Convert to numbers to remove leading zeros, then back to strings
        return [String(Number(left)), String(Number(right))];
    }
    
    // Rule 3: Otherwise, multiply by 2024
    return [String(Number(stone) * 2024)];
};

/**
 * Optimized approach using memoization and frequency counting
 * This can handle large numbers of blinks efficiently!
 * @param {string} input - Initial stones as space-separated string
 * @param {number} blinks - Number of blinks to simulate
 * @returns {number} Total number of stones after all blinks
 */
const plutonianPebblesOptimized = (input, blinks = 25) => {
    // Use a Map to count frequency of each stone value
    let stoneCounts = new Map();
    
    // Initialize with input stones
    const initialStones = input.trim().split(' ');
    for (const stone of initialStones) {
        stoneCounts.set(stone, (stoneCounts.get(stone) || 0) + 1);
    }
    
    console.log(`Initial: ${initialStones.join(' ')} (${initialStones.length} stones)`);
    
    // Memoization cache for stone transformations
    const transformCache = new Map();
    
    const getTransformation = (stone) => {
        if (transformCache.has(stone)) {
            return transformCache.get(stone);
        }
        const result = transformStone(stone);
        transformCache.set(stone, result);
        return result;
    };
    
    for (let blink = 1; blink <= blinks; blink++) {
        const newStoneCounts = new Map();
        
        // For each unique stone value and its count
        for (const [stone, count] of stoneCounts.entries()) {
            // Transform the stone and add the resulting stones
            const transformedStones = getTransformation(stone);
            
            for (const newStone of transformedStones) {
                newStoneCounts.set(newStone, (newStoneCounts.get(newStone) || 0) + count);
            }
        }
        
        stoneCounts = newStoneCounts;
        
        // Calculate total stones
        const totalStones = Array.from(stoneCounts.values()).reduce((sum, count) => sum + count, 0);
        
        // Log progress
        if (blink <= 10 || blink % 5 === 0 || blink === blinks) {
            const uniqueStones = stoneCounts.size;
            console.log(`After blink ${blink}: ${totalStones} stones (${uniqueStones} unique values)`);
        }
    }
    
    // Sum all counts to get total number of stones
    return Array.from(stoneCounts.values()).reduce((sum, count) => sum + count, 0);
};

// Test data
const testData = `125 17`;

const testData2 = `0 44 175060 3442 593 54398 9 8101095`; // Add test data here

console.log('\n=== Expected vs Actual ===');
// console.log('Part 1 - Actual: 197157', plutonianPebbles(testData2));
console.log('Part 2 - Actual: 234430066982597', plutonianPebblesOptimized(testData2, 75));
