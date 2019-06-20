require('dotenv').config()

var axios = require("axios");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var fs = require("fs");
var moment = require("moment");

// Spotify search

spotify = new Spotify(keys.spotify);

var getArtistName = function(artist){
    return artist.name;
}

var getSpotify = function(songName){
spotify.search({
    type: "track",
    query: songName,
}, function(err,data){
    if (err){
        console.log("Error occurred: " + err);
        return console.log(err)
    }

    var songs = data.tracks.items;
    for(var i = 0; i < songs.length; i++){
        console.log(i);
        console.log('artist(s): ' + songs[i].artists.map(getArtistName));
        console.log('Song name: '+ songs[i].name);
        console.log('Album: ' + songs[i].album.name);
        console.log('Preview songs: ' + songs[i].preview_url);
        console.log('----------------------');
    }
    })};
    // ------------------------->

    // Movie search
var getMovie = function(movieName){
    var divider = "\n------------------------------------------------------------\n\n";
        var URL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        axios.get(URL).then(function(response){
        // if (!error && Response.statusCode == 200){
            var jsonData = response.data;
            // console.log(jsonData);

            var showData = [
                'Title: ' + jsonData.Title,
                'Year: ' + jsonData.Year,
                'Rated: ' + jsonData.Rated,
                'IMDB Rating: ' + jsonData.imdbRating,
                'Language: ' + jsonData.Language,
                'Plot: ' + jsonData.Plot,
                'Actors: ' + jsonData.Actors
                ].join("\n\n");

        fs.appendFile("log.txt", showData + divider, function(err) {
            if (err) throw err;
            console.log(showData);
        });
    });
};
    // -------------------------->

    // Band search
var getBand = function(bandName){
    var divider = "\n------------------------------------------------------------\n\n";
    var URL = "https://rest.bandsintown.com/artists/" + bandName + "?app_id=codingbootcamp";
        axios.get(URL).then(function(response){
        
            var jsonData = response.data;

            var showData = [
                'City: ' + jsonData.venue.city + ", " + jsonData.venue.country,
                'Venue: ' + jsonData.venue.name,
                console.log("* Date of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"))
                // 'Date of the event: ' + moment(jsonData.datetime).format('MM/DD/YYYY')
                ].join("\n\n");
    
                console.log(showData);
        fs.appendFile("log.txt", showData + divider, function(err) {
        if (err) throw err;
        console.log(showData);
    });
})};

var userPick = function(caseData,functionData){
    switch(caseData){
        case 'spotify-song':
            getSpotify(functionData);
            break;
        case 'movie-this':
            getMovie(functionData);
            break;
        case 'band-this':
            getBand(functionData);
            break;
        default:
            console.log("LIRI does not understand user command");
    };
}

var run = function(){
    userPick(process.argv[2],process.argv[3]);
}

run(process.argv[2],process.argv[3]);
