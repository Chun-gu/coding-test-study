const k = 3;
const n = 5;
const reqs = [
  [10, 60, 1],
  [15, 100, 3],
  [20, 30, 1],
  [30, 50, 3],
  [50, 40, 1],
  [60, 30, 2],
  [65, 30, 1],
  [70, 100, 2],
];

function solution(k, n, reqs) {
  var answer = 0;

  // 상담 유형별로 분류
  const sortedReqs = reqs.reduce((obj, req) => {
    const [a, b, c] = req;

    if (obj[c]) obj[c].push([a, b]);
    else obj[c] = [[a, b]];

    return obj;
  }, {});
  console.log(sortedReqs);

  return answer;
}

solution(k, n, reqs);

// 상담원 수에 따른 대기시간 계산하는 함수
function consult(participants, consultantCount) {
  // 상담원 수만큼 배열 생성
  const consultants = Array.from({ length: consultantCount }).fill([]);

  while (participants.length > 0) {
    for (const participant of participants) {
      for (const consultant of consultants) {
        if (consultant.length === 0) consultant.push(participants.shift());
        else if(participant)
      }
    }
  }
}
