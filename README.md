# Liri Bot  
_coursework8-liri-node-app_  
Vanderbilt Coding Boot Camp - Coursework8 - Liri Node.JS App  

## Purpose  
Liri's purpose is to provide users up-to-date information about their favorite music and movies, as well as, provide concert information for a particular artist or group.

## Installation  
1. Clone this repo to your local machine.  
2. Run `npm install` to install the application's dependencies.  
3. Obtain API Key's to the following applications:
   1. Spotify 🎧  
   2. OMDB 📽  
   3. Bands in Town 🎤  
4. Create an `.env` file in the application's home directory with the following information:  
```
# Spotify API keys

SPOTIFY_ID=<Your_Spotify_ID>
SPOTIFY_SECRET=<Your_Spotify_API_Key>

# Bands in Town API key
BANDS_KEY=<Your_BiT_API_Key>

# OMDB API key
OMDB_KEY=<Your_OMDB_API_Key>
```

## Instructions  
  
To use liri, type `node liri` and an accompanying command.  
Currently, Liri understands the following commands:  
* `spotify-this-song`  
* `movie-this`  
* `concert-this`  
* `do-what-it-says`  
* `help`  

#### `spotify-this-song`  
Will return the top search on Spotify.  
  
![Liri searching for "Dance or Die" by Starcadian on Spotify](../media/node_liri_spotify.gif?raw=true)

If you are looking for a song by a specific artist (for example, "One More Time" by Daft Punk, not "One More Time" by Britney Spears), include the artist's name.  
  
![Liri searching for "One More Time" by Daft Punk on Spotify](../media/node_liri_spotify_artist.gif?raw=true)

#### `movie-this`
Will return the top search on IMDB and its relevant stats (such as name, data of release, actors, plot summary, etc.).  
  
![Liri searching for "The Matrix" on IMDB](../media/node_liri_movie.gif?raw=true)

#### `concert-this`
Will return upcoming concerts from Bands in Town.  
  
![Liri searching for Deadmau5 concerts on Bands in Town](../media/node_liri_concert.gif?raw=true)

#### `do-what-it-says`
Allows you to save storage a command and search. You must edit the `random.txt` file and include your command and search parameter. For example:
  
```movie-this-,Cars```  
  
![Liri executing "do-what-it-says" command](../media/node_liri_do.gif?raw=true)

#### `help`
Will return the available commands and their correct syntax.  
  
![Liri showing the list of available commands](../media/node_liri_help.gif?raw=true)

#### Other
If no command is given, you will be prompted to choose what media type you want to search for and the search parameter.  
  
![Liri asking questions](../media/node_liri.gif?raw=true)

### Built With
1. [node](https://nodejs.org/en/)
2. [axios](https://www.npmjs.com/package/axios)  
3. [moment](https://www.npmjs.com/package/moment)
4. [dotenv](https://www.npmjs.com/package/dotenv)
5. [inquirer](https://www.npmjs.com/package/inquirer)
6. [console.table](https://www.npmjs.com/package/console.table)
7. [node-spotify-api](https://www.npmjs.com/package/node-spotify-api)