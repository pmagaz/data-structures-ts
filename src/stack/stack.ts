type bucket<T> = Array<T>;

interface iStack<T> {
  push(data: T): void;
  delete(): T | undefined;
  dump(): bucket<T>;
}

export default class Stack<T> implements iStack<T> {
  private bucket: bucket<T> = [];

  public push(data: T): void {
    this.bucket.push(data);
  }

  public delete(): T | undefined {
    return this.bucket.pop();
  }

  public dump(): bucket<T> {
    return this.bucket;
  }
}


const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);
stack.delete();
console.log(`Dump ${stack.dump()}`);