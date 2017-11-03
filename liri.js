var request = require("request");
var prependFile = require('prepend-file');
var Twitter = require('twitter');
var twitterKeys = require('./keys');
var client = new Twitter (twitterKeys);

var Spotify = require('node-spotify-api');
var spotifyKeys = require('./spotifyKeys');
var spotify = new Spotify(spotifyKeys);

var fs = require('fs');

// Grab the movieName which will always be the third node arg0ument.
var category = process.argv[2];
var songMovieName = process.argv[3];
var userSearch = '\n' + category + "; " + songMovieName + "; Time of Search: " + Date();
// console.log ("User Search: ", userSearch);
prependFile("log.txt", userSearch);

if (category === "do-what-it-says") {
	doWhatItSays();
};



if (category === "my-tweets"){
	var params = {
		screen_name: 'MonkeyBall7',
		count: 20
	};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  	if (!error) {
	    // console.log(tweets);
		    for (var i=0; i<tweets.length; i++){
		    	tweets[i].text;
		    	console.log(tweets[i].text);
		    	console.log('---------------');
		    }
	  	}
	});
}


if (category === "spotify-this-song") {
	var song = process.argv[3] || "The Sign Ace of Base"
	// console.log(song)
	spotify.search({ type: 'track', query: song }, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  			}

		console.log('Artist:', data.tracks.items[0].artists[0].name);
		console.log('Song: ', data.tracks.items[0].name); 
		console.log('Album: ', data.tracks.items[0].album.name);
		console.log('30 Second Preview of Song: ', data.tracks.items[0].preview_url);  
		console.log('---------------');
	
	});
}

if (category === "movie-this"){

	var movieName = process.argv[3] || 'Mr. Nobody' ;

		// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

		request(queryUrl, function(error, response, body) {
			var titleUndefined = JSON.parse(body).Title
		  // If the request is successful
		  if ((!error && response.statusCode === 200) && (titleUndefined !== undefined)) {

		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("IMDB Rating: " + JSON.parse(body).Rated);
		    console.log("Rotten Tomato Rating: " + JSON.parse(body).Ratings[1].Value);
		    console.log("Country Movie was Produced in: " + JSON.parse(body).Country);
		    console.log("Language of the Movie: " + JSON.parse(body).Language);
		    console.log("Plot of the Movie: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);
  		}	else {
  			console.log("That is not a name of a movie");
  		}
  
});

}

// if (category === "do-what-it-says") {
function doWhatItSays() {
	// Asynchronously read the file random.txt. Throw error if file does not exist 
	fs.readFile('./random.txt', (error, data) => {
		if (error) {
    		return console.log('Error occurred: ' + error);
  			}
			// Data is an buffer. Conver to string and split on the comma to create an array
			var randomTxt = data.toString().split(',');
			var command = randomTxt[0];
			var song1 = randomTxt[1];

			spotify.search({ type: 'track', query: song1 }, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  			}

		console.log('Artist:', data.tracks.items[0].artists[0].name);
		console.log('Song: ', data.tracks.items[0].name); 
		console.log('Album: ', data.tracks.items[0].album.name);
		console.log('30 Second Preview of Song: ', data.tracks.items[0].preview_url);  
		console.log('---------------');
	
		});
	});
}

// var UserSearch = function(name, location) {
//     this.name = name;
//     this.location = location;
// }
