// Given the beginning of a singly linked list head, reverse the list, and return the new beginning of the list.

// Example 1:

// Input: head = [0,1,2,3]

// Output: [3,2,1,0]
// Example 2:

// Input: head = []

// Output: []

var reverseList = function(head) {

    let second = head.next;
    head.next = null;

    while (second !== null) {
        const temp = second.next;
        second.next = head;
        head = second;
        second = temp;
    }

    return head;
}

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */

class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}


console.log(reverseList(new ListNode(0, new ListNode(1, new ListNode(2, new ListNode(3))))));
// console.log(reverseList([]));