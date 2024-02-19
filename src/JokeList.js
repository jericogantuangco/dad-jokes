import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./JokeList.css";
import Joke from "./Joke";

function JokeList({ numJokesToGet = 10 }) {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    async function loadJokes() {
      let jokes = [];
      while (jokes.length < numJokesToGet) {
        let response = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        });
        jokes.push({ id: uuidv4(), text: response.data.joke, votes: 0 });
      }
      setJokes(jokes);
    }
    loadJokes();
  }, [numJokesToGet]);

  function handleVote(id, delta) {
    setJokes(
      jokes.map((joke) => {
        if (joke.id === id) {
          return { ...joke, votes: joke.votes + delta };
        }
        return joke;
      })
    );
  }
  return (
    <div className="JokeList">
      <div className="JokeList-sidebar">
        <h1 className="JokeList-title">
          <span>Joke</span> List
        </h1>
        <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
        <button className="JokeList-getmore">New Jokes</button>
      </div>

      <div className="JokeList-jokes">
        {jokes.map((joke) => (
          <div>
            <Joke
              key={joke.id}
              votes={joke.votes}
              text={joke.text}
              upVote={() => handleVote(joke.id, 1)}
              downVote={() => handleVote(joke.id, -1)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default JokeList;
