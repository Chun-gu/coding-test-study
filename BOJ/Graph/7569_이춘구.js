const input = `4 3 2
0 1 1 1
1 0 1 1
1 1 0 1
1 1 1 1
-1 -1 -1 -1
1 1 1 -1`
  .toString()
  .trim()
  .split("\n");

// const input = require("fs")
//   .readFileSync("/dev/stdin")
//   .toString()
//   .trim()
//   .split("\n");

// 전체 토마토 갯수
let tomatoCount = 0;
// 0번째 날에 안익은 토마토 갯수
let unripeCount = 0;
// 익은 토마토 갯수, 초깃값: 0번째 날 기준
let ripeCount = 0;
// 익은 토마토들의 위치
let ripeTomatoes = [];
// 익는데 걸리는 일수
let day = 0;

let [MNH, ...rest] = input;
const [M, N, H] = MNH.split(" ").map(Number);

const length = rest.length;
const size = length / H;
const graph = [];
let ripes = [];

// 3차원 배열 만들기
for (let h = 0; h < length; h += 1) {
  if (h >= size) break;
  const story=[]

  graph.push(
    rest.slice(h, h + size).map((e, j) =>
      e.split(" ").map((v, k) => {
        if (v === "1") {
          ripeCount += 1;
          ripes.push([h, j, k]);
        }
        if (v === "0") unripeCount += 1;

        return Number(v);
      })
    )
  );
}
console.log(graph);
console.log(ripeCount);
console.log(unripeCount);
console.log(ripes);

// 하루씩 증가시키며
// 익어야 할 토마토가 없을 때까지 반복
// 익어야 할 토마토가 없는데 0번째날 안 익은 토마토 갯수와 익은 토마토 갯수가
// 같으면 dayCount, 같지 않으면 -1 출력

// 익은 토마토 갯수

// 토마토밭을 이중배열로 만들면서
// const graph = input.slice(1).map((e, i) =>
//   e.split(" ").map((v, j) => {
//     // 전체 토마토의 갯수를 세고
//     if (v !== "-1") tomatoCount += 1;
//     if (v === "1") {
//       // 익은 토마토의 갯수와 위치를 구한다.
//       ripeCount += 1;
//       ripeTomatoes.push([i, j]);
//     }

//     return Number(v);
//   })
// );

while (ripeTomatoes.length > 0) {
  // 오늘 새로 익은 토마토를 담을 배열
  const newlyRipeTomatoes = [];

  // 이미 익은 토마토를 순회하며
  ripeTomatoes.forEach(([r, c]) => {
    // 주변의 안익은 토마토의 위치를 구한 뒤
    const aroundTomatoes = getUnripesAround([r, c]);
    // 익히면서 익은 토마토 갯수를 증가시킨다.
    aroundTomatoes.forEach(([r, c]) => {
      graph[r][c] = 1;
      ripeCount += 1;
    });
    // 익은 주변 토마토들을 새로 익은 토마토 배열에 추가한다.
    newlyRipeTomatoes.push(...aroundTomatoes);
  });

  // 새로 익은 토마토가 하나라도 있으면 하루 더한다
  if (newlyRipeTomatoes.length !== 0) day += 1;

  // 내일 주변 토마토를 익히는데 사용하기 위해
  // 오늘 새로 익은 토마토를 익은 토마토에 할당한다
  ripeTomatoes = newlyRipeTomatoes;
}

// 모든 토마토가 익었다면 익는데 걸린 일수를 log
console.log(tomatoCount === ripeCount ? dayCount : -1);

// 익은 토마토 주변의 안익은 토마토를 구하는 함수
function getUnripesAround(centerCoord) {
  const directions = [
    [-1, 0, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 1, 0],
    [0, 0, -1],
    [1, 0, 0],
  ];
  const [cH, cR, cC] = centerCoord;
  const result = [];

  directions.filter(([dH, dR, dC]) => {
    const newH = cH + dH;
    const newR = cR + dR;
    const newC = cC + dC;
    const isInRange =
      newH >= 0 && newH < H && newR >= 0 && newR < N && newC >= 0 && newC < M;

    if (isInRange && graph[newH][newR][newC] === 0)
      result.push([newH, newR, newC]);
  });

  return result;
}
