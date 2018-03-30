export default class MinHeap {
  constructor() {
    // Array representation of the heap.
    this.heapContainer = [];
  }

  static getLeftChildIndex(parentIndex) {
    return (2 * parentIndex) + 1;
  }

  static getRightChildIndex(parentIndex) {
    return (2 * parentIndex) + 2;
  }

  static getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  static hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  hasLeftChild(parentIndex) {
    return MinHeap.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  hasRightChild(parentIndex) {
    return MinHeap.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  leftChild(parentIndex) {
    return this.heapContainer[MinHeap.getLeftChildIndex(parentIndex)];
  }

  rightChild(parentIndex) {
    return this.heapContainer[MinHeap.getRightChildIndex(parentIndex)];
  }

  parent(childIndex) {
    return this.heapContainer[MinHeap.getParentIndex(childIndex)];
  }

  swap(indexOne, indexTwo) {
    const tmp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = tmp;
  }

  peek() {
    if (this.heapContainer.length === 0) {
      return null;
    }

    return this.heapContainer[0];
  }

  poll() {
    if (this.heapContainer.length === 0) {
      return null;
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    }

    const item = this.heapContainer[0];

    // Move the last element from the end to the head.
    this.heapContainer[0] = this.heapContainer.pop();
    this.heapifyDown();

    return item;
  }

  add(item) {
    this.heapContainer.push(item);
    this.heapifyUp();
  }

  heapifyUp() {
    let currentIndex = this.heapContainer.length - 1;

    while (
      MinHeap.hasParent(currentIndex) &&
      this.parent(currentIndex) > this.heapContainer[currentIndex]
    ) {
      this.swap(currentIndex, MinHeap.getParentIndex(currentIndex));
      currentIndex = MinHeap.getParentIndex(currentIndex);
    }
  }

  heapifyDown() {
    let currentIndex = 0;
    let nextIndex = 0;

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex) &&
        this.leftChild(currentIndex) > this.rightChild(currentIndex)
      ) {
        nextIndex = MinHeap.getRightChildIndex(currentIndex);
      } else {
        nextIndex = MinHeap.getLeftChildIndex(currentIndex);
      }

      if (this.heapContainer[currentIndex] < this.heapContainer[nextIndex]) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  toString() {
    return this.heapContainer.toString();
  }
}
