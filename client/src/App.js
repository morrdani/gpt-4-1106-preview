import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < response.length) {
      setTimeout(() => {
        setDisplayedText(displayedText + response[index]);
        setIndex(index + 1);
      }, 50); // 100ms 간격으로 문자 출력
    }
  }, [displayedText, response, index]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/chat", {
        message,
      });
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Message:
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: "300px", height: "50px" }}
            />
          </label>
          <button type="submit">Send</button>
        </form>
        <p className="textBox">
          {" "}
          Response from AI:
          <br />
        </p>
        <pre className="text">{displayedText}</pre>
      </div>
    </div>
  );
}

export default App;
