<img align="right" width="100" height="100" src="https://cdn.pixabay.com/photo/2018/05/15/20/47/microphone-3404243_960_720.png" >
# Liri Bot  
_coursework8-liri-node-app_  
Vanderbilt Coding Boot Camp - Coursework8 - Liri Node.JS App  

- - -

## Purpose  
Liri's purpose is to provide users up-to-date information about their favorite music and movies, as well as, provide concert information for a particular artist or group.

- - -

## Installation  
1. Clone this repo to your local machine.  

   ```$ git clone https://github.com/TerrenceMM2/coursework8-liri-node-app.git```  

2. Run `npm install` to install the application's dependencies.  

   ```$ npm install```  

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

- - -

## Instructions  
  
To use liri, type `node liri` from the application's home directory and an accompanying command.  
Currently, Liri understands the following commands:  
* `spotify-this-song`  
* `movie-this`  
* `concert-this`  
* `do-what-it-says`  
* `help`  

#### `spotify-this-song`  
Will return the top search on Spotify.  

Ex. ```$ node liri spotify-this-song Dance or Die```  
  
![Liri searching for "Dance or Die" by Starcadian on Spotify](../media/node_liri_spotify.gif?raw=true)

If you are looking for a song by a specific artist (for example, "One More Time" by Daft Punk, not "One More Time" by Britney Spears), include the artist's name.  

Ex. ```$ node liri spotify-this-song One More Time Daft Punk```  
  
![Liri searching for "One More Time" by Daft Punk on Spotify](../media/node_liri_spotify_artist.gif?raw=true)

#### `movie-this`
Will return the top search on IMDB and its relevant stats (such as name, data of release, actors, plot summary, etc.).  

Ex. ```$ node liri movie-this The Matrix```  
  
![Liri searching for "The Matrix" on IMDB](../media/node_liri_movie.gif?raw=true)

#### `concert-this`
Will return upcoming concerts from Bands in Town.  

Ex. ```$ node liri concert-this Deadmau5```
  
![Liri searching for Deadmau5 concerts on Bands in Town](../media/node_liri_concert.gif?raw=true)

#### `do-what-it-says`
Allows you to save storage a command and search. You must edit the `random.txt` file and include your command and search parameter. For example:
  
```movie-this,Cars```  

Ex. ```$ node liri do-what-it-says```
  
![Liri executing "do-what-it-says" command](../media/node_liri_do.gif?raw=true)

#### `help`
Will return the available commands and their correct syntax.  

Ex. ```$ node liri help```
  
![Liri showing the list of available commands](../media/node_liri_help.gif?raw=true)

#### Other
If no command is given, you will be prompted to choose what media type you want to search for and the search parameter.  

Ex. ```$ node liri```
  
![Liri asking questions](../media/node_liri.gif?raw=true)
  
- - -

### Contribute  

To get started ...

**Step 1**

- **Option 1** - 🍴 Fork this repo!

- **Option 2** - 👯 Clone this repo to your local machine using `https://github.com/TerrenceMM2/coursework8-liri-node-app.git`

**Step 2** - **HACK AWAY!** 🔨🔨🔨

**Step 3** - 🔃 Create a new pull request using [https://github.com/TerrenceMM2/coursework8-liri-node-app/compare](https://github.com/TerrenceMM2/coursework8-liri-node-app/compare)

- - -

### Built With
1. [node](https://nodejs.org/en/)
2. [axios](https://www.npmjs.com/package/axios)  
3. [moment](https://www.npmjs.com/package/moment)
4. [dotenv](https://www.npmjs.com/package/dotenv)
5. [inquirer](https://www.npmjs.com/package/inquirer)
6. [console.table](https://www.npmjs.com/package/console.table)
7. [node-spotify-api](https://www.npmjs.com/package/node-spotify-api)

- - -

### Authors
* **Terrence Mahnken** - [LinkedIn](https://www.linkedin.com/in/terrencemahnken/) | [Twitter](https://twitter.com/TerrenceMahnken)