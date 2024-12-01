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

    // Attach node click event
    this.network.on("click", (params) => this.handleNodeClick(params));
  }

  // Add a new topic
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

  // Add a new question
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
        questionDetails: question, // Store details for the popup
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

  // Handle node clicks
  handleNodeClick(params) {
    if (params.nodes.length) {
      const nodeId = params.nodes[0];
      const node = this.nodes.get(nodeId);

      // Check if the clicked node is a question node
      if (
        node.color.background === getCSSVariableValue("--question-node-color")
      ) {
        this.showPopup(node.questionDetails || "No details available.");
      }
    }
  }

  // Show the popup
  showPopup(questionText) {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    const popupText = document.getElementById("popup-text");

    popupText.innerText = `Details: ${questionText}`;
    popup.style.display = "block";
    overlay.style.display = "block";
  }

  // Close the popup
  closePopup() {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");

    popup.style.display = "none";
    overlay.style.display = "none";
  }

  // Button actions
  button1Action() {
    alert("Button 1 clicked!");
  }

  button2Action() {
    alert("Button 2 clicked!");
  }

  button3Action() {
    alert("Button 3 clicked!");
  }
}

export { MindMap };