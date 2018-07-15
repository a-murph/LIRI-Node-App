# LIRI

This was created as homework for Week 10 of the Rutgers Coding Bootcamp.

LIRI stands for "Language Interpretation and Recognition Interface". It is a command-line Node.js program that interacts with several web APIs to return information to the user. LIRI takes 4 commands:

* `my-tweets`
* `spotify-this-song`
* `movie-this`
* `do-what-it-says`

**The `my-tweets` and `spotify-this-song` commands require valid Twitter API keys and Spotify API keys, respectively. These should be placed in a .env file in the program's root directory.**

## `my-tweets`

The `my-tweets` command takes no arguments.

Example:
> `node liri.js my-tweets`

When called, LIRI will display the 20 most recent tweets by the account linked to the provided Twitter API key, along with the date that each tweet was posted.

## `spotify-this-song`

The `spotify-this-song` command takes one argument: `song-name`. `song-name` is a String and should be entered surrounded by quotation marks.

Example:
> `node liri.js spotify-this-song "3rd measurement in c"`

When called, LIRI will search Spotify for songs matching the query. It will then return the following information about the top result:

* Song name
* Artist(s)
* Album Name
* Preview Link (if available)

If `song-name` is not provided, LIRI will by default search for "With Any Sort of Certainty", a song by Streetlight Manifesto.

## `movie-this`

The `movie-this` command takes one argument: `movie-title`. `movie-title` is a String and should be entered surrounded by quotation marks.

Example:
> `node liri.js movie-this "princess mononoke"`

When called, LIRI will search OMDB for movies matching the query. It will then return the following information about the top result:

* Movie title
* Release Year
* IMDB and Rotten Tomatoes Ratings
* Country of Origin
* Original Language
* Plot Synopsis
* Actors

If `movie-title` is not provided, LIRI will by default search for the Beatles movie "Yellow Submarine".

## `do-what-it-says`

The `do-what-it-says` command takes no arguments.

Example:
> `node liri.js do-what-it-says`

When called, LIRI will look for a file in its root directory called `random.txt` and read its contents. `random.txt` should contain one of the other three LIRI commands in plain text, with arguments separated by commas. `song-name` and `movie-title` arguments do not need to be surrounded by quotation marks.

Example of `random.txt`:
> spotify-this-song,Day of the Baphomets

________________________________________________

## Modules Used

LIRI makes use of several NPM modules:

* [Twitter](https://www.npmjs.com/package/twitter)
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
* [Request](https://www.npmjs.com/package/request)
* [DotEnv](https://www.npmjs.com/package/dotenv)
