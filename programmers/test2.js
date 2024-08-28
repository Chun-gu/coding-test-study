// @ts-check
/**
 *
 * @param {string[]} id_list
 * @param {number} k
 * @returns
 */
function solution(id_list, k) {
  let answer = 0;
  const issuedCouponStatus = {};

  id_list.forEach((buyerList) => {
    const ids = buyerList.split(" ");
    const uniqueIds = new Set(ids);
    console.log(uniqueIds);

    uniqueIds.forEach((id) => {
      const currentCouponCount = issuedCouponStatus[id];
      if (currentCouponCount === undefined) issuedCouponStatus[id] = 1;
      if (currentCouponCount < k) issuedCouponStatus[id] += 1;
      console.log(issuedCouponStatus);
    });
  });

  answer = Object.values(issuedCouponStatus).reduce((acc, curr) => acc + curr);

  return answer;
}

console.log(
  solution(
    [
      "jay",
      "jay elle jay may",
      "may elle may",
      "elle may",
      "elle elle elle",
      "may",
    ],
    2
  )
);
