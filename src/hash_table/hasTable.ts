interface iHashTable<T> {
  hash(key: String): number
  add(key: String, value: T): void
  find(key: String): T;
  dump(): buckets<T>;
}

class hashEntry<T> {
  constructor(
    public key: String,
    public value: T,
  ) { }
}

type buckets<T> = Array<T>;

class HashTable<T> implements iHashTable<T> {
  public buckets: buckets<T> = new Array(1024);
  public size: number = 0;

  hash(key: String) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.buckets.length;
  }

  add(key: String, value: T): void {
    const keyHash = this.hash(key);
    this.buckets[keyHash] = value;
  }

  find(key: String): T {
    let hash = this.hash(key);
    return this.buckets[hash];
  }

  dump(): buckets<T> {
    return this.buckets;
  }

}

let table = new HashTable<string>();
table.add("key", "value");
table.add("key2", "value2");
table.add("key3", "value3");
console.log(`Find ${table.find("key2")}`);
console.log(`Dump ${table.dump()}`);