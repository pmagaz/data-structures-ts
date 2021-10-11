
import { heap, iHeap } from '../heap/heap.ts';

class PriorityNode<T>  {
  constructor(
    public priority: number,
    public value: T
  ) { }
}

type queue<T> = Array<PriorityNode<T>>;

class PriorityQueue<T> implements iHeap<T> {
  private heap: queue<T> = new Array();
  public getLeftChild = (index: number) => index * 2 + 1;
  public getRightChild = (index: number) => index * 2 + 2;
  public getParent = (index: number) => Math.floor((index - 1) / 2);
  public peek = () => this.heap[0];

  public insert(priority: number, item: T): void {
    let node = new PriorityNode(priority, item);
    this.heap.push(node);
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = this.getParent(index);
      let parentNode = this.heap[parentIndex];
      let currentNode = this.heap[index];
      if (currentNode.priority > parentNode.priority) {
        this.swap(index, parentIndex);
        index = parentIndex
      } else break;
    }
  }

  public extractMax() {
    const root = this.heap.shift();
    this.heap.unshift(this.heap[this.heap.length - 1]);
    this.heap.pop();
    this.heapify(0);
    return root;
  }

  public heapify(index: number) {
    let left = this.getLeftChild(index);
    let right = this.getRightChild(index);
    let length = this.heap.length;
    let smallest = index;

    if (left < length && this.heap[smallest].priority < this.heap[left].priority) {
      smallest = left;
    }

    if (right < length && this.heap[smallest].priority < this.heap[right].priority) {
      smallest = right;
    }

    if (smallest != index) {
      this.swap(smallest, index);
      this.heapify(smallest);
    }
  }

  public swap(a: number, b: number): void {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
  }
}

const priorityQueue = new PriorityQueue<number>();
priorityQueue.insert(33, 3);
priorityQueue.insert(4, 4);
priorityQueue.insert(31, 31);
priorityQueue.insert(6, 6);
console.log(`ExtractMax ${priorityQueue.extractMax()}`);

