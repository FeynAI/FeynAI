//useless for the moment, going to switch to a backend solution
class DataHandler {
  loadData() {
    const savedNodes = localStorage.getItem('nodes');
    const savedEdges = localStorage.getItem('edges');
    if (savedNodes) {
      this.nodes = new vis.DataSet(JSON.parse(savedNodes));
    }
    if (savedEdges) {
      this.edges = new vis.DataSet(JSON.parse(savedEdges));
    }
    if (this.nodes.length > 0) {
      this.nodeIdCounter = Math.max(...this.nodes.getIds()) + 1;
    }
    return this;
  }

  saveData() {
    localStorage.setItem('nodes', JSON.stringify(this.nodes.get()));
    localStorage.setItem('edges', JSON.stringify(this.edges.get()));
  }
}

export default DataHandler;
