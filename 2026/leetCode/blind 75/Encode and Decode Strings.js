// Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.

// Machine 1 (sender) has the function:

// string encode(vector<string> strs) {
//     // ... your code
//     return encoded_string;
// }
// Machine 2 (receiver) has the function:

// vector<string> decode(string s) {
//     //... your code
//     return strs;
// }
// So Machine 1 does:

// string encoded_string = encode(strs);
// and Machine 2 does:

// vector<string> strs2 = decode(encoded_string);
// strs2 in Machine 2 should be the same as strs in Machine 1.

// Implement the encode and decode methods.

// Example 1:

// Input: dummy_input = ["Hello","World"]

// Output: ["Hello","World"]

// Explanation:
// Machine 1:
// Codec encoder = new Codec();
// String msg = encoder.encode(strs);
// Machine 1 ---msg---> Machine 2

// Machine 2:
// Codec decoder = new Codec();
// String[] strs = decoder.decode(msg);

class Solution {
    /**
     * @param {string[]} strs
     * @returns {string}
     */
    encode(strs) {
        return strs.map((s) => `${s.length}#${s}`).join('');
    }

    /**
     * @param {string} str
     * @returns {string[]}
     */
    decode(str) {
        const out = [];
        let i = 0;
        while (i < str.length) {
            const hash = str.indexOf('#', i);
            const len = Number(str.slice(i, hash));
            i = hash + 1 + len;
            out.push(str.slice(hash + 1, i));
        }
        return out;
        
    }

    decode2(str) {
        let res = [];
        let i = 0;
        while (i < str.length) {
            let j = i;
            while (str[j] !== '#') {
                j++;
            }
            let length = parseInt(str.substring(i, j));
            i = j + 1;
            j = i + length;
            res.push(str.substring(i, j));
            i = j;
        }
        return res;
    }
}

const solution = new Solution();
// console.log(solution.encode(["Hello","World"]));
console.log(solution.decode(solution.encode(["Hello","World"])));
// console.log(solution.decode(solution.encode([""])));
// console.log(solution.decode(solution.encode([])));
// console.log(solution.decode(solution.encode(['', ''])));

