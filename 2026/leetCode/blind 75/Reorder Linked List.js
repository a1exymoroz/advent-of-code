// ou are given the head of a singly linked-list.

// The positions of a linked list of length = 7 for example, can intially be represented as:

// [0, 1, 2, 3, 4, 5, 6]

// Reorder the nodes of the linked list to be in the following order:

// [0, 6, 1, 5, 2, 4, 3]

// Notice that in the general case for a list of length = n the nodes are reordered to be in the following order:

// [0, n-1, 1, n-2, 2, n-3, ...]

// You may not modify the values in the list's nodes, but instead you must reorder the nodes themselves.

// Example 1:

// Input: head = [2,4,6,8]

// Output: [2,8,4,6]
// Example 2:

// Input: head = [2,4,6,8,10]

// Output: [2,10,4,8,6]


// Definition for singly-linked list.
function ListNode(val, next) {
    this.val = val;
    this.next = next;
}

class Solution {
    /**
     * @param {ListNode} head
     * @return {void}
     */
    reorderList(head) {
        if (!head || !head.next) return;

        // 1. Find the middle (slow stops at first half tail)
        let slow = head;
        let fast = head;
        while (fast.next && fast.next.next) {
            slow = slow.next;
            fast = fast.next.next;
        }

        // 2. Reverse the second half
        let prev = null;
        let current = slow.next;
        slow.next = null;
        while (current) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        // 3. Merge first half with reversed second half
        let first = head;
        let second = prev;
        while (second) {
            const nextFirst = first.next;
            const nextSecond = second.next;
            first.next = second;
            second.next = nextFirst;
            first = nextFirst;
            second = nextSecond;
        }
    }
}

function listToArray(head) {
    const result = [];
    while (head) {
        result.push(head.val);
        head = head.next;
    }
    return result;
}

const solution = new Solution();

const head1 = new ListNode(2, new ListNode(4, new ListNode(6, new ListNode(8))));
solution.reorderList(head1);
console.log(listToArray(head1)); // [2, 8, 4, 6]

const head2 = new ListNode(2, new ListNode(4, new ListNode(6, new ListNode(8, new ListNode(10)))));
solution.reorderList(head2);
console.log(listToArray(head2)); // [2, 10, 4, 8, 6]