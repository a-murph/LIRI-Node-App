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

			//append command to log file
			fs.appendFile("log.txt", command +"\n", function(err) {if(err) throw err;});

			client.get("/statuses/user_timeline.json", {count: 20}, function(error, tweets, response) {
				if (error){
					fs.appendFile("log.txt", error, function(err) {if(err) throw err;});
					throw error;
				}
				else {
					console.log("Your last 20 tweets:\n");
	
					//create string to hold all tweets for logging
					var logString = "";

					//iterates through tweets and displays their text and date
					for (var i = 0; i < tweets.length; i++) {
						console.log('"' +tweets[i].text +'"');
						console.log("Posted at: " +tweets[i].created_at +"\n");
						
						//add to log string
						logString += tweets[i].text +" | " +tweets[i].created_at +"\n";
					}

					//append logString to log
					fs.appendFile("log.txt", logString, function(err) {if(err) throw err;});
				}
			});
			break; //end switch-case
	
		case "spotify-this-song":
			//searches spotify for a song matching the query, and returns the top result
			
			//log command
			fs.appendFile("log.txt", command +"\n", function(err) {if(err) throw err;});

			//if user did not provide a song, default to "With Any Sort of Certainty" by Streetlight Manifesto
			if (!userQuery){
				userQuery = "With Any Sort of Certainty";

				//log that there was no userQuery
				fs.appendFile("log.txt", "no song name given: using default\n", function(err) {if(err) throw err;});
			} else {
				//log userQuery
				fs.appendFile("log.txt", userQuery +"\n", function(err) {if(err) throw err;});
			}
	
			spotify.search({type: "track", query: userQuery, limit: 1}, function(error, data) {
				if (error) {
					fs.appendFile("log.txt", error, function(err) {if(err) throw err;});
					throw error;
				}
				else {
					//simplification of variable names
					var song = data.tracks.items[0];

					//string to hold log info
					var logString = "";
					
					//if only 1 artist, display it
					if (song.artists.length == 1){
						console.log("Artist: " +song.artists[0].name);
						logString += song.artists[0].name +"\n";
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
						logString += artistList +"\n";
					}
	
					console.log("Title: " +song.name);
					console.log("Album: " +song.album.name);
					logString += "Title: " +song.name +"\nAlbum: " +song.album.name +"\n";
	
					//if preview_url is not null, display it
					if (song.preview_url) {
						console.log("Preview Link: " +song.preview_url);
						logString += "Preview Link: " +song.preview_url +"\n";
					} else {
						//if no preview_url, tell the user this
						console.log("Preview unavailable.");
						logString += "Preview unavailable.\n";
					}

					//append entire logString to log
					fs.appendFile("log.txt", logString, function(err) {if(err) throw err;});
				}
			});
			break; //end switch-case
	
		case "movie-this":
			//searches OMDB API for a movie title matching the query, and returns the top result
			
			//log command
			fs.appendFile("log.txt", command +"\n", function(err) {if(err) throw err;});

			//if user did not provide a title, default to The Beatles' "Yellow Submarine"
			if (!userQuery){
				userQuery = "Yellow Submarine";

				//log that there was no userQuery
				fs.appendFile("log.txt", "no movie name give, using default\n", function(err) {if(err) throw err;});
			} else {
				//log userQuery
				fs.appendFile("log.txt", userQuery +"\n", function(err) {if(err) throw err;});
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

				//log results
				fs.appendFile("log.txt",
					"Movie Title: " +body.Title +"\nRelease Year: " +body.Year +"\nIMDB Rating: " +body.Ratings[0].Value +"\nRotten Tomatoes Rating: " +body.Ratings[1].Value +"\nCountry of Origin: " +body.Country +"\nOriginal Language: " +body.Language +"\nPlot Synopsis: " +body.Plot +"\nActors: " +body.Actors +"\n",
						function(err) {if(err) throw err;});
			});
			break; //end switch-case
	
		case "do-what-it-says":
			//log command
			fs.appendFile("log.txt", command +"\n", function(err) {if(err) throw err;});

			var data = fs.readFileSync("random.txt", "utf-8")

			//log data
			fs.appendFile("log.txt", data +"\n", function(err) {if(err) throw err;});
			
			var dataArr = data.split(",");

			var newCommand = dataArr[0];
			var newQuery = dataArr[1];

			runProgram(newCommand, newQuery);
			break; //end switch-case
	}
}