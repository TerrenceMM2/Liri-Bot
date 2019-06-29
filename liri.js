require("dotenv").config();

var fs = require("fs");
var cTable = require('console.table');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var inquirer = require('inquirer');

var spotify = new Spotify(keys.spotify);
var bandsKey = process.env.BANDS_KEY;
var omdbKey = process.env.OMDB_KEY;

var command = process.argv[2];
var search = process.argv.slice(3).join(" ");

liriCommand(command);

// If the user only enters 'node liri', the user will be asked what he/she would like to search for: Movie, Song, or Concert. Additional prompts will follow.
function liriAsks() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to search for?",
        choices: ["Song", "Concert", "Movie"],
        name: "option"
    }).then(answers => {
        switch (answers.option) {
            case "Song":
                songSearch();
                break;
            case "Movie":
                movieSearch();
                break;
            case "Concert":
                concertSearch();
                break;
        }
    });
}

// If the user selects "Song", the user is prompted to enter a song and the Spotify API is queried
function songSearch() {
    inquirer.prompt({
        type: "input",
        message: "What song would you like to search for? (Ex. 'One More Time')",
        name: "song",
    }).then(answers => {
        search = answers.song;
        searchSpotify(search);
    });
};

// If the user selects "Movie", the user is prompted to enter a movie and the OMDB API is queried
function movieSearch() {
    inquirer.prompt({
        type: "input",
        message: "What movie would you like to search for? (Ex. 'The Matrix')",
        name: "movie",
    }).then(answers => {
        search = answers.movie;
        searchImdb(search);
    });
};

// If the user selects "Concert", the user is prompted to enter an artist and the Bands in Town API is queried
function concertSearch() {
    inquirer.prompt({
        type: "input",
        message: "What artist's events would you like to search for? (Ex. 'Daft Punk')",
        name: "concert",
    }).then(answers => {
        search = answers.concert;
        searchConcerts(search);
    });
};

// The initial command run when 'node liri' is executed.
// Based on the additional user input, another function is executed.
// If none of the parameters passed are recognized, liri alerts the user to add 'help' to understand what commands are available.
function liriCommand(command) {
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
            console.log("'concert-this' - Search Bands in Town concerts by artist/group.");
            console.log("'spotify-this-song' - Search Spotify for track information.");
            console.log("'movie-this' - Search IMDB for movie information.");
            console.log("'do-what-it-says' - Reads and passes command and value from random.txt file.");
            break;
        case undefined:
            liriAsks();
            break;
        default:
            console.log("I'm sorry. I don't understand. Search 'help' for more information.");
            break;
    }
};

// OMDB API Info: http://www.omdbapi.com
// Axios API Info: https://www.npmjs.com/package/axios
function searchImdb(str) {
    console.log("You've searched for " + str + " using OMDB.");
    axios.get("http://www.omdbapi.com/?t=" + str + "&apikey=" + omdbKey).then(function (response) {
        fs.writeFile("omdb_output.json", JSON.stringify(response.data, null, 2), function (err) {
            if (err) {
                return console.log(err);
            }
        });

        if (response.data.Error) {
            console.log(response.data.Error);
            searchImdb("Mr. Nobody")
        } else {
            var results = {
                title: response.data.Title,
                year: moment(response.data.Released, "DD MMM YYYY").format("YYYY"),
                imdbRating: response.data.imdbRating,
                rottenRating: response.data.Ratings[1].Value,
                countryProduced: response.data.Country,
                language: response.data.Language,
                plot: response.data.Plot,
                actors: response.data.Actors
            }
            // NPM Console.Table - https://www.npmjs.com/package/console.table
            var values = [
                ["Categories", "Movie Information"],
                ["Title", results.title],
                ["Release Year", results.year],
                ["IMDB Rating", results.imdbRating],
                ["Rotten Tomatoes Rating", results.rottenRating],
                ["Country Produced", results.countryProduced],
                ["Movie Language", results.language],
                ["Plot Summary", results.plot],
                ["Starring", results.actors]
            ];
            console.table(values[0], values.slice(1));
            writeToFile(results);
        };

    }).catch(function (error) {
        console.log(error);
    });
}

// Bands in Town API Info: https://www.artists.bandsintown.com/bandsintown-api
// Axios API Info: https://www.npmjs.com/package/axios
function searchConcerts(str) {
    console.log("You've searched for " + str + " using Bands in Town");
    axios.get("http://rest.bandsintown.com/artists/" + str + "/events?app_id=" + bandsKey).then(function (response) {
        fs.writeFile("bands_output.json", JSON.stringify(response.data, null, 2), function (err) {
            if (err) {
                return console.log(err);
            }
        });

        if (response.data[0] === undefined) {
            console.log("Sorry, but it doesn't look like this artist has any upcoming events. Please check back later.")
        } else {
            for (var j = 0; j < response.data.length; j++) {
                var eventNum = j + 1;
                var results = {
                    venueName: response.data[j].venue.name,
                    venueCity: response.data[j].venue.city,
                    venueRegion: response.data[j].venue.region,
                    venueCountry: response.data[j].venue.country,
                    eventDate: moment(response.data[j].datetime).format("MM/DD/YYYY"),
                };

                var values = [
                    ["", "Details"],
                    ["Venue Name", results.venueName],
                    ["Venue Location", results.venueCity + ", " + results.venueRegion + " " + results.venueCountry],
                    ["Event Date", results.eventDate]
                ];

                console.log("==================================== Upcoming Event #" + eventNum + " ====================================");
                console.table(values[0], values.slice(1));
                writeToFile(results);
            }
        };
    }).catch(function (err) {
        console.log(err);
    });
}

// Executed from the 'do-what-it-says" command
function doIt() {
    console.log("Your wish is my command");
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        };

        var array = data.split(",");

        command = array[0];
        search = array[1];

        switch (command) {
            case "spotify-this-song":
                searchSpotify(search);
                break;
            case "concert-this":
                searchConcerts(search);
                break;
            case "movie-this":
                searchImdb(search);
                break;
        };
    });
};

// Spotify API Info: https://www.npmjs.com/package/node-spotify-api
function searchSpotify(str) {
    spotify
        .search({
            type: "track",
            query: str,
            limit: 1
        })
        .then(function (response) {
            fs.writeFile("spotify_output.json", JSON.stringify(response, null, 2), function (err) {
                if (err) {
                    return console.log(err);
                }
            });

            var results = {
                artistName: response.tracks.items[0].artists[0].name,
                songName: response.tracks.items[0].name,
                url: response.tracks.items[0].external_urls.spotify,
                albumName: response.tracks.items[0].album.name
            };

            var values = [
                ["Categories", "Song Information"],
                ["Artist", results.artistName],
                ["Song", results.songName],
                ["Album", results.albumName],
                ["URL", results.url]
            ];

            console.table(values[0], values.slice(1));
            writeToFile(results);
        })
        .catch(function (err) {
            console.log(err);
            searchSpotify("The Sign Ace of Base");
        });
};

// Appends log.txt file with results object.
// Adds timestamp, the command executed, and the search value.
function writeToFile(obj) {
    var timestamp = moment().format('MM.DD.YY - HH:mm:ss');
    fs.appendFile("log.txt", "\r\n" + "[ " + timestamp + " ] : " + command + " : " + search + "\r\n" + JSON.stringify(obj, null, 2), function (err) {
        if (err) {
            return console.log(err);
        };
    });
};