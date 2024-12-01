"use client";

import { useState } from "react";
import axios from "../../utils/api";

export default function SignupPage() {
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await axios.post("/auth/signup", { email: formData.email, password: formData.password });
      alert("Signup successful!");
      window.location.href = "/login"; // Redirect to login screen
    } catch (error) {
      alert("Error signing up: " + (error.response?.data?.detail || "Unknown error"));
    }
  };

  return (
    <div
      className="h-screen flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(to bottom, #FFFFFF 0%, #E3F2FF 100%)",
      }}
    >
      <div className="flex items-center mb-6">
        <img src="/images/logo.png" alt="FeynAI Logo" className="w-16 h-16 mr-2" />
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: "36px",
            color: "#1E293B",
          }}
        >
          FeynAI
        </h1>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        {/* Email Input */}
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 400,
          }}
        >
          Email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent mb-4"
          onChange={handleInputChange}
        />

        {/* Password Input */}
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 400,
          }}
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent mb-4"
          onChange={handleInputChange}
        />

        {/* Confirm Password Input */}
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 400,
          }}
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent mb-4"
          onChange={handleInputChange}
        />

        {/* Sign Up Button */}
        <button
          className="w-full py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "16px",
          }}
          onClick={handleSignup}
        >
          Sign Up
        </button>

        {/* Login Link */}
        <p
          className="text-center text-sm text-gray-700 mt-4"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 400,
          }}
        >
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
