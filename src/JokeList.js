import { useState, useEffect } from "react";
import axios from "axios";

function JokeList({ numJokesToGet = 10 }) {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    async function loadJokes() {
      let jokes = [];
      while (jokes.length < numJokesToGet) {
        let response = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        });
        jokes.push(response.data.joke);
      }
      setJokes(jokes);
    }
    loadJokes();
  }, [numJokesToGet]);
  return (
    <div className="JokeList">
      <h1>Joke List</h1>
      <div className="JokeList-joke">
        {jokes.map((joke) => (
          <div>{joke}</div>
        ))}
      </div>
    </div>
  );
}

export default JokeList;
