class Node {
  constructor(instance) {
    this.instance = instance;
    this.child = null;
    this.sibling = null;
    this.return = null;
  }
}

function link(parent, elements) {
  if (elements == null) elements = [];

  parent.child = elements.reduceRight((prev, cur) => {
    console.log("prev", prev);
    const node = new Node(cur);
    console.log("node", node);
    node.return = parent;
    node.sibling = prev;
    console.log("붙인 후 node", node);

    return node;
  }, null);

  return parent.child;
}

const children = [{ name: "b1" }, { name: "b2" }];
const parent = new Node({ name: "a1" });
const child = link(parent, children);

// console.dir(child);
console.log(child.instance.name === "b1"); //true
console.log(child.sibling.instance === children[1]); // true
