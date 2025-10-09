const fs = require('fs');
const path = require('path');

const red_nosed_reports = (str) => {
    let sum = 0;


    // Split the input string into lines
    const lines = str.trim().split('\n');

    for (const line of lines) {

        let parts = line.trim().split(/\s+/).map(value => +value);

        if (parts[0] > parts[parts.length - 1]) {
            parts = parts.reverse()
        }

        let flag = 2;
        console.log('before', parts);
        for (let i = 1; i < parts.length; i++) {
            const first = parts[i - 1];
            const second = parts[i];

            if (first >= second ) {
                flag--;
                const third = parts[i - 2];

                if (third >= second) {
                    parts.splice(i, 1);
                } else {
                    parts.splice(i - 1, 1);
                }


                i -= 2;
                if (!flag) break;
                else    continue;
            }


            if (second - first > 3) {
                flag--;
                parts.splice(i, 1);
                i -= 2;
                if (!flag) break;
                else    continue;
            }



        }
        console.log('after', parts, 'flag', flag);

        if(flag) {
            sum++;
        }

    }


    return sum;
}

// Read the input file
const inputPath = path.join(__dirname, '2.txt');
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    console.log(red_nosed_reports(data));
} catch (err) {
    console.error('Error reading the input file:', err);
}


// Issues Identified:
//      1. Incorrect Array Reversal Logic: Your algorithm reverses arrays if the first element is greater than the last, but this doesn't guarantee the correct direction for safety checks.

//      2. Broken Problem Dampener Implementation:

//          You allow 2 removals (flag = 2) instead of exactly 1
//          You're splicing elements while iterating, causing index confusion
//          The logic for choosing which element to remove is flawed
//      3. Index Management Issues: When you splice and then do i -= 2, you're potentially missing elements or double-processing others.

//      4.Incorrect Safety Logic: The algorithm doesn't properly validate the fundamental safety rules before attempting fixes.