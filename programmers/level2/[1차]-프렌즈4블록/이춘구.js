// @ts-check
/**
 * @param {number} m 판의 높이
 * @param {number} n 판의 폭
 * @param {string[]} board 판의 배치 정보
 * @returns {number} 지워지는 판의 갯수
 */
function solution(m, n, board) {
  // 기존의 판을 오른쪽으로 90도 회전시킨다.
  let newBoard = Array.from(new Array(n), () => new Array(m));
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      newBoard[j][m - 1 - i] = board[i][j];
    }
  }
  console.log("회전시킨 판", newBoard);

  let answer = 0;

  while (true) {
    const deletableBlocks = getDeletableBlocks(newBoard);
    console.log(deletableBlocks);

    // 삭제할 블록이 없으면 종료한다.
    if (deletableBlocks.length === 0) break;

    answer += deletableBlocks.length;
    console.log(answer);

    const deletedBoard = newBoard.map((row, i) => {
      return row.filter((_, j) => !deletableBlocks.includes(`${i}${j}`));
    });

    newBoard = deletedBoard;
    console.log(newBoard);
  }

  return answer;
}

/**
 * @param {string[]} board 판의 배치 정보
 * @returns
 */
function getDeletableBlocks(board) {
  const height = board.length;
  // 주변의 좌표
  const SURROUNDINGS = [
    [0, 1],
    [1, 0],
    [1, 1],
  ];
  const SURROUNDINGS_LENGTH = SURROUNDINGS.length;

  // 삭제할 블록 좌표들의 중복을 제거하고 담을 set
  const deletings = new Set();

  for (let i = 0; i < height - 1; i += 1) {
    // 현재 행에 블록이 없으면 다음 행으로 넘어간다
    // if (board[i].length === 0) continue;
    // 현재 행에 블록이 있지만 다음 행에 블록이 없으면 다다음 행으로 넘어간다.
    // if (board[i + 1] && board[i + 1].length === 0) {
    //   i + 1;
    //   continue;
    // }

    for (let j = 0; j < board[i].length - 1; j += 1) {
      // 현재 탐색 중인 블록
      const currentBlock = board[i][j];
      // 삭제할 주변 블록의 좌표를 담을 배열

      let surroundingBlocks = [];
      // 현재 블록의 좌표를 넣고 시작한다.
      surroundingBlocks.push(`${i}${j}`);

      for (let k = 0; k < SURROUNDINGS_LENGTH; k += 1) {
        const [x, y] = SURROUNDINGS[k];
        const surroundingBlock = board[i + x][j + y];
        if (
          !surroundingBlock ||
          currentBlock !== surroundingBlock ||
          /[A-Z]/.test(surroundingBlock) === false
        ) {
          surroundingBlocks = [];
          break;
        }
        surroundingBlocks.push(`${i + x}${j + y}`);
      }

      surroundingBlocks.forEach((block) => deletings.add(block));
    }
  }

  return Array.from(deletings);
}

// 14
// console.log(solution(4, 5, ["CCBDE", "AAADE", "AAABF", "CCBBF"]));
// 15
// console.log(
//   solution(6, 6, ["TTTANT", "RRFACC", "RRRFCC", "TRRRAA", "TTMMMF", "TMMTTJ"])
// );
// console.log(solution(2, 2, ["AA", "AA"]));
// console.log(solution(2, 2, ["AB", "CD"]));
// console.log(
//   solution(8, 5, [
//     "HGNHU",
//     "CRSHV",
//     "UKHVL",
//     "MJHQB",
//     "GSHOT",
//     "MQMJJ",
//     "AGJKK",
//     "QULKK",
//   ])
// );

// 24
// console.log(solution(5, 6, ["AAAAAA", "BBAATB", "BBAATB", "JJJTAA", "JJJTAA"]));
// // 14
// console.log(solution(4, 5, ["AAAAA", "AUUUA", "AUUAA", "AAAAA"]));
// // 32
// console.log(
//   solution(6, 6, ["AABBEE", "AAAEEE", "VAAEEV", "AABBEE", "AACCEE", "VVCCEE"])
// );
// 32
console.log(
  solution(6, 6, ["IIIIOO", "IIIOOO", "IIIOOI", "IOOIII", "OOOIII", "OOIIII"])
);
// 4
console.log(solution(7, 2, ["AA", "BB", "AA", "BB", "ZZ", "ZZ", "CC"]));
//
console.log(
  solution(6, 5, ["CCZXZ", "CCZXZ", "XXZXZ", "AAZAA", "AAAAA", "ZAAXX"])
);
