import React from "react";
import { useState, useEffect } from "react";

const Quotes = () => {
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState(null);
  const [foundTerm, setFoundTerm] = useState(null);

  function fetchRandom() {
    const url = "http://localhost:5000/lodash";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.quote);
        setAuthor(data.author);
      });
  }

  function findQuoteByTerm() {
    const url = "http://localhost:5000/quotes/search?term=" + foundTerm;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setQuote(data[0].quote);
          setAuthor(data[0].author);
        } else {
          setQuote("No result");
          setAuthor(null);
        }
      });
  }

  useEffect(() => {
    // fetchRandom();
  }, []);

  function onRandomClick() {
    fetchRandom();
  }
  return (
    <div>
      <div className="card bg-info">
        <div className="card-header title-quote">Get a famous quotes...</div>
        <div className="card-body">
          <p className="card-text quote-content">"{quote}"</p>
          <h5 className="card-title author-quote">{author}</h5>
        </div>
      </div>
      <div id="buttons-content">
        <div>
          <button
            onClick={onRandomClick}
            type="button"
            className="btn btn-info button-random"
          >
            Random Quote
          </button>
        </div>

        <div class="input-group mb-3 input-content">
          <input
            type="text"
            className="form-control"
            placeholder="Find a quote by term"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={foundTerm}
            onChange={(e) => setFoundTerm(e.target.value)}
          />
          <button
            onClick={findQuoteByTerm}
            className="btn btn-outline-secondary button-random-content"
            type="button"
            id="button-addon2"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
