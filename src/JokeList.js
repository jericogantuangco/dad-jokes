import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./JokeList.css";
import Joke from "./Joke";

function JokeList({ numJokesToGet = 10 }) {
  const [jokes, setJokes] = useState(
    JSON.parse(window.localStorage.getItem("jokes") ?? "[]")
  );
  const [loading, setLoading] = useState(false);

  const seenJokes = useMemo(
    () => new Set(jokes.map((joke) => joke.text)),
    [jokes]
  );

  const loadJokes = useCallback(async () => {
    try {
      let loadedJokes = [];
      while (loadedJokes.length < numJokesToGet) {
        let response = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        });
        const newJoke = response.data.joke;
        if (seenJokes.has(newJoke)) {
          console.log("FOUND DUPLICATE");
          console.log(newJoke);
        } else {
          loadedJokes.push({ id: uuidv4(), text: newJoke, votes: 0 });
        }
      }
      setJokes([...jokes, ...loadedJokes]);
      setLoading(false);
    } catch (e) {
      alert(e);
      setLoading(false);
    }
  }, [seenJokes, jokes, numJokesToGet]);

  useEffect(() => {
    window.localStorage.setItem("jokes", JSON.stringify(jokes));
  }, [jokes, loadJokes]);

  useEffect(() => {
    if (jokes.length === 0) loadJokes();
  }, [jokes, loadJokes]);

  const handleVote = useCallback(
    (id, delta) => {
      setJokes(
        jokes.map((joke) => {
          if (joke.id === id) {
            return { ...joke, votes: joke.votes + delta };
          }
          return joke;
        })
      );
    },
    [jokes]
  );

  useEffect(() => {
    window.localStorage.setItem("jokes", JSON.stringify(jokes));
  }, [jokes, handleVote]);

  const handleClick = () => {
    setLoading(true);
    loadJokes();
  };

  if (loading) {
    return (
      <div className="JokeList-spinner">
        <i className="far fa-8x fa-laugh fa-spin" />
        <h1 className="JokeList-title">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="JokeList">
      <div className="JokeList-sidebar">
        <h1 className="JokeList-title">
          <span>Joke</span> List
        </h1>
        <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
        <button className="JokeList-getmore" onClick={handleClick}>
          New Jokes
        </button>
      </div>

      <div className="JokeList-jokes">
        {jokes
          .sort((a, b) => b.votes - a.votes)
          .map((joke) => (
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
