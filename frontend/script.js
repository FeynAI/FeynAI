// Initialize the data for the mindmap
const nodes = new vis.DataSet([]);
const edges = new vis.DataSet([]);

// Options for the network
const options = {
  nodes: {
    font: {
      size: 16, // Set default text size
      color: "black", // Adjusted text color for better contrast
    },
    color: {
      highlight: {
        background: "#FFA500",
        border: "#FFFFFF",
      },
    },
  },
  edges: {
    width: 2,
    color: { color: "black" }, // Adjusted edge color for better visibility
    arrows: "to",
  },
  physics: {
    enabled: true,
  },
};

// Create a network
const container = document.getElementById("mindmap");
const data = { nodes, edges };
const network = new vis.Network(container, data, options);

// Track the next node ID and active chain
let nodeIdCounter = 1;
let activeChainParentId = null;

// Function to start a new topic
function addNewTopic() {
  const inputField = document.getElementById("topicInput");
  const topic = inputField.value.trim();

  if (topic) {
    const topicId = nodeIdCounter++;
    nodes.add({
      id: topicId,
      label: topic,
      title: `Main Topic: ${topic}`, // Tooltip for the topic
      font: { size: 20 }, // Show main topic text
      color: { background: "#EB3678" }, // Purple color for topic nodes
      shape: "circle",
      size: 30, // Consistent size for topic nodes
    });
    activeChainParentId = topicId; // Set as the parent for the next chain
    inputField.value = ""; // Clear the input field
  } else {
    alert("Please enter a topic!");
  }
}

// Function to add a question to the current chain
function addQuestion() {
  const inputField = document.getElementById("questionInput");
  const question = inputField.value.trim();

  if (question) {
    if (!activeChainParentId) {
      alert("Please start a new topic first!");
      return;
    }

    const questionId = nodeIdCounter++;
    nodes.add({
      id: questionId,
      label: "Question", // Label remains generic
      title: `Question: ${question}`, // Tooltip displays the full question
      font: { size: 0 }, // Hide question text initially
      color: { background: "#06D001" }, // Green color for question nodes
      shape: "dot",
      size: 15, // Smaller size for question nodes
    });
    edges.add({
      from: activeChainParentId,
      to: questionId,
    });
    activeChainParentId = questionId; // Set this question as the parent for the next question
    inputField.value = ""; // Clear the input field
  } else {
    alert("Please enter a question!");
  }
}