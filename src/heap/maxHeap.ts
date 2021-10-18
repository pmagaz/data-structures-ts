import { heap, iHeap } from './heap';

class MaxHeap<T> implements iHeap<T> {
  private heap: heap<T> = new Array();
  public getLeftChild = (index: number) => index * 2 + 1;
  public getRightChild = (index: number) => index * 2 + 2;
  public getParent = (index: number) => Math.floor((index - 1) / 2);
  public peek = () => this.heap[0];
  public dump = (): heap<T> => this.heap;

  public insert2(item: T): void {
    this.heap.push(item);
    let index = this.heap.length - 1;
    let parentIndex = this.getParent(index);
    while (index > 0 && this.heap[index] > this.heap[parentIndex]) {
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  public insert(item: T): T {
    this.heap.push(item);
    let index = this.heap.length - 1;
    let parentIndex = this.getParent(index);
    const traverse = (index: number) => {
      if (index > 0 && this.heap[index] > this.heap[parentIndex]) {
        this.swap(index, parentIndex);
        traverse(parentIndex)
      }
    }
    traverse(index);
    return item;
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

    if (left < length && this.heap[smallest] < this.heap[left]) {
      smallest = left;
    }

    if (right < length && this.heap[smallest] < this.heap[right]) {
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

const heap = new MaxHeap<number>();

heap.insert2(33);
heap.insert2(4);
heap.insert2(31);
heap.insert2(6);

// MIN [85,64,67,51,59,42,48]
// MAX [36, 23, 10]
console.log(`Dump ${heap.dump()}`);
console.log(`ExtractMax ${heap.extractMax()}`);
console.log(`Dump ${heap.dump()}`);