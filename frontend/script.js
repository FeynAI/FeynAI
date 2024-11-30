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
    this.activeChainParentId = null;
    this.initializeHoverEvent();
    this.network.redraw();
  }


  addNewTopic(topic) {
    if (topic) {
      const topicId = this.nodeIdCounter++;
      this.nodes.add({
        id: topicId,
        label: topic,
        title: `Main Topic: ${topic}`,
        font: { size: 20 },
        color: { background: getCSSVariableValue("--topic-node-color") },
        shape: "circle",
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
      if (!this.activeChainParentId) {
        alert("Please start a new topic first!");
        return;
      }

      const questionId = this.nodeIdCounter++;
      this.nodes.add({
        id: questionId,
        label: "Question",
        title: `Question: ${question}`,
        font: { size: 0 },
        color: { background: getCSSVariableValue("--question-node-color") },
        shape: "dot",
        size: 15,
      });
      this.edges.add({
        from: this.activeChainParentId,
        to: questionId,
      });
      this.activeChainParentId = questionId;
      this.network.redraw();
    } else {
      alert("Please enter a question!");
    }
  }

  draw() {
    this.network.redraw();
  }
}

export { MindMap };