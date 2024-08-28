let [N, ...rest] = `6
1 1 1 1 1 1
2 2 6 2 2 3
2 2 5 2 2 3
2 2 2 4 6 3
0 0 0 0 0 6
0 0 0 0 0 9`
  .toString()
  .trim()
  .split("\n");
// let [N, ...rest] = require("fs")
//   .readFileSync("/dev/stdin")
//   .toString()
//   .trim()
//   .split("\n");
const sideLength = Number(N) - 1;
let babySize = 2;
let babyCoords = [];
let totalFishCount = 0;
const space = rest.map((v, r) =>
  v.split(" ").map((v, c) => {
    if (v !== "0" && v !== "9") totalFishCount += 1;
    if (v === "9") babyShark = [r, c];
    return Number(v);
  })
);
const DIR = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];
console.log({ totalFishCount });
console.log(babyShark);
console.log(space);
// 종료조건: totalFishCount가 0이 되거나 BFS 도중 이동 불가
// BFS 돌리면서 먹을 수 있는(babySize 미만) 물고기 중 가장 가까운 물고기 위치
while (true) {
  if (totalFishCount === 0) break;

  const queue = [babyCoords];
  while (queue.length) {
    const [r, c] = queue.shift();
    if (water[r][c] < babySize)
      for (const [dR, dC] of DIR) {
        const [newR, newC] = [r + dR, c + dC];
        if (0 <= newR && newR < sideLength && 0 <= newC && newC < sideLength) {
          const fishSize = water[newR][newC];
          if (!visited[newR][newC] && fishSize <= babySize) {
            queue.push([newR, newC]);
          }
        }
      }
  }
}
