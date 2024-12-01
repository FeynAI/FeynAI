"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "../../utils/api";
import Image from "next/image";

export default function StartScreen() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [topics] = useState([
    { label: "Cosmology 🪐", value: "cosmology" },
    { label: "Computer Science 🖥️", value: "computer-science" },
    { label: "Human Body 🧑", value: "human-body" },
    { label: "Chemistry 🧪", value: "chemistry" },
    { label: "World History 🌍", value: "world-history" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          alert("No access token found. Redirecting to login.");
          router.push("/login");
          return;
        }

        const response = await axios.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        alert("Session expired. Please log in again.");
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  const startSession = async (topic) => {
    try {
      setIsLoading(true);

      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("No access token found. Redirecting to login.");
        router.push("/login");
        return;
      }

      const response = await axios.post(
        "/sessions/start-session",
        { topic },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { session_id, question } = response.data;
      // alert(`Session started: ${question}`);
      router.push(`/chat?session_id=${session_id}&topic=${topic}`);
    } catch (error) {
      console.error("Error starting session:", error);
      alert("Failed to start session. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isHydrated) return null;

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside
        className="w-64 flex-shrink-0 h-full"
        style={{
          background: "linear-gradient(to bottom, #FFFFFF 0%, #E3F2FF 100%)",
        }}
      >
        <div className="p-6">
          {/* Header with Logo */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Image src="/images/logo.png" alt="FeynAI Logo" className="w-8 h-8 mr-2" />
              <h1
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "20px",
                  color: "#1E293B",
                }}
              >
                FeynAI
              </h1>
            </div>
            <button
              className="w-5 h-5 text-gray-500 hover:text-gray-700"
              aria-label="Logout"
              onClick={() => {
                localStorage.removeItem("access_token");
                router.push("/login");
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M16 17L21 12L16 7M21 12H9M3 5V19C3 20.1046 3.89543 21 5 21H12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Topics */}
          <details className="group">
            <summary
              className="cursor-pointer list-none flex justify-between items-center"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "15px",
                fontWeight: 600,
                color: "#1E293B",
                lineHeight: "24px",
                letterSpacing: "-0.008em",
              }}
            >
              Topics
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 ml-2 text-gray-500 group-open:text-gray-700"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </summary>
            <ul className="pl-4 mt-4 space-y-4 hidden group-open:block">
              {topics.map((topic, index) => (
                <li
                  key={index}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#475569",
                    lineHeight: "22px",
                    letterSpacing: "-0.007em",
                  }}
                >
                  {topic.label}
                </li>
              ))}
            </ul>
          </details>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="flex-grow flex flex-col items-center justify-between"
        style={{
          backgroundColor: "#FFFFFF",
        }}
      >
        {/* Header */}
        <header className="text-center mt-40">
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "50px",
              fontWeight: 400,
              color: "#4A90E2",
              lineHeight: "22px",
              letterSpacing: "-0.007em",
            }}
          >
            Hello, {user?.email.split("@")[0] || "User"}
          </h2>
          <p
            className="mt-8"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              color: "#475569",
            }}
          >
            Select a topic to start
          </p>
        </header>

        {/* Topic Boxes */}
        <div className="space-y-4 w-full max-w-xs mb-8">
          {topics.map((topic, index) => (
            <button
              key={index}
              className="block w-full py-3 text-center rounded-lg"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#475569",
                backgroundColor: "#E3F2FF",
              }}
              onClick={() => startSession(topic.value)}
              disabled={isLoading}
            >
              {topic.label}
            </button>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center">
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "14px",
              color: "#94A3B8",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            FeynAI can make mistakes.{" "}
            <a href="/terms" className="text-blue-600 hover:underline">
              Check our Terms & Conditions.
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
