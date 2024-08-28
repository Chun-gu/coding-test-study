function solution(menu, order, k) {
  const ranges = [[0, 0]];

  for (let i = 1; i <= order.length; i += 1) {
    const start = (i - 1) * k;
    let waitingTime = 0;
    const prevEnd = ranges[i - 1][1];
    if (prevEnd > start) waitingTime = prevEnd - start;
    const end = start + waitingTime + menu[order[i - 1]];

    ranges.push([start, end]);
  }
  const rangeLength = ranges.length - 1;
  const timeTable = new Array(ranges[rangeLength][1]).fill(0);

  ranges.forEach(([start, end]) => {
    for (let i = start; i < end; i += 1) {
      timeTable[i] += 1;
    }
  });

  return Math.max(...timeTable);
}
