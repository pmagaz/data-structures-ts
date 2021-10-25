enum SearchType {
  BFS,
  DFS
};

enum GraphType {
  DIRECTED,
  UNDIRECTED
}

class GraphNode<T>{
  private adjacents: Array<T> = new Array();
  constructor(public value: T) { }

  public addAdjacent(value: T) {
    this.adjacents.push(value);
  }

  public getAdjacents(): Array<T> {
    return this.adjacents;
  }

}

class Graph<T>{
  private nodes: Map<T, GraphNode<T>> = new Map<T, GraphNode<T>>();
  public dump = (): void => console.log(this.nodes);

  constructor(
    public graphType: GraphType,
  ) { }

  public addVertex(value: T): GraphNode<T> | undefined {
    if (this.nodes.has(value)) {
      return this.nodes.get(value);
    } else {
      const vertex = new GraphNode<T>(value);
      this.nodes.set(value, vertex);
      return vertex;
    }
  }

  public addEdge(source: T, destination: T) {
    const sourceNode = this.addVertex(source);
    const destinationNode = this.addVertex(destination);

    sourceNode?.addAdjacent(destination);
    if (this.graphType == GraphType.DIRECTED) destinationNode?.addAdjacent(source);
    return [sourceNode, destinationNode];
  }

  public search(searchType: SearchType, root: GraphNode<T> | undefined) {
    const queue = [root?.value];
    const result = [];
    const visited = new Map();
    visited.set(root?.value, true);
    let currentNode;
    while (queue.length) {
      currentNode = (searchType === SearchType.BFS) ? queue.shift() : queue.pop();
      result.push(currentNode);
      let node = this.nodes.get(<T>currentNode);
      node?.getAdjacents().forEach((adj: T) => {
        if (!visited.get(adj)) {
          visited.set(adj, true);
          queue.push(adj);
        }
      });
    }
    return result;
  }
}

const graph = new Graph<number>(GraphType.UNDIRECTED);
const [root] = graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(1, 4);
graph.addEdge(2, 5);
graph.addEdge(3, 6);
graph.addEdge(3, 7);
graph.addEdge(4, 8);
graph.addEdge(5, 9);
graph.addEdge(6, 10);
let result = graph.search(SearchType.BFS, root);
console.log(result);
result = graph.search(SearchType.DFS, root);
console.log(result);
graph.dump();