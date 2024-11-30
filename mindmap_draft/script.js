import { MindMapDisplay as MindMapRenderer } from "./components/MindMap.js";
console.log(MindMapRenderer); // Should log the MindMap class

const mindMap = new MindMapRenderer("container");
const node1 = mindMap.createNode(200, 200, "What is cosmology?", 1);
const node2 = mindMap.createNode(200, 300, "What is the sun?", 2);
const node3 = mindMap.createNode(200, 400, "What does the sun is burning ?", 3);

const node4 = mindMap.createNode(0, 200, "Is the space empty?", 2);


mindMap.connectNodes(node1, node2,1);
mindMap.connectNodes(node2, node3,2);
mindMap.connectNodes(node1, node4,1);

mindMap.draw();
