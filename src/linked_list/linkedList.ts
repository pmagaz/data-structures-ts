interface ILinkedList<T> {
  prepend(data: T): ListNode<T>;
  append(data: T): ListNode<T>;
  insertAt(index: number, data: T): ListNode<T> | null;
  getSize(): number;
  getLast(): ListNode<T> | null;
  getFirst(): ListNode<T> | null;
  getStringList(): string | null;
  find(data: T): ListNode<T> | null;
  iterate(): void;
}

class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null
  ) { }
}

class LinkedList<T> implements ILinkedList<T>{

  public head: ListNode<T> | null = null;

  public prepend(data: T): ListNode<T> {
    let newNode = new ListNode(data, this.head);
    this.head = newNode;
    return newNode;
  }

  public append(data: T): ListNode<T> {
    let newNode = new ListNode(data, null);
    if (!this.head) this.head = newNode;
    else {
      let lastNode = this.getLast();
      if (lastNode) lastNode.next = newNode;
    }
    return newNode;
  }

  public find(data: T): ListNode<T> | null {
    let node = this.head;
    let found = null;
    while (node?.next) {
      node = node.next;
      let value = node?.value;
      if (value === data) return node;
    }
    return found;
  }

  public insertAt(index: number, data: T): ListNode<T> | null {
    let node = this.head;
    let pos = 0;
    while (node) {
      pos++;
      node = node.next;
      if (index - 1 === pos) {
        if (node) {
          let newNode = new ListNode(data, node.next);
          node.next = newNode;
          return node;
        }
      }
    }
    return node;
  }

  public getSize(): number {
    let count = 0;
    let node = this.head;
    while (node) {
      node = node.next;
      count++;
    }
    return count;
  }

  public getStringList(): string {
    return JSON.stringify(this.head);
  }

  public iterate(): void {
    let node = this.head;
    if (node) {
      while (node.next) {
        node = node.next;
        console.log(node?.value);
      }
    }
  }

  public getLast(): ListNode<T> | null {
    let node = this.head;
    while (node?.next) {
      node = node?.next
    }
    return node;
  }

  public getFirst(): ListNode<T> | null {
    return this.head;
  }
}


let list = new LinkedList<number>();
list.prepend(3);
list.prepend(2);
list.prepend(1);

console.log(`Size ${list.getSize()}`);
console.log(`First ${list.getFirst()}`);
console.log(`Last ${list.getLast()}`);

list.append(4);
list.append(5);
console.log(`Size ${list.getSize()}`);
console.log(`ListString ${list.getStringList()} `);

console.log(`Find ${JSON.stringify(list.find(4))}`);
console.log(`Insert at ${list.insertAt(2, 22)}`);

console.log(`Iterate ${list.iterate()} `);