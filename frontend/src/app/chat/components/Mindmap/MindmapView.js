"use client";
import { useEffect, useRef, useState } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { chatApi } from '@/lib/api/chat';

export default function MindmapView({ sessionId, messages, topic }) {
  const containerRef = useRef(null);
  const networkRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // Convert messages to mindmap format
  const processMessages = (messages) => {
    // Create root node for the topic
    const nodes = new DataSet([
      {
        id: 'root',
        label: topic,
        level: 0,
        color: {
          background: '#E3F2FF',
          border: '#0065BD'
        },
        font: {
          size: 18,
          face: 'Plus Jakarta Sans'
        },
        shape: 'box',
        margin: 10,
        physics: true
      }
    ]);

    // Process messages into nodes
    messages.forEach((msg, index) => {
      const nodeId = `msg-${index}`;
      let messageContent;

      // Handle different response types based on role and content
      if (msg.role === 'assistant') {
        // For assistant messages, check if it's a follow-up question or a response message
        messageContent = msg.content || "If you know, you know.";
      } else {
        // For user messages, use the content directly
        messageContent = msg.content || "";
      }

      // Create label with truncation
      const label = messageContent.substring(0, 50) + (messageContent.length > 50 ? '...' : '');

      nodes.add({
        id: nodeId,
        label: label,
        title: messageContent, // Full content shown on hover
        level: Math.floor(index / 2) + 1,
        color: {
          background: msg.role === 'assistant' ? '#E5E7EB' : '#93C5FD',
          border: msg.role === 'assistant' ? '#9CA3AF' : '#3B82F6'
        },
        font: {
          size: 14,
          face: 'Plus Jakarta Sans'
        },
        shape: 'box',
        margin: 10
      });
    });

    // Create edges to connect nodes
    const edges = new DataSet();

    // Connect root to first message
    if (messages.length > 0) {
      edges.add({
        from: 'root',
        to: 'msg-0',
        arrows: 'to',
        color: { color: '#9CA3AF' },
        smooth: {
          type: 'curvedCW',
          roundness: 0.2
        }
      });
    }

    // Connect subsequent messages
    for (let i = 0; i < messages.length - 1; i++) {
      edges.add({
        from: `msg-${i}`,
        to: `msg-${i + 1}`,
        arrows: 'to',
        color: { color: '#9CA3AF' },
        smooth: {
          type: 'curvedCW',
          roundness: 0.2
        }
      });
    }

    return { nodes, edges };
  };

  // Initialize and update network
  useEffect(() => {
    if (!containerRef.current) return;

    const data = processMessages(messages);

    const options = {
      nodes: {
        shape: 'circle',
        margin: 20,        // Add margin around nodes
        physics: false,
        font: {
          face: 'Plus Jakarta Sans'
        },
        borderWidth: 2,
        shadow: true
      },
      edges: {
        width: 1,
        color: { color: "black" },
        arrows: "to",
        smooth: {
          type: 'cubicBezier',    // Change curve type
          forceDirection: 'horizontal', // Force horizontal flow
          roundness: 0.4          // Reduce curve roundness
        }
      },
      layout: {
        hierarchical: {
          direction: 'LR', // Change to left-to-right direction
          sortMethod: 'directed',
          levelSeparation: 250,  // Increased horizontal spacing between levels
          nodeSpacing: 100,      // Vertical spacing between nodes
          treeSpacing: 200,      // Space between different branches
          blockShifting: true,   // Allow shifting of blocks to reduce crowding
          edgeMinimization: true,// Minimize edge crossing
          parentCentralization: false, // Prevent parent node centering for better spacing
          shakeTowards: 'leaves' // Help arrange nodes towards the leaves
        }
      },
      physics: {
        enabled: true,
      },
      interaction: {
        hover: true,
        dragView: true,
        zoomView: true,
      },
      groups: {
        question: {
          color: { background: '#E5E7EB', border: '#9CA3AF' }
        },
        answer: {
          color: { background: '#93C5FD', border: '#3B82F6' }
        }
      }
    };


    if (!networkRef.current) {
      networkRef.current = new Network(containerRef.current, data, options);

      // Add event listeners
      networkRef.current.on('click', function (params) {
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          const node = data.nodes.get(nodeId);
          console.log('Clicked node:', node);
        }
      });

      networkRef.current.on('hoverNode', function (params) {
        containerRef.current.style.cursor = 'pointer';
      });

      networkRef.current.on('blurNode', function (params) {
        containerRef.current.style.cursor = 'default';
      });
    } else {
      networkRef.current.setData(data);
    }

    // Center the network after data update
    setTimeout(() => {
      if (networkRef.current) {
        networkRef.current.fit({
          animation: {
            duration: 1000,
            easingFunction: 'easeInOutQuad'
          }
        });
      }
    }, 100);

    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
        networkRef.current = null;
      }
    };
  }, [messages, topic]);

  // Handle zoom controls
  const handleZoomIn = () => {
    if (networkRef.current) {
      const currentScale = networkRef.current.getScale();
      networkRef.current.moveTo({
        scale: currentScale * 1.2,
        animation: {
          duration: 200,
          easingFunction: 'easeInOutQuad'
        }
      });
    }
  };

  const handleZoomOut = () => {
    if (networkRef.current) {
      const currentScale = networkRef.current.getScale();
      networkRef.current.moveTo({
        scale: currentScale * 0.8,
        animation: {
          duration: 200,
          easingFunction: 'easeInOutQuad'
        }
      });
    }
  };

  const handleCenter = () => {
    if (networkRef.current) {
      networkRef.current.fit({
        animation: {
          duration: 1000,
          easingFunction: 'easeInOutQuad'
        }
      });
    }
  };

  return (
    <div className="relative h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      <div className="absolute inset-0" ref={containerRef} />

      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={handleZoomIn}
          className="p-2 rounded-lg bg-white shadow-md hover:bg-gray-50 transition-colors"
          aria-label="Zoom in"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 rounded-lg bg-white shadow-md hover:bg-gray-50 transition-colors"
          aria-label="Zoom out"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button
          onClick={handleCenter}
          className="p-2 rounded-lg bg-white shadow-md hover:bg-gray-50 transition-colors"
          aria-label="Center view"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l-4 4m0 0l-4-4m4 4V3" />
          </svg>
        </button>
      </div>
    </div>
  );
}