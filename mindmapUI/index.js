function buildQuestionTree(nodes) {
  const nodeMap = {};
  const finalNodeArray = [];

  nodes.forEach((node) => {
    nodeMap[node.nodeId] = { ...node, followup: [] };
  });

  nodes.forEach((node) => {
    if (node.parent) {
      const parentNode = nodeMap[node.parent];
      if (parentNode) {
        parentNode.followup.push(nodeMap[node.nodeId]);
      }
    } else {
      finalNodeArray.push(nodeMap[node.nodeId]);
    }
  });

  return { questions: finalNodeArray };
}

const nodes = [
  {
    nodeId: '1',
    q: 'Root question',
    a: 'Answer 1',
    time: '2024-11-30',
    parent: null,
  },
  {
    nodeId: '2',
    q: 'Child question 1',
    a: 'Answer 2',
    time: '2024-11-30',
    parent: '1',
  },
  {
    nodeId: '3',
    q: 'Child question 2',
    a: 'Answer 3',
    time: '2024-11-30',
    parent: '1',
  },
  {
    nodeId: '4',
    q: 'Grandchild question',
    a: 'Answer 4',
    time: '2024-11-30',
    parent: '2',
  },
];

const tree = buildQuestionTree(nodes);
console.log(JSON.stringify(tree, null, 2));

/* 
 function(nodeid, answer)
 -> update answer to the node with nodeid
  model
  NODE
    - nodeid
    - sessionid
    - question
    - answer
    - time
    - parent
  /get[sessionID] -> all node with same session id -> return object  =
  NODE
    - nodeid
    - question
    - answer
    - time
    - parent
  /answer[nodeID](postReq) -> update answer to the node with nodeid
    after answering question call newQuestion[nodeID] to get the next question
  /newQuestion[nodeID](postReq) -> new node with parent = nodeID
*/