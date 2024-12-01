// src/lib/api/chat.js
import api from "./axios";

export const chatApi = {
  submitAnswer: async (sessionId, input, topic) => {
    const formData = new FormData();

    // Add either input text or file
    if (typeof input === "string") {
      formData.append("input_text", input);
    } else {
      formData.append("input", input);
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("Access token not found");
    }

    const response = await api.post("/submit-answer", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      params: {
        session_id: sessionId,
        topic: topic,
      },
    });

    return response.data;
  },

  getMindmapData: async (sessionId) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("Access token not found");
    }
    const response = await api.get(`/sessions/${sessionId}/mindmap`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  updateMindmapNode: async (sessionId, nodeId, data) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("Access token not found");
    }
    const response = await api.patch(`/sessions/${sessionId}/mindmap/nodes/${nodeId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
};
