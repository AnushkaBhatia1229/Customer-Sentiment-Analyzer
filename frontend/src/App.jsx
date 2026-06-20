import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeSentiment = async () => {
    if (!text.trim()) {
      alert("Please enter a review");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://customer-sentiment-analyzer-3off.onrender.com/api/sentiment/analyze",
        { text }
      );

      setResult(res.data.sentiment);
    } catch (error) {
      console.error(error);
      alert("Error analyzing sentiment");
    }

    setLoading(false);
  };

  const clearText = () => {
    setText("");
    setResult("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "850px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          borderRadius: "25px",
          padding: "35px",
          color: "white",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          💬 Customer Sentiment Analyzer
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#d1d5db",
            marginBottom: "30px",
          }}
        >
          AI Powered Customer Feedback Analysis Dashboard
        </p>

        <textarea
          rows="7"
          placeholder="Write customer review here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "15px",
            border: "none",
            outline: "none",
            fontSize: "16px",
            resize: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
            color: "#cbd5e1",
          }}
        >
          <span>Characters: {text.length}</span>
          <span>
            Words:{" "}
            {text.trim() === ""
              ? 0
              : text.trim().split(/\s+/).length}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "25px",
          }}
        >
          <button
            onClick={analyzeSentiment}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: "#2563eb",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {loading
              ? "⏳ Analyzing..."
              : "🚀 Analyze Sentiment"}
          </button>

          <button
            onClick={clearText}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: "#ef4444",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            🗑 Clear
          </button>
        </div>

        {result && (
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              borderRadius: "15px",
              textAlign: "center",
              fontSize: "28px",
              fontWeight: "bold",
              transition: "0.3s",
              background:
                result === "Positive"
                  ? "#16a34a"
                  : result === "Negative"
                  ? "#dc2626"
                  : "#eab308",
              color:
                result === "Neutral"
                  ? "black"
                  : "white",
            }}
          >
            {result === "Positive" && "😊 Positive"}
            {result === "Negative" && "😞 Negative"}
            {result === "Neutral" && "😐 Neutral"}
          </div>
        )}

        <div
          style={{
            marginTop: "35px",
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "15px",
          }}
        >
          <div
            style={{
              background: "#16a34a",
              padding: "20px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2>😊</h2>
            <p>Positive Reviews</p>
          </div>

          <div
            style={{
              background: "#dc2626",
              padding: "20px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2>😞</h2>
            <p>Negative Reviews</p>
          </div>

          <div
            style={{
              background: "#eab308",
              color: "black",
              padding: "20px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2>😐</h2>
            <p>Neutral Reviews</p>
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "35px",
            color: "#cbd5e1",
          }}
        >
          Developed by Anushka Bhatia | BCA AIML
        </p>
      </div>
    </div>
  );
}

export default App;