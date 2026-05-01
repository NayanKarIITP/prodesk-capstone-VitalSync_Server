import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function AiSuggest() {
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // 🌐 API URL
  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://prodesk-capstone-vitalsync.onrender.com";

  // 🔐 Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  // 🤖 AI Request
  const handleAI = async () => {
    if (!prompt) {
      alert("Please enter a prompt");
      return;
    }

    try {
      setLoading(true);
      setResult("");

      const res = await fetch(`${API_URL}/api/ai/suggest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg);
        setLoading(false);
        return;
      }

      setResult(data.result);
      setLoading(false);

    } catch (err) {
      alert("AI request failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-4 text-center">
          🤖 AI Health Assistant
        </h1>

        {/* ✍️ Input */}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask something like: Suggest a healthy diet plan..."
          className="w-full p-3 border rounded-md h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* 🚀 Button */}
        <button
          onClick={handleAI}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {/* 🧠 Result */}
        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h2 className="font-semibold mb-2">AI Response:</h2>
            <p className="whitespace-pre-line text-gray-800">
              {result}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}