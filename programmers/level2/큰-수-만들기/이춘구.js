// @ts-check
/**
 *
 * @param {string} number
 * @param {number} k
 * @returns {string}
 */
function solution(number, k) {
  const numbers = number.split("");
  // numbers의 개수에서 k를 뺀 수만큼 뽑아서 조합 만들고
  const possibleNumbers = makeCombinations(numbers, numbers.length - k);
  console.log(possibleNumbers);
  // 조합을 임시 배열에 넣어서

  // 그 중 최댓값 뽑아 문자열로 만들고 반환

  return Math.max(...possibleNumbers);
}

/**
 *
 * @param {string[]} arr
 * @param {number} count
 * @returns {number[]}
 */
function makeCombinations(arr, count) {
  if (count === 1) return arr.map((el) => [el]);
  const result = [];

  arr.forEach((fixed, index) => {
    const rest = arr.slice(index + 1);
    const restCombinations = makeCombinations(rest, count - 1);
    const attached = restCombinations.map((combination) =>
      [fixed, combination].join("")
    );
    result.push(...attached.map(Number));
  });

  return result;
}

function solution(number, k) {
  let deletableCount = k;
  let numbers = number.split("").map(Number);
  let sortedNumbers = [...numbers].sort((a, b) => b - a);
  const result = [];

  while (deletableCount !== 0) {
    for (let i = 0; i < sortedNumbers.length; i += 1) {
      // 9
      const currentBiggestNumber = sortedNumbers[i];
      // 1
      const index = numbers.indexOf(currentBiggestNumber);

      if (index <= deletableCount) {
        // 24
        numbers = numbers.slice(index + 1);
        // [9]
        result.push(currentBiggestNumber);
        // 1
        deletableCount -= index;
        // [4,2,1]
        sortedNumbers.splice(i, 1);

        if (deletableCount === 0) result.push(...numbers);

        break;
      }
    }
  }
  console.log(result);

  return result.join("");
}

// console.log(solution("1924", 2));
// console.log(solution("1231234", 3));
console.log(solution("4177252841", 4));
