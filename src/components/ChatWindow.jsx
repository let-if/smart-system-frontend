
import { useState, useRef, useEffect } from "react";
import "./ChatWindow.css";

function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      user: "ChatBot",
      text: "Hello! How can I help you today?",
      color: "#999999",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "delivered",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const msg = {
      id: Date.now(),
      user: "You",
      text: input,
      type: "user",
      color: "#FF5733",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };

    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  return (
    <div className="chat-overlay">
      <div className="div2">
        <h3 className="h3">ChatBot</h3>
        <div className="bot-avatar">AI</div>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id || msg.text + msg.time}
            className={`message ${msg.type === "bot" ? "bot" : "user"}`}
          >
            {msg.type !== "bot" && (
              <div className="avatar" style={{ backgroundColor: msg.color }}>
                {msg.user[0].toUpperCase()}
              </div>
            )}
            <div className="msg-text">
              {msg.text}
              <span className="msg-time">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <form className="div3 chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message..."
          className="message-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="send-btn">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;