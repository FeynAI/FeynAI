import { getCSSVariableValue } from "./utils/style.js";

const mindMapStyle ={
      nodes: {
        font: {
          size: 16,
          color: "black",
        },
        color: {
          highlight: {
            background: getCSSVariableValue("--selected-node-color"),
            border: "#FFFFFF",
          },
        },
      },
      edges: {
        width: 2,
        color: { color: "black" },
        arrows: "to",
      },
      physics: {
        enabled: true,
      },
      interaction: {
        hover: true, // Enable hover events
    },
    };
  
export { mindMapStyle };