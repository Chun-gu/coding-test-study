const [n, m, ...buses] = `5
14
1 2 2
1 3 3
1 4 1
1 5 10
2 4 2
3 4 1
3 5 1
4 5 3
3 5 10
3 1 8
1 4 2
5 1 7
3 4 2
5 2 4`
  .toString()
  .trim()
  .split("\n");
// const input = require("fs")
//   .readFileSync("/dev/stdin")
//   .toString()
//   .trim()
//   .split("\n");

const cityCount = Number(n);
const busCount = Number(m);

const info = buses.reduce((acc, cur) => {
  let [start, end, cost] = cur.split(" ").map(Number);
  start -= 1;
  end -= 1;
  if (acc[start] === undefined) {
    acc = { ...acc, [start]: { [end]: cost } };
  } else if (acc[start][end] === undefined) {
    acc[start] = { ...acc[start], [end]: cost };
  } else acc[start][end] = Math.min(acc[start][end], cost);

  if (acc[end] === undefined) {
    acc = { ...acc, [end]: { [start]: cost } };
  } else if (acc[end][start] === undefined) {
    acc[end] = { ...acc[end], [start]: cost };
  } else acc[end][start] = Math.min(acc[end][start], cost);

  return acc;
}, {});
console.log(info);

const answer = Array.from({ length: cityCount }, () =>
  new Array(cityCount).fill(Infinity)
);
console.log(answer);

for (let r = 0; r < cityCount; r += 1) {
  for (let c = 0; c < cityCount; c += 1) {
    if (r === c) answer[r][c] = 0;

    calMinCost(r, c);
  }
}

console.log(answer.map((r) => r.join(" ")).join("\n"));

function calMinCost(start, end) {
  const visited = Array.from({ length: cityCount }, () =>
    new Array(cityCount).fill(false)
  );
  let minCost = Infinity;
  const willVisit = [[end, info[start][end]]];
  // visited[start][end] = true;

  while (true) {
    if (willVisit.length === 0) break;

    const [curCity, curCost] = willVisit.shift();

    if (!visited[start][curCity]) {
      visited[start][curCity] = true;

      if (curCity === end) {
        minCost = Math.min(minCost, curCost + info[start][curCity]);
      }

      Object.keys(info[start]).forEach((city) => {
        if (!visited[start][city])
          willVisit.push([city, curCost + info[start][curCity]]);
      });
    }
  }

  answer[start][end] = minCost;
}
