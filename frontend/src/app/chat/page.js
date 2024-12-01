"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "../../utils/api";
import { chatApi } from "@/lib/api/chat";
import MindmapView from "./components/Mindmap/MindmapView";
import MindmapControls from "./components/Mindmap/MindmapControls";

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const topic = searchParams.get("topic");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFirstQuestion = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          alert("No access token found. Redirecting to login.");
          router.push("/login");
          return;
        }
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchFirstQuestion();
  }, [sessionId, router]);

  const handleSubmit = async () => {
    if (!input.trim()) {
      alert("Please enter a valid input.");
      return;
    }
    try {
      setIsLoading(true);
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("No access token found. Redirecting to login.");
        router.push("/login");
        return;
      }
      const response = await chatApi.submitAnswer(sessionId, input, topic);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: input },
        { role: "assistant", content: response.follow_up_question },
      ]);
      setInput("");
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("Failed to submit your answer. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-b from-white to-[#E3F2FF]">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 h-full border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <img src="/logo.png" alt="FeynAI Logo" className="w-8 h-8 mr-2" />
            <h1
              className="text-xl font-bold"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: "#1E293B"
              }}
            >
              FeynAI
            </h1>
          </div>
          <p
            className="text-gray-600"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Topic: {topic}
          </p>
        </div>
      </aside>

      {/* Main Content Area - Split into Chat and Mindmap */}
      <div className="flex-grow flex">
        {/* Chat Section */}
        <div className="w-3/5 flex flex-col bg-white">
          {/* Chat Messages */}
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg max-w-[80%] ${message.role === "user"
                      ? "bg-[#0065BD] text-white"
                      : "bg-gray-100 text-[#1E293B]"
                    }`}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="relative">
              <textarea
                className="w-full border border-gray-200 rounded-lg p-3 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                rows="3"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your answer here..."
              />
              <button
                className={`absolute right-3 bottom-3 px-4 py-2 rounded-lg text-white ${isLoading ? "bg-gray-400" : "bg-[#0065BD] hover:bg-[#0055a3]"
                  } transition-colors`}
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: "bold",
                }}
              >
                {isLoading ? "Sending..." : "Submit"}
              </button>
            </div>
          </div>
        </div>

        {/* Mindmap Section */}
        <div className="w-2/5 border-l border-gray-200 bg-white flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2
              className="text-lg font-semibold"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: "#1E293B"
              }}
            >
              Conversation Map
            </h2>
          </div>
          <div className="flex-grow relative">
            <MindmapView
              sessionId={sessionId}
              messages={messages}
              topic={topic}
            />
            <MindmapControls
              onZoomIn={() => { }}
              onZoomOut={() => { }}
              onCenter={() => { }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}