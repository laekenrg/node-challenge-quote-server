const { response } = require("express");
const lodash = require("lodash");
const cors = require("cors");
// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();
app.use(cors());

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send(
    "Laeken's Quote Server!  Ask me for /quotes/random, or /quotes"
  );
});

//START OF YOUR CODE...

// --Mostrar todas las quotes.
app.get("/quotes", function (req, res) {
  res.send(quotes);
});

// --Mostrar una quote al azar.
app.get("/quotes/random", function (req, res) {
  const randomQuote = pickFromArray(quotes);
  res.send(randomQuote);
});

// --Filtrar quotes.
app.get("/quotes/search", function (req, res) {
  const searchTerm = req.query.term.toLowerCase();
  const searchQuotes = quotes.filter((quoteObj) => {
    // --Encontrar Quotes que contengan Xs palabra
    const quoteByWordToLowerCase = quoteObj.quote.toLowerCase();
    const findQuotebyWord = quoteByWordToLowerCase.includes(searchTerm);

    // --Encontrar Quotes con el mismo Author
    const quoteByAuthorToLowerCase = quoteObj.author.toLowerCase();
    const findQuotebyAuthor = quoteByAuthorToLowerCase.includes(searchTerm);

    return findQuotebyWord || findQuotebyAuthor;
  });

  res.send(searchQuotes);
});

// --Obtener una quote aleatoria mediante lodash.
app.get("/lodash", function (request, response) {
  response.send(lodash.sample(quotes));
});

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
let port = 5000;

app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
