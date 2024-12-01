import { getCSSVariableValue } from "./utils/style.js";
import { convertData } from "./dataloader.js";
import { mindMapStyle } from "./mindmapstyle.js";

class MindMap {
  constructor(containerId, data) {
    this.container = document.getElementById(containerId);
    const { nodes, edges } = convertData(data);
    this.nodes = nodes;
    this.edges = edges;

    this.nodeIdCounter = Math.max(...this.nodes.getIds()) + 1;
    this.network = new vis.Network(
      this.container,
      { nodes: this.nodes, edges: this.edges },
      mindMapStyle
    );
    console.log("network",this.network);
    this.activeChainParentId = null;
  }

  addNewTopic(topic) {
    function htmlTitle(html) {
      const container = document.createElement("div");
      container.innerHTML = html;
      return container;
    }
    if (topic) {
      const topicId = this.nodeIdCounter++;
      let title = `Topic: ${topic}`;
      this.nodes.add({
        id: topicId,
        label: "",
        title: htmlTitle(title),
        zoomedTitle: topic,
        color: { background: getCSSVariableValue("--topic-node-color"), border: "black" },
        shape: "diamond",
        size: 30,
      });
      this.activeChainParentId = topicId;
      this.network.redraw();
    } else {
      alert("Please enter a topic!");
    }
  }

  addQuestion(question) {
    if (question) {
      const selectedNodes = this.network.getSelectedNodes();
      if (selectedNodes.length === 0) {
        alert("Please select a node to add the question to!");
        return;
      }

      const parentId = selectedNodes[0];
      const questionId = this.nodeIdCounter++;
      this.nodes.add({
        id: questionId,
        label: "Question",
        title: `Question: ${question}`,
        font: { size: 0 },
        shape: "dot",
        size: 15,
      });
      this.edges.add({
        from: parentId,
        to: questionId,
      });
      this.network.redraw();
    } else {
      alert("Please enter a question!");
    }
  }


}

export { MindMap };