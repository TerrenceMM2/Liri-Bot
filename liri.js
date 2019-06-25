require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('./node_modules/node-spotify-api');

var spotify = new Spotify(keys.spotify);

// LIRI Commands: concert-this, spotify-this-song, movie-this, do-what-it-says
var command = process.argv[2];
var processArgs = process.argv;

var search = "";
var querySearchItem = "";

for (var i = 2; i < processArgs.length; i++) {
    if (i > 2 && i < processArgs.length) {
        search = search + " " + processArgs[i];
    } else {
        search += processArgs[i];
    };
};

for (var i = 2; i < processArgs.length; i++) {
    if (i > 2 && i < processArgs.length) {
        querySearchItem = querySearchItem + "+" + processArgs[i];
    } else {
        querySearchItem += processArgs[i];
    };
};

switch (command) {
    case "concert-this":
        searchConcerts(search);
        break;
    case "spotify-this-song":
        searchSpotify(search);
        break;
    case "movie-this":
        searchImdb(search);
        break;
    case "do-what-it-says":
        doIt();
        break;
    case "help":
        console.log("==================================== AVAILABLE COMMANDS ====================================");
        console.log("'concert-this' - Search Band in Town concerts by artist/group.");
        console.log("'spotify-this-song' - Search Spotify for track information.");
        console.log("'movie-this' - Search IMDB for movie information.");
        console.log("'do-what-it-says' - Reads and passes command and value from random.txt file.");
        break;
    default:
        console.log("I'm sorry. I don't understand. Search 'help' for more information.");
        break;
}

function searchImdb(str) {
    console.log("You've searched for " + str + " using IMDB.");
}

function searchConcerts(str) {
    console.log("You've searched for " + str + " using Bands in Town");
}

function doIt() {
    console.log("Your wish is my command");
}

function searchSpotify(str) {
    spotify
        .search({
            type: "track",
            query: str,
            limit: 1
        })
        .then(function (response) {
            fs.writeFile("spotify_output.json", JSON.stringify(response), function (err) {
                if (err) {
                    return console.log(err);
                }
            });
            console.log(response.tracks.items[0].artists[0].name); // Artist
            console.log(response.tracks.items[0].name); // Song Title
            console.log(response.tracks.items[0].external_urls.spotify); // Song Link
            console.log(response.tracks.items[0].album.name); // Album Title
        })
        .catch(function (err) {
            console.log(err);
        });
};