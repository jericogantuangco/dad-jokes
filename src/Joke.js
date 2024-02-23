import "./Joke.css";

class Resource {
  resourceType;

  constructor(resourceType) {
    this.forRollingOnFloor = this.forRollingOnFloor.bind(this);
    this.forLaughing = this.forLaughing.bind(this);
    this.forSmiley = this.forSmiley.bind(this);
    this.forSlightlySmiling = this.forSlightlySmiling.bind(this);
    this.forNeutral = this.forNeutral.bind(this);
    this.forConfused = this.forConfused.bind(this);
    this.forAngry = this.forAngry.bind(this);
    this.resourceType = resourceType;
  }

  static type(resourceType) {
    this.resourceType = resourceType;
    if (resourceType === "color") {
      return new Resource("color");
    }
    return new Resource();
  }

  forRollingOnFloor() {
    if (this.resourceType === "color") {
      return "#4CAF50";
    }
    return "em em-rolling_on_the_floor_laughing";
  }

  forLaughing() {
    if (this.resourceType === "color") {
      return "#8BC34A";
    }
    return "em em-laughing";
  }

  forSmiley() {
    if (this.resourceType === "color") {
      return "#CDDC39";
    }
    return "em em-smiley";
  }

  forSlightlySmiling() {
    if (this.resourceType === "color") {
      return "#FFEB3B";
    }

    return "em em-slightly_smiling_face";
  }

  forNeutral() {
    if (this.resourceType === "color") {
      return "#FFC107";
    }

    return "em em-neutral_face";
  }

  forConfused() {
    if (this.resourceType === "color") {
      return "#FF9800";
    }
    return "em em-confused";
  }

  forAngry() {
    if (this.resourceType === "color") {
      return "#F44336";
    }
    return "em em-angry";
  }
}

function Joke({ votes, text, upVote, downVote }) {
  function getColor() {
    if (votes >= 15) {
      return Resource.type("color").forRollingOnFloor();
    } else if (votes >= 12) {
      return Resource.type("color").forLaughing();
    } else if (votes >= 9) {
      return Resource.type("color").forSmiley();
    } else if (votes >= 6) {
      return Resource.type("color").forSlightlySmiling();
    } else if (votes >= 3) {
      return Resource.type("color").forNeutral();
    } else if (votes >= 0) {
      return Resource.type("color").forConfused();
    }
    return Resource.type("color").forAngry();
  }

  function getEmoji() {
    if (votes >= 15) {
      return Resource.type().forRollingOnFloor();
    } else if (votes >= 12) {
      return Resource.type().forLaughing();
    } else if (votes >= 9) {
      return Resource.type().forSmiley();
    } else if (votes >= 6) {
      return Resource.type().forSlightlySmiling();
    } else if (votes >= 3) {
      return Resource.type().forNeutral();
    } else if (votes >= 0) {
      return Resource.type().forConfused();
    }
    return Resource.type().forAngry();
  }
  return (
    <div className="Joke">
      <div className="Joke-buttons">
        <i className="fas fa-arrow-up" onClick={upVote}></i>
        <span className="Joke-votes" style={{ borderColor: getColor() }}>
          {votes}
        </span>
        <i className="fas fa-arrow-down" onClick={downVote}></i>
      </div>
      <div className="Joke-text">{text}</div>
      <div className="Joke-smiley">
        <i className={getEmoji()} />
      </div>
    </div>
  );
}

export default Joke;
