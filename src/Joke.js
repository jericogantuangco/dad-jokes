function Joke({ votes, text, upVote, downVote }) {
  return (
    <div className="Joke">
      <div className="Joke-buttons">
        <i className="fas fa-arrow-up" onClick={upVote}></i>
        <span>{votes}</span>
        <i className="fas fa-arrow-down" onClick={downVote}></i>
      </div>
      <div className="Joke-text">{text}</div>
    </div>
  );
}

export default Joke;
