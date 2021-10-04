import { heap, iHeap } from './heap.ts';

class MinHeap<T> implements iHeap<T>{
  private heap: heap<T> = new Array();
  public getLeftChild = (index: number) => index * 2 + 1;
  public getRightChild = (index: number) => index * 2 + 2;
  public getParent = (index: number) => Math.floor((index - 1) / 2);
  public peek = () => this.heap[0];
  public dump = (): heap<T> => this.heap;

  public insert(item: T) {
    this.heap.push(item);
    let index = this.heap.length - 1;
    let parentIndex = this.getParent(index);
    while (index > 0 && this.heap[index] < this.heap[parentIndex]) {
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  public extractMin() {
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
    let bigger = index;

    if (left < length && this.heap[bigger] > this.heap[left]) {
      bigger = left;
    }
    if (right < length && this.heap[bigger] > this.heap[right]) {
      bigger = right;
    }

    if (bigger != index) {
      this.swap(bigger, index);
      this.heapify(bigger);
    }
  }

  public swap(a: number, b: number) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
  }
}

const heap = new MinHeap<number>();

heap.insert(3);
heap.insert(4);
heap.insert(31);
heap.insert(6);

// MIN [85,64,67,51,59,42,48]
// MAX [36, 23, 10]
//console.log(`Dump ${heap.dump()}`);
console.log(`Dump ${heap.dump()}`);
console.log(`ExtractMin ${heap.extractMin()}`);
console.log(`Dump ${heap.dump()}`);