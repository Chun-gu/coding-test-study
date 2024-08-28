function solution(flowers) {
  const flattenFlowers = flowers.flat().sort((a, b) => a - b);
  const fastestDay = flattenFlowers[0];
  const lastestDay = flattenFlowers.at(-1);
  const periodLength = lastestDay - fastestDay;

  const periodObj = Array.from(
    { length: periodLength },
    (_, i) => fastestDay + i
  ).reduce((obj, curr) => {
    obj[curr] = 0;
    return obj;
  }, {});

  for (const [start, end] of flowers) {
    for (let i = start; i < end; i++) {
      periodObj[i] += 1;
    }
  }

  let answer = 0;
  Object.values(periodObj).forEach((value) => {
    if (value > 0) answer += 1;
  });

  return answer;
}

console.log(
  solution([
    [3, 4],
    [4, 5],
    [6, 7],
    [8, 10],
  ])
);
