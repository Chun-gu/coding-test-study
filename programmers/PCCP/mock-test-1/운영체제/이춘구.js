function solution(program) {
  // 대기시간
  const waitingTimes = new Array(10).fill(0);
  // 현재 시각
  let currSecond = 0;
  // 종료 시각
  let finishTime = 0;
  // currSecond 1씩 증가시키기
  // 호출 시각 기준 내림차순으로 정렬시킨 배열
  const programs = program.sort((a, b) => b[1] - a[1]);
  // 프로그램을 대기시킬 우선순위 큐
  const waitingQueue = new PriorityQueue();
  // 아직 호출시각이 되지 않은 프로그램이 있거나 대기 중인 큐가 있다면
  while (programs.length || waitingQueue.length()) {
    while (programs.at(-1)[1] === currSecond) {
      waitingQueue.enqueue(programs.pop());
    }
    currSecond += 1;
    waitingQueue.getQueue().forEach((work) => {
      waitingTimes[work[0]] += 1;
    });
  }

  return [finishTime, ...waitingTimes];
}

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(item) {
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  dequeue() {
    const root = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }

    return root;
  }

  bubbleUp(index) {
    const parentIndex = Math.floor((index - 1) / 2);

    if (index > 0 && this.heap[index] < this.heap[parentIndex]) {
      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index],
      ];
      this.bubbleUp(parentIndex);
    }
  }

  bubbleDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let minIndex = index;

    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex] < this.heap[minIndex]
    ) {
      minIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex] < this.heap[minIndex]
    ) {
      minIndex = rightChildIndex;
    }

    if (minIndex !== index) {
      [this.heap[index], this.heap[minIndex]] = [
        this.heap[minIndex],
        this.heap[index],
      ];
      this.bubbleDown(minIndex);
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  length() {
    return this.heap.length;
  }

  getQueue() {
    return this.heap;
  }
}
