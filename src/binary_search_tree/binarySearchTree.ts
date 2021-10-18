
interface iBst<T> {
  insert(value: T): TreeNode<T>
  traverseDF(): Array<T>
  traverseBF(): Array<T>;
  find(value: T): Array<T>;
  reverse(): Array<T>[];
  maxDepth(): number;
}

class TreeNode<T> {
  constructor(
    public value: T,
    public left: TreeNode<T> | null,
    public right: TreeNode<T> | null,
  ) { }
}

class Bst<T> implements iBst<T>{
  private head: TreeNode<T> | null = null;

  public insert(value: T): TreeNode<T> {
    let node = this.head;
    let newNode = new TreeNode(value, null, null);
    if (!node) this.head = newNode;
    else {
      while (node.value !== value) {
        if (value < node.value) {
          if (!node.left) node.left = newNode;
          else node = node.left;
        }
        if (value > node.value) {
          if (!node.right) node.right = newNode;
          else node = node.right;
        }
      }
    }
    return newNode;
  }

  public traverseDF(): Array<T> {
    let root = this.head;
    let result: Array<T> = [];
    const traverse = (node: TreeNode<T> | null) => {
      if (!node) return 0;
      result.push(node.value)
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(root);
    return result;
  }

  public traverseBF(): Array<T> {
    let node: TreeNode<T> | undefined | null = this.head;
    var queue = [node];
    let result: Array<T> = [];

    while (node = queue.shift()) {
      result.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  }

  public insertRecursive(value: T): void {
    let root = this.head;
    let newNode = new TreeNode(value, null, null);
    if (!root) this.head = newNode;

    const traverse = (node: TreeNode<T> | null) => {
      if (!node) return 0;
      if (value < node.value) {
        if (!node.left) node.left = newNode;
        else traverse(node.left);
      }
      if (value > node.value) {
        if (!node.right) node.right = newNode;
        else traverse(node.right);
      }
    }
    traverse(root);
  }

  public maxDepth(): number {
    let node = this.head;
    let maxDepth = 0;
    const traverse = (node: TreeNode<T> | null | undefined, depth: number) => {
      if (!node) return 0;
      if (node.left) traverse(node.left, maxDepth++);
      if (node.right) traverse(node.right, maxDepth++);
    }
    traverse(node, 0);
    return maxDepth;
  }

  public find(value: T): T[] {
    let node: TreeNode<T> | undefined | null = this.head;
    var queue = [node];
    let result: Array<T> = [];

    while (node = queue.shift()) {
      if (node.value == value) break;
      result.push(node.value);
      if (node.value == value) break;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  }

  public flip(): Array<T> {
    let root = this.head;
    let result: Array<T> = [];
    const traverse = (node: TreeNode<T> | null) => {
      if (!node) return 0;
      let temp = node.left;
      node.left = node.right;
      node.right = temp;
      result.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(root);
    return result;
  }

  public numberOfLevels(): number {
    let node: TreeNode<T> | null | undefined = this.head;
    let queue = [node];
    let levels = [];
    while (queue.length) {
      let items = 0;
      for (let i in queue) {
        node = queue.shift();
        if (node?.left) queue.push(node.left);
        if (node?.right) queue.push(node.right);
        items++;
      }
      levels.push(items)
    }
    return levels.length;
  }

  public reverse(): Array<T>[] {
    let node: TreeNode<T> | null | undefined = this.head;
    let queue = [node];
    let levels: Array<Array<T>> = [];
    while (queue.length) {
      const items: Array<T> = [];
      for (let i in queue) {
        node = queue.shift();
        if (node) {
          if (node.left) queue.push(node.left);
          if (node.right) queue.push(node.right);
          items.push(node.value);
        }
      }
      levels.push(items)
    }
    return levels.reverse();
  }

  public dump(): TreeNode<T> | null {
    return this.head;
  }
}

const bst = new Bst<number>();
bst.insert(10);
bst.insert(5);
bst.insert(20);
bst.insert(3);
bst.insert(7);
bst.insert(25);
//console.log(bst.dump())
console.log("BF", bst.traverseBF())
console.log("DF", bst.traverseDF())
console.log("MaxDepth", bst.maxDepth())
console.log("Find", bst.find(20))
console.log("Flip", bst.flip())
console.log("Items in Levels", bst.reverse())
console.log("Number of Levels", bst.numberOfLevels())