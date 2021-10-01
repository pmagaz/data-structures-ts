type bucket<T> = Array<T>;

interface iQueue<T> {
  enqueue(data: T): void;
  dequeue(): T | undefined;
  dump(): bucket<T>;
}

export default class Queue<T> implements iQueue<T> {
  private bucket: bucket<T> = [];

  public enqueue(data: T): void {
    this.bucket.enqueue(data);
  }

  public dequeue(): T | undefined {
    return this.bucket.shift();
  }

  public dump(): bucket<T> {
    return this.bucket;
  }
}


const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5);
queue.dequeue();
console.log(`Dump ${queue.dump()}`);