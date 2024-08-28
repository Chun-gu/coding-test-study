function solution(n, edge) {
  const graph = makeGraph(edge);
  console.log(graph);
  var answer = 0;
  return answer;
}

solution(6, [
  [3, 6],
  [4, 3],
  [3, 2],
  [1, 3],
  [1, 2],
  [2, 4],
  [5, 2],
]);

function makeGraph(vertex) {
  return vertex.reduce((graph, [from, to]) => {
    if (graph[from]) graph[from].push(to);
    else graph[from] = [to];

    if (graph[to]) graph[to].push(from);
    else graph[to] = [from];

    return graph;
  }, {});
}
