let [EV, start, ...rest] = `5 6
1
5 1 1
1 2 2
1 3 3
2 3 4
2 4 5
3 4 6`
  .toString()
  .trim()
  .split("\n");

// let [EV, start, ...rest] = require("fs")
//   .readFileSync("/dev/stdin")
//   .toString()
//   .trim()
//   .split("\n");

// 전처리
const E = Number(EV.split(" ")[0]);
start = Number(start);

// DFS 이용한 방법(콜스택 터져서 실패)
// solution1();
// function solution1() {
//   const edgeMap = rest.reduce((map, edge) => {
//     const [u, v, w] = edge.split(" ").map(Number);

//     if (map[u] === undefined) map[u] = [{ v, w }];
//     else map[u].push({ v, w });

//     return map;
//   }, {});

//   const minWeights = [];

//   for (let end = 1; end <= E; end += 1) {
//     let minWeight = getMinWeight(start, end);

//     if (minWeight === Infinity) minWeight = "INF";
//     minWeights.push(minWeight);
//   }

//   console.log(minWeights.join("\n"));

//   function getMinWeight(start, end) {
//     if (start == end) return 0;

//     let minW = Infinity;
//     const visited = new Array(E).fill(false);
//     const nodes = [...edgeMap[start]];

//     nodes.forEach((node) => DFS(node, end, 0));

//     function DFS(node, end, prevW) {
//       const { v, w } = node;
//       const isArrived = v === end;
//       const isVisited = visited[v - 1];
//       const currW = prevW + w;
//       const isSmallerW = currW < minW;

//       // 이미 방문했거나 현재 w가 최소 w보다 크다면 종료
//       if (isVisited || !isSmallerW) return;

//       // 목표 정점에 도착했다면
//       if (isArrived) {
//         // 최소 w를 갱신
//         minW = currW;
//         // 아직 도착하지 않았고 이동 가능한 정점이 있다면
//       } else if (edgeMap[v]) {
//         // 이전 w를 갱신하고 다음 정점들을 DFS
//         prevW = currW;
//         edgeMap[v].forEach((node) => DFS(node, end, prevW));
//       }
//     }

//     return minW;
//   }
// }

//
// console.log(solution2());

// function solution2() {
//   const visited = new Array(E + 1).fill(false);
//   // 각 v간의 가중치를 나타내는 이차원 배열 만들기
//   const weightLists = Array.from({ length: E + 1 }, (_, i) =>
//     Array.from({ length: E + 1 }, (_, j) => (i === j ? 0 : Infinity))
//   );

//   rest.forEach((el) => {
//     const [u, v, w] = el.split(" ").map(Number);
//     weightLists[u][v] = w;
//   });

//   let prevWeights = weightLists[start];
//   visited[start];

//   while (true) {
//     const [weight, index] = findSmallestUnvisitedNonZeroWeight(
//       prevWeights,
//       visited
//     );
//     if (weight === Infinity) break;
//     const currWeights = weightLists[index];
//     const nextWeights = makeSmallerWeights(
//       prevWeights,
//       currWeights,
//       weight,
//       index,
//       visited
//     );
//     visited[index] = true;
//     prevWeights = nextWeights;
//   }

//   let answer = "";
//   const length = prevWeights.length;
//   for (let i = 1; i < length; i += 1) {
//     const weight = prevWeights[i];
//     if (weight === Infinity) answer += "INF";
//     else answer += weight;
//     if (i !== length - 1) answer += "\n";
//   }

//   return answer;

//   function makeSmallerWeights(arr1, arr2, weight, index) {
//     const smallerWeights = [];

//     for (let i = 0; i < arr1.length; i += 1) {
//       if (i === index) smallerWeights.push(arr1[i]);
//       else {
//         const arr1Weight = arr1[i];
//         const arr2Weight = visited[i] ? arr2[i] : arr2[i] + weight;
//         smallerWeights.push(Math.min(arr1Weight, arr2Weight));
//       }
//     }

//     return smallerWeights;
//   }

//   function findSmallestUnvisitedNonZeroWeight(numbers) {
//     let smallestNonZero = Infinity;
//     let index = -1;

//     for (let i = 0; i < numbers.length; i += 1) {
//       if (numbers[i] !== 0 && numbers[i] < smallestNonZero && !visited[i]) {
//         smallestNonZero = numbers[i];
//         index = i;
//       }
//     }

//     return [smallestNonZero, index];
//   }
// }
const INF = Infinity;
const isVisit = new Array(E + 1).fill(false);
// 각 v간의 가중치를 나타내는 이차원 배열 만들기
const arr = Array.from({ length: E }, (_, i) =>
  Array.from({ length: E }, (_, j) => (i === j ? 0 : INF))
);

rest.forEach((el) => {
  const [u, v, w] = el.split(" ").map(Number);
  arr[u - 1][v - 1] = w;
});
console.log(arr);

const getMin = function (vertex) {
  let min = INF;
  let idx = 0;
  for (let i = 0; i < vertex.length; i++) {
    if (min > vertex[i] && !isVisit[i]) {
      min = vertex[i];
      idx = i;
    }
  }
  return idx;
};

const dist = function (start) {
  let v = arr[start - 1];
  let count = 0;
  let end = v.length;
  let min = 0;
  let startV = v;
  isVisit[start - 1] = true;

  while (count < end) {
    const idx = getMin(startV);
    min += startV[idx];
    const next = arr[idx];
    for (let i = 0; i < v.length; i++) {
      if (v[i] > next[i] + min && !isVisit[i]) v[i] = next[i] + min;
    }
    startV = arr[idx];
    isVisit[idx] = true;
    count++;
  }
  console.log(v);
};

const main = (function () {
  dist(1);
})();
