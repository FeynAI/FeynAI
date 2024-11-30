import {MindMapRenderer} from './MindMapRenderer.js';

const createMindMap = (data,) => {
    console.log(data);
    const mindMap = new MindMapRenderer("container");
    let initialNode = data["questions"]; 
    mindMap.createNode(0,0,initialNode["question"],initialNode["answer"] );
    let follow_ups = initialNode["follow-up"];
    follow_ups.forEach(element => {
        mindMap.createNode(0,0,element["question"],element["answer"]);
        if (element["follow-up"] !== null) {
            let follow_ups2 = element["follow-up"];
            follow_ups2.forEach(element2 => {
                mindMap.createNode(0,0,element2["question"],element2["answer"]);
            });
        }
        
    });
};


export {createMindMap};