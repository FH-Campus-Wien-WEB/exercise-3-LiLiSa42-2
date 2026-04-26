const express = require('express');
const path = require('path');
const https = require('https');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const apiKey = "199c9473"
const app = express();

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, response => {
      let data = "";
      response.on("data", chunk => data += chunk);
      response.on("end", () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (error) {
          reject(error);
        }
      });
    }).on("error", reject);
  });
}

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short Film",
  "Sport",
  "Superhero",
  "Thriller",
  "War",
  "Western"
];

// Parse urlencoded bodies
app.use(bodyParser.json()); 

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

/* Task 1.2: Add a GET /genres endpoint:
   This endpoint returns the full genre list as defined in edit.html.
*/
app.get('/genres', function (req, res) {
  res.send(genres);
})

app.get('/movies', function (req, res) {
  let movies = Object.values(movieModel)
  
  // Filter by genre if provided
  const genre = req.query.genre;
  if (genre) {
    movies = movies.filter(movie => movie.Genres.includes(genre));
  }

  const promises = movies.map(function(movie) {
    return fetchJson(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`)
      .then(data => ({ ...movie, Poster: data.Poster || "N/A" }));
  });

  Promise.all(promises)
    .then(moviesWithPosters => {
      res.json(moviesWithPosters);
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
})

// Configure a 'get' endpoint for a specific movie
//Holt Filmdaten von movie-model.js anhand der imdbID, die in der URL übergeben wird, 
// und ergänzt sie um das Poster von der OMDB API, bevor sie als JSON zurückgegeben werden
app.get('/movies/:imdbID', function (req, res) {
  const movie = movieModel[req.params.imdbID];
  if (movie) {
    fetchJson(`https://www.omdbapi.com/?i=${req.params.imdbID}&apikey=${apiKey}`)
      .then(data => {
        const poster = data.Poster || "N/A";
        res.json({ ...movie, Poster: poster });
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(404);
  }
})

app.put('/movies/:imdbID', function(req, res) {

  const id = req.params.imdbID
  const exists = id in movieModel

  movieModel[req.params.imdbID] = req.body;
  
  if (!exists) {
    res.status(201)
    res.send(req.body)
  } else {
    res.sendStatus(200)
  }
  
})

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")


