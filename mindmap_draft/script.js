import {createMindMap} from './components/MindMapBuilder.js';


document.addEventListener('DOMContentLoaded', () => {
    const data = {
        "initial-prompt": "Cosmology",
        "questions": {
            "question": "What is Cosmology?",
            "answer": "Cosmology is the study of the universe.",
            "follow-up": [
                {
                    "question": "What is the study of the universe?",
                    "answer": "The universe is the study of everything that exists, including stars, planets, galaxies, and the space between them.",
                    "follow-up": null
                },
                {
                    "question": "how big is the universe?",
                    "answer": "The universe is infinite in size for our comprehension and still growing.",
                    "follow-up": [
                        {
                            "question": "How do we know the universe is infinite?",
                            "answer": "We know the universe is infinite because we can see the light from stars that are billions of light-years away.",
                            "follow-up": null
                        }
                    ]
                }
            ]
        }
    };
    createMindMap(data, 200, 200);
});