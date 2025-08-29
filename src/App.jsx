import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Initialize votes from LocalStorage or default 0
  const initialVotes = JSON.parse(localStorage.getItem("votes")) || {
    JavaScript: 0,
    Python: 0,
    Java: 0,
    "C++": 0,
  };

  const [votes, setVotes] = useState(initialVotes);

  // Persist votes in LocalStorage whenever votes change
  useEffect(() => {
    localStorage.setItem("votes", JSON.stringify(votes));
  }, [votes]);

  // Voting function
  const vote = (language) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [language]: prevVotes[language] + 1,
    }));
  };

  return (
    <div className="App">
      <h1>Online Voting System</h1>
      <p>Vote for your favorite programming language:</p>
      <div className="buttons">
        {Object.keys(votes).map((lang) => (
          <button key={lang} onClick={() => vote(lang)}>
            {lang}
          </button>
        ))}
      </div>
      <h2>Current Results:</h2>
      <div className="results">
        {Object.entries(votes).map(([lang, count]) => (
          <p key={lang}>
            {lang}: {count} votes
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
