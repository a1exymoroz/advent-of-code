import java.util.*;

/**
 * Java Collections cheat sheet — popular types and methods for LeetCode / interviews.
 * Run main() to see examples. Uncomment sections to experiment.
 */
public class PopularCollections {

    public static void main(String[] args) {
        listExamples();
        setExamples();
        mapExamples();
        queueAndDequeExamples();
        stackExamples();
        priorityQueueExamples();
        arrayExamples();
        collectionsUtilityExamples();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // LIST — ordered, allows duplicates, index-based access
    // Implementations: ArrayList (default), LinkedList, Vector (legacy)
    // ─────────────────────────────────────────────────────────────────────────

    static void listExamples() {
        // Pre-fill: N items with the same value (e.g. 10 zeros)
        List<Integer> tenZeros = new ArrayList<>(Collections.nCopies(10, 0)); // mutable
        List<Integer> fixedTenZeros = Collections.nCopies(10, 0);             // fixed-size, cannot add/remove

        // ArrayList — O(1) random access, O(n) insert/remove in middle
        List<Integer> arrayList = new ArrayList<>();
        arrayList.add(1);              // append
        arrayList.add(0, 99);          // insert at index
        arrayList.addAll(List.of(2, 3));
        arrayList.get(0);              // read by index
        arrayList.set(1, 100);         // replace at index
        arrayList.remove(0);           // remove by index → returns removed element
        arrayList.remove(Integer.valueOf(2)); // remove by value (use valueOf for Integer!)
        arrayList.size();
        arrayList.isEmpty();
        arrayList.contains(3);
        arrayList.indexOf(3);          // first occurrence, -1 if absent
        arrayList.lastIndexOf(3);
        arrayList.subList(0, 2);       // view [start, end) — backed by original list
        arrayList.toArray();           // Object[]
        arrayList.toArray(new Integer[0]); // typed array

        // LinkedList — O(1) add/remove at ends, O(n) random access
        LinkedList<Integer> linkedList = new LinkedList<>();
        linkedList.addFirst(1);        // deque operations
        linkedList.addLast(2);
        linkedList.getFirst();
        linkedList.getLast();
        linkedList.removeFirst();
        linkedList.removeLast();
        linkedList.add(3);             // same as addLast

        // Static factory (Java 9+)
        List<String> immutable = List.of("a", "b", "c"); // cannot add/remove
        List<String> mutableCopy = new ArrayList<>(List.of("x", "y"));

        // Iteration
        for (int x : arrayList) { /* ... */ }
        arrayList.forEach(x -> { /* ... */ });
        Iterator<Integer> it = arrayList.iterator();
        while (it.hasNext()) { it.next(); }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SET — no duplicates
    // Implementations: HashSet (default), LinkedHashSet (insertion order), TreeSet (sorted)
    // ─────────────────────────────────────────────────────────────────────────

    static void setExamples() {
        // HashSet — O(1) average add/contains/remove, no order guarantee
        Set<Integer> hashSet = new HashSet<>();
        hashSet.add(1);
        hashSet.add(1);                // duplicate ignored → still size 1
        hashSet.addAll(List.of(2, 3));
        hashSet.remove(2);
        hashSet.contains(1);
        hashSet.size();
        hashSet.isEmpty();
        hashSet.clear();

        // LinkedHashSet — insertion order preserved
        Set<Integer> linkedHashSet = new LinkedHashSet<>(List.of(3, 1, 2)); // iteration: 3, 1, 2

        // TreeSet — sorted (natural order or custom Comparator), O(log n)
        TreeSet<Integer> treeSet = new TreeSet<>();
        treeSet.add(3);
        treeSet.add(1);
        treeSet.add(2);                // iteration: 1, 2, 3
        treeSet.first();                 // smallest
        treeSet.last();                  // largest
        treeSet.ceiling(2);              // >= 2, or null
        treeSet.floor(2);                // <= 2, or null
        treeSet.higher(2);               // strictly > 2
        treeSet.lower(2);                // strictly < 2
        treeSet.subSet(1, 4);            // [1, 4) — inclusive start, exclusive end
        treeSet.headSet(3);              // elements < 3
        treeSet.tailSet(2);              // elements >= 2
        treeSet.pollFirst();             // remove & return smallest
        treeSet.pollLast();

        // Custom order
        TreeSet<String> byLength = new TreeSet<>((a, b) -> a.length() - b.length());
    }

    // ─────────────────────────────────────────────────────────────────────────
    // MAP — key → value pairs, keys are unique
    // Implementations: HashMap (default), LinkedHashMap, TreeMap, Hashtable (legacy)
    // ─────────────────────────────────────────────────────────────────────────

    static void mapExamples() {
        // HashMap — O(1) average get/put/remove, no order guarantee
        Map<String, Integer> hashMap = new HashMap<>();
        hashMap.put("a", 1);
        hashMap.put("b", 2);
        hashMap.putIfAbsent("a", 99);    // only if key missing
        hashMap.get("a");
        hashMap.getOrDefault("z", 0);    // default if key absent
        hashMap.containsKey("a");
        hashMap.containsValue(1);
        hashMap.remove("a");
        hashMap.remove("b", 2);          // remove only if key maps to this value
        hashMap.replace("a", 10);        // replace value if key exists
        hashMap.computeIfAbsent("c", k -> k.length());
        hashMap.computeIfPresent("c", (k, v) -> v + 1);
        hashMap.merge("d", 1, Integer::sum); // add or combine values
        hashMap.size();
        hashMap.isEmpty();
        hashMap.keySet();                // Set<K>
        hashMap.values();                // Collection<V>
        hashMap.entrySet();              // Set<Map.Entry<K,V>>

        // Iterate entries (most common pattern)
        for (Map.Entry<String, Integer> entry : hashMap.entrySet()) {
            String key = entry.getKey();
            Integer val = entry.getValue();
        }
        hashMap.forEach((k, v) -> { /* ... */ });

        // LinkedHashMap — insertion order (or access-order with constructor flag)
        Map<String, Integer> linkedHashMap = new LinkedHashMap<>();

        // TreeMap — sorted by keys, O(log n)
        TreeMap<Integer, String> treeMap = new TreeMap<>();
        treeMap.put(3, "c");
        treeMap.put(1, "a");
        treeMap.firstKey();
        treeMap.lastKey();
        treeMap.floorKey(2);             // largest key <= 2
        treeMap.ceilingKey(2);
        treeMap.subMap(1, 3);            // [1, 3)
        treeMap.headMap(3);
        treeMap.tailMap(1);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // QUEUE & DEQUE — FIFO / double-ended
    // Use ArrayDeque (preferred) or LinkedList
    // ─────────────────────────────────────────────────────────────────────────

    static void queueAndDequeExamples() {
        // Queue (FIFO) — ArrayDeque is faster than LinkedList for most cases
        Queue<Integer> queue = new ArrayDeque<>();
        queue.offer(1);                  // enqueue (add to tail) — returns false if full
        queue.offer(2);
        queue.add(3);                    // enqueue — throws if full (unbounded: same as offer)
        queue.peek();                    // front without removing, null if empty
        queue.element();                 // front — throws if empty
        queue.poll();                    // dequeue (remove front), null if empty
        queue.remove();                  // dequeue — throws if empty
        queue.size();
        queue.isEmpty();

        // Deque (double-ended queue)
        Deque<Integer> deque = new ArrayDeque<>();
        deque.offerFirst(1);             // add to front
        deque.offerLast(2);              // add to back
        deque.addFirst(0);
        deque.addLast(3);
        deque.peekFirst();
        deque.peekLast();
        deque.pollFirst();               // remove from front
        deque.pollLast();                // remove from back
        deque.removeFirst();
        deque.removeLast();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STACK — LIFO
    // Prefer ArrayDeque over legacy java.util.Stack (Stack extends Vector, synchronized)
    // ─────────────────────────────────────────────────────────────────────────

    static void stackExamples() {
        Deque<Integer> stack = new ArrayDeque<>();

        stack.push(1);                   // push onto top  (= addFirst)
        stack.push(2);
        stack.peek();                      // top without removing
        stack.pop();                       // pop top       (= removeFirst)
        stack.isEmpty();
        stack.size();

        // Legacy Stack (avoid in new code, but you may see it)
        // Stack<Integer> legacy = new Stack<>();
        // legacy.push(1); legacy.pop(); legacy.peek();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PRIORITY QUEUE — min-heap by default (smallest element at head)
    // O(log n) insert/remove, O(1) peek
    // ─────────────────────────────────────────────────────────────────────────

    static void priorityQueueExamples() {
        // Min-heap (default)
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.offer(3);
        minHeap.offer(1);
        minHeap.offer(2);
        minHeap.peek();                    // 1 (smallest)
        minHeap.poll();                    // removes 1
        minHeap.add(4);                    // same as offer for unbounded queue

        // Max-heap — reverse comparator
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        // or: new PriorityQueue<>((a, b) -> b - a);  // watch overflow for large ints

        // Custom objects — must be Comparable or pass Comparator
        PriorityQueue<int[]> bySum = new PriorityQueue<>((a, b) -> (a[0] + a[1]) - (b[0] + b[1]));

        minHeap.size();
        minHeap.isEmpty();
        minHeap.contains(3);
        minHeap.clear();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ARRAYS — not a Collection, but used constantly with collections
    // ─────────────────────────────────────────────────────────────────────────

    static void arrayExamples() {
        int[] arr = {3, 1, 2};
        int[] sized = new int[5];          // default 0
        int[] tenZeros = new int[10];      // 10 zeros — simplest for LeetCode (int defaults to 0)
        boolean[] tenFalse = new boolean[10]; // boolean defaults to false

        Arrays.sort(arr);                  // in-place ascending
        Arrays.sort(arr, 0, 2);            // sort range [0, 2)
        // Arrays.sort(arr, (a, b) -> b - a); // works on Integer[] not int[]

        int idx = Arrays.binarySearch(arr, 2); // array must be sorted; negative if not found
        Arrays.fill(sized, 7);
        Arrays.copyOf(arr, 10);            // resize / copy
        Arrays.copyOfRange(arr, 0, 2);
        Arrays.equals(arr, sized);
        String s = Arrays.toString(arr);   // "[1, 2, 3]"

        // List ↔ array
        List<Integer> list = Arrays.asList(1, 2, 3); // fixed-size list backed by array
        Integer[] boxed = Arrays.stream(arr).boxed().toArray(Integer[]::new);

        // 2D arrays
        int[][] grid = new int[3][4];
        int[][] matrix = {{1, 2}, {3, 4}};
        Arrays.deepToString(matrix);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Collections utility class — static helpers for sorting, searching, etc.
    // ─────────────────────────────────────────────────────────────────────────

    static void collectionsUtilityExamples() {
        List<Integer> list = new ArrayList<>(List.of(3, 1, 4, 1, 5));

        Collections.sort(list);                          // ascending
        Collections.sort(list, Collections.reverseOrder()); // descending
        Collections.reverse(list);
        Collections.shuffle(list);
        Collections.swap(list, 0, 1);

        int max = Collections.max(list);
        int min = Collections.min(list);
        int freq = Collections.frequency(list, 1);

        Collections.binarySearch(list, 3);               // list must be sorted
        Collections.nCopies(10, 0);                      // immutable list of 10 zeros — wrap in ArrayList<> for mutable
        Collections.fill(list, 0);                       // replace every element in an existing list
        Collections.copy(list, new ArrayList<>(list));   // dest must be >= src size

        // Immutable wrappers
        List<Integer> unmodifiable = Collections.unmodifiableList(list);
        // unmodifiable.add(1); // UnsupportedOperationException

        // Singleton / empty
        Collections.singletonList(42);
        Collections.singletonMap("k", 1);
        Collections.emptyList();
        Collections.emptySet();
        Collections.emptyMap();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // QUICK REFERENCE — time complexity (average case)
    // ─────────────────────────────────────────────────────────────────────────
    //
    //  Operation          | ArrayList | LinkedList | HashSet | TreeSet | HashMap | TreeMap
    //  -------------------|-----------|------------|---------|---------|---------|--------
    //  get / contains     | O(1)      | O(n)       | O(1)    | O(log n)| O(1)    | O(log n)
    //  add                | O(1)*     | O(1)       | O(1)    | O(log n)| O(1)    | O(log n)
    //  remove             | O(n)      | O(1)**     | O(1)    | O(log n)| O(1)    | O(log n)
    //
    //  * amortized (occasional resize)
    //  ** O(1) if you have the node reference; O(n) to find it first
    //
    //  LeetCode defaults:
    //    List       → ArrayList
    //    Set        → HashSet (use TreeSet when you need order / range queries)
    //    Map        → HashMap (use TreeMap for sorted keys / floor/ceiling)
    //    Stack      → Deque<Integer> stack = new ArrayDeque<>();
    //    Queue      → Queue<Integer> q = new ArrayDeque<>();
    //    Min-heap   → PriorityQueue<Integer>
    //    Max-heap   → PriorityQueue<>(Collections.reverseOrder())
}
