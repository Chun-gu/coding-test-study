let [NM, ...map] = `6 4
0100
1110
1000
0000
0111
0000`
  .toString()
  .trim()
  .split("\n");

let [NM, ...map] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

class Queue {
  #queue = {};
  #head = 0;
  #tail = 1;

  push(value) {
    this.#queue[this.#tail] = value;
    this.#tail += 1;
  }

  shift() {
    if (this.length() === 0) return undefined;

    const value = this.#queue[this.#head + 1];
    delete this.#queue[this.#head + 1];
    this.#head += 1;
    if (this.#tail - this.#head === 1) {
      this.#head = 0;
      this.#tail = 1;
    }

    return value;
  }

  length() {
    return this.#tail - this.#head - 1;
  }
}

const [N, M] = NM.split(" ").map(Number);
map = map.map((r) => r.split(""));
const visited = Array.from({ length: N }, () => new Array(M).fill(false));
const visitedDestroyed = Array.from({ length: N }, () =>
  new Array(M).fill(false)
);

const willVisit = new Queue();
willVisit.push({ coords: [0, 0], didDestroy: false, distance: 1 });
// prettier-ignore
const DIR = [[1, 0], [0, 1], [-1, 0], [0, -1]];
let answer = -1;

visited[0][0] = true;

while (willVisit.length) {
  const { coords, didDestroy, distance } = willVisit.shift();
  const [r, c] = coords;
  if (r === N - 1 && c === M - 1) {
    answer = distance;
    break;
  }

  for (const [dR, dC] of DIR) {
    const [nextR, nextC] = [r + dR, c + dC];
    if (isInRange(nextR, nextC)) {
      if (map[nextR][nextC] === "0" && visited[nextR][nextC] === false) {
        if (didDestroy === true) {
          willVisit.push({
            coords: [nextR, nextC],
            didDestroy: true,
            distance: distance + 1,
          });
          visitedDestroyed[nextR][nextC][0] = true;
        } else if (didDestroy === false) {
          willVisit.push({
            coords: [nextR, nextC],
            didDestroy: false,
            distance: distance + 1,
          });
          visited[nextR][nextC][0] = true;
        }
      } else if (
        map[nextR][nextC] === "1" &&
        visitedDestroyed[nextR][nextC] === false &&
        didDestroy === false
      ) {
        willVisit.push({
          coords: [nextR, nextC],
          didDestroy: true,
          distance: distance + 1,
        });
        visitedDestroyed[nextR][nextC][1] = true;
      }
    }
  }
}

console.log(answer);

function isInRange(r, c) {
  return 0 <= r && r < N && 0 <= c && c < M;
}
