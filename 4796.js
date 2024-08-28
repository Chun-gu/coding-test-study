const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
// .toString().trim().split("\n");
const tcs = input.slice(0, -1);

console.log(input);

// let answer = tcs
//   .map((tc, i) => {
//     const [limit, period, vacation] = tc.split(" ");
//     const unit = Math.floor(vacation / period);
//     const rest = vacation % period;

//     return `Case ${i + 1}: ${limit * unit + (rest > limit ? limit : rest)}`;
//   })
//   .join("\n");

// console.log(answer);
