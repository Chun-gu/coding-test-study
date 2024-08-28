const [N, ...rest] = `7
A B C
B D .
C E F
E . .
F . G
D . .
G . .`
  .toString()
  .trim()
  .split("\n");

// const [_, ...rest] = require("fs")
//   .readFileSync("/dev/stdin")
//   .toString()
//   .trim()
//   .split("\n")

// 트리 만들기
const tree = rest.reduce((tree, v) => {
  let [root, left, right] = v.split(" ");
  left = left === "." ? null : left;
  right = right === "." ? null : right;
  tree[root] = { left, right };

  return tree;
}, {});
console.log("tree", tree);

// 각 순회의 결과 초기화
let preorderResult = "";
let inorderResult = "";
let postorderResult = "";

// 전위 순회
function preorder(root) {
  const { left, right } = tree[root];

  preorderResult += root;
  if (left) preorder(left);
  if (right) preorder(right);
}

// 중위 순회
function inorder(root) {
  const { left, right } = tree[root];

  if (left) inorder(left);
  inorderResult += root;
  if (right) inorder(right);
}

// 후위 순회
function postorder(root) {
  const { left, right } = tree[root];

  if (left) postorder(left);
  if (right) postorder(right);
  postorderResult += root;
}

preorder("A");
inorder("A");
postorder("A");

console.log(`${preorderResult}
${inorderResult}
${postorderResult}`);
