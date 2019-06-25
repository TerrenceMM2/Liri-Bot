require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

// LIRI Commands: concert-this, spotify-this-song, movie-this, do-what-it-says