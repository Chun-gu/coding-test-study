// @ts-check
/**
 *
 * @param {number} n
 * @returns {string}
 */
function solution(n) {
  var answer = "";
  const radix = {
    1: "1",
    2: "2",
    4: "4",
  };

  let currSum = 0;
  let digit = 0;
  let nextDigitGroup = 0;
  let min = 0;
  let max = 0;

  while (true) {
    nextDigitGroup = Math.pow(3, digit);
    const nextSum = currSum + nextDigitGroup;
    min = currSum;
    max = nextSum - 1;

    if (nextSum > n) break;

    currSum = nextSum;
    digit += 1;
  }
  console.log(currSum);
  console.log(digit);
  console.log(nextDigitGroup);
  console.log(min);
  console.log(max);

  // 자릿수 앞에서부터 하나씩 찾기
  // nextDigitGroup을 3분의 1씩 더해가며 초과하면 스탑하고,
  // radix에서 해당 진수를 answer에 붙이기
  // 맨앞 자리 없애기
  // i가 digits와 같아지면 탐색 종료
  // while (true) {

  //   for(let i=1;i<4;i+=1){
  //     +=nextDigitGroup/3*i
  //     if()
  //   }
  // }

  return answer;
}

console.log(solution(10));
