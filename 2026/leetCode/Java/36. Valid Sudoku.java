// You are given a 9 x 9 Sudoku board. A Sudoku board is valid if:
// - Each row contains the digits 1-9 without duplicates.
// - Each column contains the digits 1-9 without duplicates.
// - Each of the nine 3 x 3 sub-boxes contains the digits 1-9 without duplicates.
//
// Return true if the board is valid, otherwise false.
// Note: A board does not need to be full or solvable to be valid.
//
// Example 1: valid board → true
// Example 2: duplicate in row 2 (two 1s in column 2) → false

import java.util.HashSet;
import java.util.Set;

class Solution {
    public boolean isValidSudoku(char[][] board) {
        return checkRows(board) && checkColumns(board) && checkBoxes(board);
    }

    private boolean checkRows(char[][] board) {
        for (int i = 0; i < 9; i++) {
            Set<Character> rowSet = new HashSet<>();
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') continue;
                if (rowSet.contains(board[i][j])) return false;
                rowSet.add(board[i][j]);
            }
        }
        return true;
    }

    private boolean checkColumns(char[][] board) {
        for (int i = 0; i < 9; i++) {
            Set<Character> colSet = new HashSet<>();
            for (int j = 0; j < 9; j++) {
                if (board[j][i] == '.') continue;
                if (colSet.contains(board[j][i])) return false;
                colSet.add(board[j][i]);
            }
        }
        return true;
    }

    private boolean checkBoxes(char[][] board) {
        for (int i = 0; i < 9; i += 3) {
            for (int j = 0; j < 9; j += 3) {
                Set<Character> boxSet = new HashSet<>();
                for (int k = 0; k < 3; k++) {
                    for (int l = 0; l < 3; l++) {
                        if (board[i + k][j + l] == '.') continue;
                        if (boxSet.contains(board[i + k][j + l])) return false;
                        boxSet.add(board[i + k][j + l]);
                    }
                }
            }
        }
        return true;
    }
}
