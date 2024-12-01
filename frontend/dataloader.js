import { getCSSVariableValue } from "./utils/style.js";

function htmlTitle(html) {
  const container = document.createElement("div");
  container.innerHTML = html;
  return container;
}

function convertData(inputData) {
    const nodes = [];
    const edges = [];
    let questions= inputData.questions;
    let nodeIdCounter = 1;
    // TODO: rework to prevent XSS attacks
    function createGraphFromInit(question, parentId = null) {

      console.log("question",question);
      const nodeId = nodeIdCounter++;
      let title= "Question: "+question.q+"</br> Answer: "+question.a;
      nodes.push({ id: nodeId, label: "",title:htmlTitle(title), zoomedTitle: question.q});
      if (parentId !== null) {
        edges.push({ from: parentId, to: nodeId });
      }
  
      if (question.followup) {
        if (Array.isArray(question.followup)) {
          question.followup.forEach(followUpQuestion => createGraphFromInit(followUpQuestion, nodeId));
        } else {
          createGraphFromInit(question.followup, nodeId);
        }
      }
  
      return nodeId;
    }

    for (const question of questions) {
      const rootNodeId = nodeIdCounter++;
      let title= "Topic: "+question["q"];
      nodes.push({ id: rootNodeId, label:"" , title:htmlTitle(title),zoomedTitle: question["initial_prompt"],color: { background: getCSSVariableValue("--topic-node-color"), border: "black"}, shape: "diamond", size: 30 });
      createGraphFromInit(question, rootNodeId);
    }

    console.log("nodes",nodes);
    console.log("edges",edges);
    return {
      nodes: new vis.DataSet(nodes),
      edges: new vis.DataSet(edges)
    };
  }
  
export { convertData };
