# Liri Bot  
_coursework8-liri-node-app_  
Vanderbilt Coding Boot Camp - Coursework8 - Liri Node.JS App  

## Purpose  
Liri's is purpose is to provide users up-to-date information about their favorite music and movies, as well as, provide concert information a particular artist or group.

## Installation  
1. Clone this repo to your local machine.  
2. Run `npm install` to install the application's dependencies.  
3. Obtain API Key's to the following applications:
   1. Spotify 🎧  
   2. OMDB 📽  
   3. Bands in Town 🎤  
4. Create a `.env` in the application's home directory with the following information:  
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
Currently, Liri understand the following commands:  
* `spotify-this-song`  
* `movie-this`  
* `concert-this`  
* `do-what-it-says`  
* `help`  

#### `spotify-this-song`  
Will return the top search on Spotify. If you are looking for a song by a specific artist (for example, "One More Time" by Daft Punk, not "One More Time" by Britney Spears), include the artist's name.

#### `movie-this`
Will return the top search on IMDB and its relevant stats (such as name, data of release, actors, plot summary, etc.).  

#### `concert-this`
Will return upcoming concerts from Bands in Town.

#### `do-what-it-say`
Allows you to save storage a command and search. You must edit the `random.txt` file and include your command and search parameter. For example:
```spotify-this-song,Dance or Die```

#### `help`
Will return the available commands and their correct syntax.  

#### Other
If no command is given, you will be prompted to choose what media type you want to search for and the search parameter.

## Screenshots/GIFs  
Using Liri to search Spotify for _Digital Love_ by Daft Punk:  
![Liri searching for "Digital Love" on Spotify](https://github.com/TerrenceMM2/coursework8-liri-node-app/blob/master/images/liri_song_search.JPG)  

### Packages Used
1. axios [axios](https://www.npmjs.com/package/axios)  
2. moment [moment](https://www.npmjs.com/package/moment)
3. dotenv [dotenv](https://www.npmjs.com/package/dotenv)
4. inquirer [inquirer](https://www.npmjs.com/package/inquirer)
5. console.table [console.table](https://www.npmjs.com/package/console.table)
6. node-spotify-api [node-spotify-api](https://www.npmjs.com/package/node-spotify-api)