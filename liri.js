require("dotenv").config();

var fs = require("fs");
var cTable = require('console.table');
var keys = require("./keys.js");
var Spotify = require('./node_modules/node-spotify-api');
var axios = require("./node_modules/axios");
var moment = require("./node_modules/moment");

var spotify = new Spotify(keys.spotify);
var bandsKey = process.env.BANDS_KEY;
var omdbKey = process.env.OMDB_KEY;

// LIRI Commands: concert-this, spotify-this-song, movie-this, do-what-it-says
var command = process.argv[2];
var processArgs = process.argv;

var search = "";
var querySearchItem = "";

for (var i = 3; i < processArgs.length; i++) {
    if (i > 3 && i < processArgs.length) {
        search = search + " " + processArgs[i];
    } else {
        search += processArgs[i];
    };
};

for (var i = 3; i < processArgs.length; i++) {
    if (i > 3 && i < processArgs.length) {
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

// OMDB API Info: http://www.omdbapi.com
// Axios API Info: https://www.npmjs.com/package/axios
function searchImdb(str) {
    console.log("You've searched for " + str + " using IMDB.");
    axios.get("http://www.omdbapi.com/?t=" + search + "&apikey=" + omdbKey).then(function (response) {
        fs.writeFile("omdb_output.json", JSON.stringify(response.data), function (err) {
            if (err) {
                return console.log(err);
            }
        });

        if (response.data.Error) {
            console.log(response.data.Error);
        };

        // NPM Console.Table - https://www.npmjs.com/package/console.table
        var values = [
            ["Categories", "Movie Infomation"],
            ["Title", response.data.Title],
            ["Release Year", moment(response.data.Released, "DD MMM YYYY").format("YYYY")],
            ["IMDB Rating", response.data.imdbRating],
            ["Rotten Tomatoes Rating", response.data.Ratings[1].Value],
            ["Country Produced", response.data.Country],
            ["Movie Language", response.data.Language],
            ["Plot Summary", response.data.Plot],
            ["Starring", response.data.Actors]
        ];

        console.table(values[0], values.slice(1));
    })
}

// Bands in Town API Info: https://www.artists.bandsintown.com/bandsintown-api
// Axios API Info: https://www.npmjs.com/package/axios
function searchConcerts(str) {
    console.log("You've searched for " + str + " using Bands in Town");
    axios.get("http://rest.bandsintown.com/artists/" + search + "/events?app_id=" + bandsKey).then(function (response) {
        fs.writeFile("bands_output.json", JSON.stringify(response.data), function (err) {
            if (err) {
                return console.log(err);
            }
        });

        if (response.data) {
            console.log("Sorry, but it doesn't look like this artist has any upcoming events.")
        };

        for (var j = 0; j < response.data.length; j++) {
            var eventNum = j + 1;
            console.log("------------- Upcoming Event #" + eventNum + " -------------");
            console.log("Venue Name: " + response.data[j].venue.name);
            console.log("Venue Location: " + response.data[j].venue.city + "," + response.data[j].venue.region, response.data[j].venue.country);
            console.log("Event Date: " + moment(response.data[j].datetime).format("MM/DD/YYYY"));
        }
        // console.log(response);
    }).catch(function (err) {
        console.log(err);
    });
}

function doIt() {
    console.log("Your wish is my command");
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        var array = data.split(",");

        command = array[0];
        search = array[1];

        searchSpotify(search);
    });
}

// Spotify API Info: https://www.npmjs.com/package/node-spotify-api
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
            searchSpotify("The Sign Ace of Base");
        });
};