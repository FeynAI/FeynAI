import { MindMapDisplay as MindMapRenderer } from "./components/MindMap.js";
console.log(MindMapRenderer); // Should log the MindMap class

const mindMap = new MindMapRenderer("container");
const node1 = mindMap.createNode(200, 200, "What is cosmology?", "Cosmology is the scientific study of the universe's origin, structure, evolution, and ultimate fate.\n It seeks to understand phenomena like the Big Bang, dark matter, dark energy, and the large-scale structure of space and time.", 1);
const node2 = mindMap.createNode(200, 400, "What is the sun?", "The Sun is a massive, glowing ball of hot plasma at the center of our solar system.\n It generates energy through nuclear fusion, converting hydrogen into helium, and provides light and heat essential for life on Earth.", 2);
const node3 = mindMap.createNode(200, 500, "What does the sun is burning?", "The Sun 'burns' hydrogen in a process called nuclear fusion.\n In its core, hydrogen atoms fuse to form helium, releasing immense energy in the form of light and heat.\n This is not chemical burning but a nuclear reaction.", 3);

const node4 = mindMap.createNode(0, 200, "Is the space empty?", "Space is not completely empty; it is a vacuum with extremely low density.\n It contains particles, radiation, dark matter, and dark energy, as well as interstellar gas and dust, but these are sparsely distributed.", 2);

mindMap.connectNodes(node1, node2, 1);
mindMap.connectNodes(node2, node3, 2);
mindMap.connectNodes(node1, node4, 1);

mindMap.draw();
