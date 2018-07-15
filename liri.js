require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

runProgram(process.argv[2], process.argv[3])

function runProgram(command, userQuery) {
	switch (command) {
		case "my-tweets":
			//calls Twitter API and returns last 20 tweets by linked account
			client.get("/statuses/user_timeline.json", {count: 20}, function(error, tweets, response) {
				if (error)
					throw error;
				else {
					console.log("Your last 20 tweets:\n");
	
					//iterates through tweets and displays their text and date
					for (var i = 0; i < tweets.length; i++) {
						console.log('"' +tweets[i].text +'"');
						console.log("Posted at: " +tweets[i].created_at +"\n");
					}
				}
			});
			break; //end switch-case
	
		case "spotify-this-song":
			//searches spotify for a song matching the query, and returns the top result
			
			//if user did not provide a song, default to "With Any Sort of Certainty" by Streetlight Manifesto
			if (!userQuery){
				userQuery = "With Any Sort of Certainty";
			}
	
			spotify.search({type: "track", query: userQuery, limit: 1}, function(error, data) {
				if (error)
					throw error;
				else {
					//simplification of variable names
					var song = data.tracks.items[0];
					
					//if only 1 artist, display it
					if (song.artists.length == 1){
						console.log("Artist: " +song.artists[0].name);
					} else {
						//if multiple artists, build string with entire list then display it
						var artistList = "Artists: ";
						for (var i = 0; i < song.artists.length; i++) {
							if (i == song.artists.length - 1)
								artistList += song.artists[i].name;
							else
								artistList += song.artists[i].name +", ";
						}
						console.log(artistList);
					}
	
					console.log("Title: " +song.name);
					console.log("Album: " +song.album.name);
	
					//if preview_url is not null, display it
					if (song.preview_url) {
						console.log("Preview Link: " +song.preview_url);
					} else {
						//if no preview_url, tell the user this
						console.log("Preview unavailable.");
					}
				}
			});
			break; //end switch-case
	
		case "movie-this":
			//searches OMDB API for a movie title matching the query, and returns the top result
			
			//if user did not provide a title, default to The Beatles' "Yellow Submarine"
			if (!userQuery){
				userQuery = "Yellow Submarine";
			}
	
			var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" +userQuery;
	
			request(queryUrl, function(error, response, body) {
				if (error)
					throw error;
	
				body = JSON.parse(body);
	
				console.log("Movie Title: " +body.Title);
				console.log("Release Year: " +body.Year);
				console.log("IMDB Rating: " +body.Ratings[0].Value);
				console.log("Rotten Tomatoes Rating: " +body.Ratings[1].Value);
				console.log("Country of Origin: " +body.Country);
				console.log("Original Language: " +body.Language);
				console.log("Plot Synopsis: " +body.Plot);
				console.log("Actors: " +body.Actors);
			});
			break; //end switch-case
	
		case "do-what-it-says":
			var data = fs.readFileSync("random.txt", "utf-8")
			var dataArr = data.split(",");
			
			var newCommand = dataArr[0];
			var newQuery = dataArr[1];

			runProgram(newCommand, newQuery);
			break; //end switch-case
	}
}