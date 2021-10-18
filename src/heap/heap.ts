export type heap<T> = Array<T>;

export interface iHeap<T> {
  getLeftChild(index: number): number;
  getRightChild(index: number): number;
  getParent(index: number): number;
  swap(a: number, b: number): void;
  heapify(index: number): void;
}