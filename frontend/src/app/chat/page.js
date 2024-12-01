"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "../../utils/api";
import { chatApi } from "@/lib/api/chat";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const topic = searchParams.get("topic");

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchFirstQuestion = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          alert("No access token found. Redirecting to login.");
          router.push("/login");
          return;
        }

        const response = await axios.get(`/sessions/${sessionId}/first-question`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMessages([
          {
            role: "assistant",
            content: response.data.question,
          },
        ]);
      } catch (error) {
        console.error("Error fetching first question:", error);
        alert("Failed to fetch the first question. Please try again.");
      }
    };

    fetchFirstQuestion();
  }, [sessionId]);

  const handleSubmit = async () => {
    if (!input.trim()) {
      alert("Please enter a valid input.");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("No access token found. Redirecting to login.");
        router.push("/login");
        return;
      }

      // Using chatApi from chat.js
      const response = await chatApi.submitAnswer(sessionId, input, topic);

      // Update chat messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: input },
        { role: "assistant", content: response.follow_up_question },
      ]);

      setInput(""); // Clear input after successful submission
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("Failed to submit your answer. Please try again.");
    }
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 h-full bg-blue-100">
        <div className="p-6">
          <h1 className="text-xl font-bold">FeynAI</h1>
          <p className="mt-4 text-gray-600">Topic: {topic}</p>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-grow flex flex-col">
        <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"
                }`}
            >
              <p
                className={`inline-block px-4 py-2 rounded-lg ${message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
                  }`}
              >
                {message.content}
              </p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-white border-t">
          <input
            type="text"
            className="border rounded-lg p-2 w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer here..."
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </main>
    </div>
  );
}
