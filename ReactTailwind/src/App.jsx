import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [cvResults, setCvResults] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [currentCv, setCurrentCv] = useState(null);
  const [prompt, setPrompt] = useState("");

  const handleShowJobDescription = () => {
    setCvResults([
      { id: 1, title: "CV1" },
      { id: 2, title: "CV2" },
      { id: 3, title: "CV3" },
      { id: 4, title: "CV4" },
      { id: 5, title: "CV5" },
    ]);
    setShowChat(false);
  };

  const handleSendMessage = () => {
    if (!prompt) return;

    const userMessage = { text: prompt, isUser: true };
    const botResponse = {
      text: `Response for '${prompt}' regarding ${currentCv}`,
      isUser: false,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage, botResponse]);
    setPrompt("");
  };

  const clearChat = () => setMessages([]);

  const closeChat = () => {
    setShowChat(false);
    clearChat();
    setCurrentCv(null);
  };

  return (
    <div className="App min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">CVBot</h1>

      {/* Job Description Input */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Enter Job Description:</h3>
        <textarea
          className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200 mb-4"
          placeholder="Enter job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          onClick={handleShowJobDescription}
        >
          Show Job Description
        </button>
      </div>

      {/* CV Results */}
      {cvResults.length > 0 && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">CV Matching Results:</h3>
          {cvResults.map((cv) => (
            <div
              key={cv.id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-2"
            >
              <span className="text-gray-700">{cv.title}</span>
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => alert(`Displaying ${cv.title} details`)}
                >
                  Show CV
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                  onClick={() => {
                    setShowChat(true);
                    setCurrentCv(cv.title);
                  }}
                >
                  Ask Question
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chat Popup */}
      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Chat for {currentCv}</h3>
            <button
              className="absolute top-1 right-1 bg-red-600"
              onClick={closeChat}
            >
              ✖
            </button>
            <div className="chat-messages overflow-y-auto h-48 mb-4 border p-3 rounded-lg bg-gray-50" color="red">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 mb-2 rounded-lg ${
                    msg.isUser ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {msg.isUser ? "🧑" : "🤖"} {msg.text}
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                className="flex-grow border rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Enter your question..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                onClick={clearChat}
              >
                Clear Chat
              </button>
              <button
                className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition"
                onClick={handleSendMessage}
              >
                Ask
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
