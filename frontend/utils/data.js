// type QuestionNode = {
//   nodeId: string;
//   q: string;
//   a: string;
//   time: string;
//   parent: string | null;
//   followup?: QuestionNode[];
// };

class DataHandler {
  addRootNode(createdId,topic) {
    // root node is a topic
    let root_node= { nodeId: createdId, q: topic, a: "", time: new Date().toISOString(), parent: null };
    this.postData(root_node);
  }

  addNode(question,answer, parentNodeId) {
    let node = {nodeId: parentNodeId, q: question, a: answer, time: new Date().toISOString(), parent: parentNodeId };
    this.postData(node);
  }

  postData(data) {
    //TODO: replace the placeholder with the actual POST request
    pass;
  }

}

export default DataHandler;
