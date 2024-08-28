// @ts-check
/**
 *
 * @param {number[]} people
 * @param {number} limit
 * @returns {number}
 */
function solution(people, limit) {
  var answer = 0;

  const sortedPeople = people.sort((a, b) => a - b);

  let boat = [];
  const savedPeople = [];
  let boatWeight = 0;

  while (true) {
    if (sortedPeople.length === 0) break;

    console.log("남은 인원", sortedPeople);
    console.log("현재 무게", boatWeight);
    console.log("현재 탑승 인원", boat);

    const nextPerson = sortedPeople.at(-1);
    console.log("다음 탑승 인원", nextPerson);

    // 혼자만 탈 수 있는 사람들 빠른 제거
    if (limit - nextPerson < 40) {
      sortedPeople.pop();
      answer += 1;
      // 한 명 더 태울 수 있는 사람일 때
    } else if (boat.length === 0 && boatWeight + nextPerson <= limit) {
      console.log(sortedPeople);
      const nextPerson = sortedPeople.pop();
      boat.push(nextPerson);
      boatWeight += nextPerson;
      console.log(nextPerson, "탑승");
      // 남은 무게에 제일 근접한 한 명 더 태우기
    } else if (boat.length === 1) {
      for (let i = sortedPeople.length - 1; i > 0; i -= 1) {
        if (sortedPeople[i]) {
        }
      }
    } else {
      console.log("탑승 불가");
      boat = [];
      boatWeight = 0;
      answer += 1;
    }
  }

  return answer + 1;
}

// console.log(solution([70, 50, 80, 50], 100));
console.log(solution([40, 50, 60, 90], 110));
// console.log(solution([70, 80, 50], 100));
