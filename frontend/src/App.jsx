import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/sentiment/history"
      );
      setHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const analyzeSentiment = async () => {
    if (!text.trim()) {
      alert("Please enter a review");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/sentiment/analyze",
        { text }
      );

      setResult(res.data.sentiment);
      setText("");
      fetchHistory();
    } catch (error) {
      console.error(error);
      alert("Error analyzing sentiment");
    }

    setLoading(false);
  };

  const positiveCount = history.filter(
    (item) => item.sentiment === "Positive"
  ).length;

  const negativeCount = history.filter(
    (item) => item.sentiment === "Negative"
  ).length;

  const neutralCount = history.filter(
    (item) => item.sentiment === "Neutral"
  ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a, #182c64, #4068bf)",
        padding: "30px",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "42px",
          }}
        >
          💬 Customer Sentiment Analyzer
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#91979e",
          }}
        >
          AI Powered Customer Feedback Analysis Dashboard
        </p>

        {/* Statistics Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "15px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              background: "#237441",
              padding: "20px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2>{positiveCount}</h2>
            <p>😊 Positive</p>
          </div>

          <div
            style={{
              background: "#6a1010",
              padding: "20px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2>{negativeCount}</h2>
            <p>😞 Negative</p>
          </div>

          <div
            style={{
              background: "#d7b95e",
              padding: "20px",
              borderRadius: "15px",
              textAlign: "center",
              color: "black",
            }}
          >
            <h2>{neutralCount}</h2>
            <p>😐 Neutral</p>
          </div>
        </div>

        {/* Analyzer Card */}
        <div
          style={{
            marginTop: "30px",
            background: "rgba(45, 32, 32, 0.1)",
            padding: "25px",
            borderRadius: "20px",
            backdropFilter: "blur(15px)",
          }}
        >
          <textarea
            rows="5"
            placeholder="Enter customer review..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "12px",
              fontSize: "16px",
              border: "none",
              outline: "none",
            }}
          />

          <br />
          <br />

          <button
            onClick={analyzeSentiment}
            style={{
              background: "#051226",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {loading
              ? "⏳ Analyzing..."
              : "🚀 Analyze Sentiment"}
          </button>

          {result && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "12px",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "22px",
                background:
                  result === "Positive"
                    ? "#0a4821"
                    : result === "Negative"
                    ? "#7c0f0f"
                    : "#a98c34",
              }}
            >
              {result === "Positive" && "😊 Positive"}
              {result === "Negative" && "😞 Negative"}
              {result === "Neutral" && "😐 Neutral"}
            </div>
          )}
        </div>

        {/* Review History */}
        <div
          style={{
            marginTop: "30px",
            background: "rgba(255,255,255,0.1)",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2>📜 Review History</h2>

          <table
            style={{
              width: "100%",
              marginTop: "15px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={{ padding: "10px" }}>Review</th>
                <th style={{ padding: "10px" }}>Sentiment</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr key={item._id}>
                  <td style={{ padding: "10px" }}>{item.text}</td>
                  <td style={{ padding: "10px" }}>
                    {item.sentiment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "30px",
            color: "#cbd5e1",
          }}
        >
          Developed by Anushka Bhatia
        </p>
      </div>
    </div>
  );
}

export default App;