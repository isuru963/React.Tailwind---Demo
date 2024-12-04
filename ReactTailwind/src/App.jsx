import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [cvResults, setCvResults] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [currentCv, setCurrentCv] = useState(null);
  const [prompt, setPrompt] = useState('');

  const handleShowJobDescription = () => {
    setCvResults([
      { id: 1, title: 'CV1' },
      { id: 2, title: 'CV2' },
      { id: 3, title: 'CV3' },
      { id: 4, title: 'CV4' },
      { id: 5, title: 'CV5' },
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
    setPrompt('');
  };

  const clearChat = () => setMessages([]);

  const closeChat = () => {
    setShowChat(false);
    clearChat();
    setCurrentCv(null);
  };

  return (
    <div className="App">
      <h1>CVBot</h1>

      {/* Job Description Input */}
      <div>
        <h3>Enter Job Description:</h3>
        <textarea
          placeholder="Enter job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <button onClick={handleShowJobDescription}>Show Job Description</button>
      </div>

      {/* CV Results */}
      {cvResults.length > 0 && (
        <div>
          <h3>CV Matching Results:</h3>
          {cvResults.map((cv) => (
            <div key={cv.id} className="cv-row">
              <span>{cv.title}</span>
              <button onClick={() => alert(`Displaying ${cv.title} details`)}>
                Show CV
              </button>
              <button
                onClick={() => {
                  setShowChat(true);
                  setCurrentCv(cv.title);
                }}
              >
                Ask Question
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Chat Popup */}
      {showChat && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Chat for {currentCv}</h3>
            <button onClick={closeChat}>Close</button>

            {/* Chat Messages */}
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={msg.isUser ? 'user-message' : 'bot-message'}>
                  {msg.isUser ? '🧑' : '🤖'} {msg.text}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div>
              <input
                type="text"
                placeholder="Enter your question..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button onClick={clearChat}>Clear Chat</button>
              <button onClick={handleSendMessage}>Ask</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
