// @ts-check
/**
 * @param {string} name 만들고자 하는 이름
 * @returns {number} 조이스틱 조작 횟수의 최솟값
 */
function solution(name) {
  let verticalMoves = 0;
  let horizontalMoves = 0;

  const verticalDistances = name.split("").map((str) => {
    let diff = str.charCodeAt(0) - 65;
    if (diff > 13) diff = 26 - diff;

    return diff;
  });
  console.log(verticalDistances);

  let pointer = 0;

  // BAABAB
  while (true) {
    const horizontalDistances = getHorizontalDistances(
      verticalDistances,
      pointer
    );
    console.log(horizontalDistances);

    const nearest = Math.min(...horizontalDistances);
    if (nearest === Infinity) break;

    const nearestIndex = horizontalDistances.indexOf(nearest);
    horizontalMoves += horizontalDistances[nearestIndex];
    horizontalDistances[nearestIndex] = Infinity;
    verticalMoves += verticalDistances[nearestIndex];
    verticalDistances[nearestIndex] = 0;
    pointer = nearestIndex;
  }

  return verticalMoves + horizontalMoves;
}

function getHorizontalDistances(array, pointer) {
  const length = array.length;
  const horizontalDistances = array.map((distance, i) => {
    if (distance === 0) return Infinity;

    let diff = Math.abs(pointer - i);
    if (diff > length / 2) diff = length - diff;

    return diff;
  });

  return horizontalDistances;
}

// 56
// console.log(solution("JEROEN"));
// 23
// console.log(solution("JAN"));
// 11
// console.log(solution("JAZ"));
// 8
console.log(solution("ABABAAAAAAB"));
