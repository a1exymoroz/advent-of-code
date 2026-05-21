// You are given the heads of two sorted linked lists list1 and list2.

// Merge the two lists into one sorted linked list and return the head of the new sorted linked list.

// The new list should be made up of nodes from list1 and list2.

// Example 1:



// Input: list1 = [1,2,4], list2 = [1,3,5]

// Output: [1,1,2,3,4,5]
// Example 2:

// Input: list1 = [], list2 = [1,2]

// Output: [1,2]
// Example 3:

// Input: list1 = [], list2 = []

// Output: []

class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

var mergeTwoLists = function(list1, list2) {
    if (list1 === null) return list2;
    if (list2 === null) return list1;

    if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
}

var mergeTwoLists2 = function(list1, list2) {
    const dummy = { val: 0, next: null };
    let node = dummy;

    while (list1 && list2) {
        if (list1.val < list2.val) {
            node.next = list1;
            list1 = list1.next;
        } else {
            node.next = list2;
            list2 = list2.next;
        }
        node = node.next;
    }

    if (list1) {
        node.next = list1;
    } else {
        node.next = list2;
    }

    return dummy.next;
}

console.log(mergeTwoLists(new ListNode(1, new ListNode(2, new ListNode(4))), new ListNode(1, new ListNode(3, new ListNode(5)))));
console.log(mergeTwoLists(new ListNode(), new ListNode(1, new ListNode(2))));
console.log(mergeTwoLists(new ListNode(), new ListNode()));