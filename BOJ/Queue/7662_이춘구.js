const [_, ...operations] = `2
7
I 16
I -5643
D -1
D 1
D 1
I 123
D -1
9
I -45
I 653
D 1
I -642
I 45
I 97
D 1
D -1
I 333`
  .toString()
  .trim()
  .split("\n");

// const [_, ...operations] = require("fs")
//   .readFileSync("/dev/stdin")
//   .toString()
//   .trim()
//   .split("\n");

class Heap {
  #heap = [];
  #compare;

  /**
   * @param {'min'|'max'} minOrMax
   */
  constructor(minOrMax) {
    this.#compare = (a, b) => {
      if (minOrMax === "min") return a < b;
      if (minOrMax === "max") return a > b;
    };
  }

  insert(value) {
    this.#heap.push(value);
    this.#bubbleUp(this.#heap.length - 1);
  }

  delete() {
    if (this.#heap.length === 0) return undefined;

    this.#swap(0, this.#heap.length - 1);
    const value = this.#heap.pop();
    this.#bubbleDown(0);

    return value;
  }

  #bubbleUp(currIndex) {
    const parentIndex = Math.floor((currIndex - 1) / 2);

    if (this.#compare(this.#heap[currIndex], this.#heap[parentIndex])) {
      this.#swap(currIndex, parentIndex);
      this.#bubbleUp(parentIndex);
    }
  }

  #bubbleDown(currIndex) {
    const leftChildIndex = currIndex * 2 + 1;
    const rightChildIndex = currIndex * 2 + 2;
    let parentIndex = currIndex;

    if (this.#compare(this.#heap[leftChildIndex], this.#heap[parentIndex])) {
      parentIndex = leftChildIndex;
    }
    if (this.#compare(this.#heap[rightChildIndex], this.#heap[parentIndex])) {
      parentIndex = rightChildIndex;
    }

    if (parentIndex !== currIndex) {
      this.#swap(currIndex, parentIndex);
      this.#bubbleDown(parentIndex);
    }
  }

  #swap(a, b) {
    [this.#heap[a], this.#heap[b]] = [this.#heap[b], this.#heap[a]];
  }

  getQueue() {
    return this.#heap;
  }

  length() {
    return this.#heap.length;
  }
}

class DualPriorityQueue {
  #minHeap = new Heap("min");
  #maxHeap = new Heap("max");
  #record = {};

  insert(value) {
    console.log("=== 삽입 전 ===");
    console.log("minHeap", this.#minHeap.getQueue());
    console.log("maxHeap", this.#maxHeap.getQueue());
    console.log("record", this.#record);

    this.#minHeap.insert(value);
    this.#maxHeap.insert(value);
    this.#record[value] = (this.#record[value] || 0) + 1;

    console.log("=== 삽입 후 ===");
    console.log("minHeap", this.#minHeap.getQueue());
    console.log("maxHeap", this.#maxHeap.getQueue());
    console.log("record", this.#record);
  }

  /**
   * @param {'min'|'max'} minOrMax
   */
  delete(minOrMax) {
    console.log("=== 삭제 전 ===");
    console.log("minHeap", this.#minHeap.getQueue());
    console.log("maxHeap", this.#maxHeap.getQueue());
    console.log("record", this.#record);
    const targetHeap = minOrMax === "min" ? this.#minHeap : this.#maxHeap;
    // this.#sync(targetHeap);
    while (targetHeap.length()) {
      const deletedValue = targetHeap.delete();
      const recordStatus = this.#record[deletedValue];
      if (recordStatus === undefined) continue;

      if (recordStatus === 1) delete this.#record[deletedValue];
      else this.#record[deletedValue] -= 1;
      // if (recordStatus === 0 || recordStatus === undefined) {
      //   targetHeap.delete();
      // } else break;
      return deletedValue;
    }

    const deletedValue = targetHeap.delete();
    if (deletedValue === undefined) return;

    console.log("삭제된 값", deletedValue);
    console.log("삭제된 값의 갯수", this.#record[deletedValue]);
    if (this.#record[deletedValue] > 0) this.#record[deletedValue] -= 1;
    else delete this.#record[deletedValue];
    console.log("=== 삭제 후 ===");
    console.log("minHeap", this.#minHeap.getQueue());
    console.log("maxHeap", this.#maxHeap.getQueue());
    console.log("record", this.#record);
  }

  #sync(targetHeap) {
    console.log("=== 동기화 ===");
    while (targetHeap.length() !== 0) {
      const value = targetHeap.getQueue()[0];
      console.log("대상값", value, "의 record 상태", this.#record[value]);
      const recordStatus = this.#record[value];
      if (recordStatus === 0 || recordStatus === undefined) {
        targetHeap.delete();
      } else break;
    }
  }

  getMax() {
    return this.#maxHeap.getQueue()[0];
  }

  getMin() {
    return this.#minHeap.getQueue()[0];
  }
}

const answers = [];
let leftTestCase = 0;
let dualPriorityQueue;

for (const operation of operations) {
  console.log("=================");
  if (isFinite(Number(operation))) {
    leftTestCase = Number(operation);
    dualPriorityQueue = new DualPriorityQueue();
    continue;
  }

  let [operator, number] = operation.split(" ");

  if (operator === "I") {
    console.log(Number(number), "삽입 명령");
    dualPriorityQueue.insert(Number(number));
  } else if (operator === "D") {
    const minOrMax = number === "-1" ? "min" : "max";
    console.log(minOrMax, "삭제 명령");
    dualPriorityQueue.delete(minOrMax);
  }

  leftTestCase -= 1;

  if (leftTestCase > 0) continue;

  const max = dualPriorityQueue.getMax();
  const min = dualPriorityQueue.getMin();

  if (max === undefined || min === undefined) answers.push("EMPTY");
  else answers.push(`${max} ${min}`);
}

console.log(answers.join("\n"));
