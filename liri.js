var fs = require("fs");

var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var client = new Twitter(keys);
var request = require("request");


var argument = process.argv[3];
var command = process.argv[2];

switch (command) {

    case "my-tweets":
        var params = {
            screen_name: 'TwinFimbres',
            count: 20
        };


        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                // console.log(tweets);
                for (var i = 0; i < tweets.length; i++) {
                    console.log(i + 1 + ":::" + tweets[i].created_at + ":::" + tweets[i].text);

                    // log to txt file, problem,callback is deprecated.
                    fs.appendFile("log.txt", "================");
                    fs.appendFile("log.txt", tweets[i].created_at + ":::" + tweets[i].text);

                    fs.appendFile("log.txt", "================");

                }
            } else {
                console.log(error);

            }
        });


        // });

        break;

    case "movie-this":
        // for omdb use inside of case statment

        var queryUrl = "http://www.omdbapi.com/?t=" + argument + "&y=&plot=short&apikey=40e9cece";

        request(queryUrl, function(error, response, body) {

            // If the request is successful
            if (!error && response.statusCode === 200) {

                var bodyObject = JSON.parse(body);
                // console.log(bodyObject);

                // Parse the body of the site and recover just the imdbRating
                // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                console.log("Movie Title: " + bodyObject.Title);
                console.log(bodyObject.Title + " release Year: " + bodyObject.Year);
                console.log("IMDB Rating: " + bodyObject.imdbRating);
                console.log("Country Produced In: " + bodyObject.Country);
                console.log("Language: " + bodyObject.Language);
                console.log("Plot: " + bodyObject.Plot);
                console.log("Actors: " + bodyObject.Actors);


                // logging text to files
                fs.appendFile("log.txt", "================");
                fs.appendFile("log.txt", "Movie Title: " + bodyObject.Title, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                });
                fs.appendFile("log.txt", bodyObject.Title + " release Year: " + bodyObject.Year);
                fs.appendFile("log.txt", "IMDB Rating: " + bodyObject.imdbRating);
                fs.appendFile("log.txt", "Country Produced In: " + bodyObject.Country);
                fs.appendFile("log.txt", "Language: " + bodyObject.Language);
                fs.appendFile("log.txt", "Plot: " + bodyObject.Plot);
                fs.appendFile("log.txt", "Actors: " + bodyObject.Actors);
                fs.appendFile("log.txt", "================");
                console.log("=============");
            }
            if (argument === "") {
                queryUrl = "Mr. Nobody";
            }

        });
        break;


    case "spotify-this-song":

        var spotify = new Spotify({
            id: "b092ca6cd6a24f65ba42eba0a295eadf",
            secret: "20592bde934548cbbdd1d3dc07120306"
        });

        spotify.search({
            type: 'track',
            query: argument
        }, function(err, data) {
            console.log(JSON.stringify((data)));
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("Spotify this =============");
            // calling artist to console
            console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
            console.log("Song: " +
                data.tracks.items[0].name);
            console.log("Spotify Preview URL: " + data.tracks.items[0].preview_url);
            console.log("Album Name: " + data.tracks.items[0].album.name);

            //log text to text file
            fs.appendFile("log.txt", "spotify-this=============")
            fs.appendFile("log.txt", "Artist(s): " + data.tracks.items[0].album.artist);
            fs.appendFile("log.txt", "Song: " +
                data.tracks.items[0].name);
            fs.appendFile("log.txt", "Spotify Preview URL: " + data.tracks.items[0].preview_url);
            fs.appendFile("log.txt", "Album Name: " + data.tracks.items[0].album.name);
            fs.appendFile("log.txt", "end of spotify-this=============");

            console.log("end of spotify list =============");
            // console.log(data);

            if (argument === "") {

                // trying to make a song play if argument is left empty.  I used an id but it's not working. 
                spotify.lookup({
                    type: 'track',
                    id: '3DYVWvPh3kGwPasp7yjahc'
                }, function(err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }
                    console.log("Artist(s): " + data.tracks.items[0].album.artist);
                    console.log("Song: " +
                        data.tracks.items[0].name);
                    console.log("Spotify Preview URL: " + data.tracks.items[0].preview_url);
                    console.log("Album Name: " + data.tracks.items[0].album.name);

                    console.log(data);
                });


            }

        });
        break;




    case "do-what-it-says":
        doWhatISay();

        break;



        // This block of code will read from the "random.txt" file.
        // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
        // The code will store the contents of the reading inside the variable "data"
        function doWhatISay() {

            fs.readFile("random.txt", "utf8", function(error, data) {

                // If the code experiences any errors it will log the error to the console.
                if (error) {
                    return console.log(error);
                }

                // We will then print the contents of data
                console.log(data);

                // Then split it by commas (to make it more readable)
                var dataArr = data.split(",");

                // We will then re-display the content as an array for later use.
                console.log(dataArr);

            });
        }
}