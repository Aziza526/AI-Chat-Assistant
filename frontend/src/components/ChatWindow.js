import React, { useState } from "react";

function ChatWindow() {
  const [messages, setMessages] = useState([]); // Stores all chat messages
  const [input, setInput] = useState(""); // Stores user’s current input

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { text: data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error communicating with backend:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "90vh",
        width: "400px",
        margin: "30px auto",
        border: "2px solid #ccc",
        borderRadius: "12px",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#0078D7",
          color: "white",
          padding: "12px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        💬 Aziza’s AI Chat
      </div>

      {/* Message area */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          overflowY: "auto",
          backgroundColor: "#f8f9fa",
        }}
      >
        {messages.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999" }}>
            Start chatting below 👇
          </p>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              style={{
                margin: "8px 0",
                textAlign: msg.sender === "user" ? "right" : "left",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "10px 15px",
                  borderRadius: "15px",
                  backgroundColor:
                    msg.sender === "user" ? "#0078D7" : "#e4e6eb",
                  color: msg.sender === "user" ? "white" : "black",
                  maxWidth: "80%",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Input area */}
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #ccc",
          padding: "10px",
          backgroundColor: "white",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            outline: "none",
          }}
        />
        <button
          onClick={handleSend}
          style={{
            marginLeft: "8px",
            padding: "10px 15px",
            backgroundColor: "#0078D7",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
        <button
          style={{
            marginLeft: "8px",
            padding: "10px 15px",
            backgroundColor: "white",
            color: "#0078D7", // changed color
            border: "2px solid #0078D7",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "24px",
          }}
        >
          🎙️
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
