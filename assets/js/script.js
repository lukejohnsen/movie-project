/*
Create local storage for user to save movie in list... 
*/

var searchBtn = document.querySelector("#movie-searchBtn");

var omdbApi = function (userMovie) {
    var omdbKey = "d9d0cc4d";
    var omdbUrl = "http://www.omdbapi.com/?t=" + userMovie + "&apikey=" + omdbKey;

    fetch(omdbUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("omdb", data);

            var movieTitle = document.getElementById("title");
            movieTitle.innerHTML = "";
            movieTitle.innerHTML = "<span class='has-text-weight-bold'>Title: </span>" + data.Title;

            var directorInfo = document.getElementById("director");
            directorInfo.innerHTML = "";
            directorInfo.innerHTML = "<span class='has-text-weight-bold'>Director(s): </span>" + data.Director;

            var releaseDate = document.getElementById("release-date");
            releaseDate.innerHTML = "";
            releaseDate.innerHTML = "<span class='has-text-weight-bold'>Release Date: </span>" + data.Released;

            var actorInfo = document.getElementById("actors");
            actorInfo.innerHTML = "";
            actorInfo.innerHTML = "<span class='has-text-weight-bold'>Starring: </span>" + data.Actors;

            writerInfo = document.getElementById("writer");
            writerInfo.innerHTML = "";
            writerInfo.innerHTML = "<span class='has-text-weight-bold'>Writers(s) </span>" + data.Writer;

            var plotInfo = document.getElementById("plot");
            plotInfo.innerHTML = "";
            plotInfo.innerHTML = "<span class='has-text-weight-bold'>Plot: </span>" + data.Plot;

            var boxOffice = document.getElementById("box-office");
            boxOffice.innerHTML = "";
            boxOffice.innerHTML = "<span class='has-text-weight-bold'>Box Office: </span>" + data.BoxOffice;

            var imdbRating = document.getElementById("imdb-rating");
            imdbRating.innerHTML = "";
            imdbRating.innerHTML = "<span class='has-text-weight-bold'>IMDB Rating: </span>" + data.Ratings[0].Value;

            var rtRating = document.getElementById("rt-rating");
            rtRating.innerHTML = "";
            rtRating.innerHTML = "<span class='has-text-weight-bold'>Rotten Tomatoes Rating: </span>" + data.Ratings[1].Value;

            var moviePoster = document.getElementById("poster");
            moviePoster.setAttribute("src", data.Poster);

            // tasteDiveApi will take data from omdb fetch
            tasteDiveApi(data);
        });
};

var tasteDiveApi = function (movieData) {
    var cors_preface = 'https://uofa21cors.herokuapp.com/';
    var tasteDiveKey = "425881-GustavoH-440997PS"
    var tasteDiveUrl = cors_preface + "https://tastedive.com/api/similar?q=" + movieData.Title + "&type=movie" + "&limit=10" + "&k=" + tasteDiveKey;

    fetch(tasteDiveUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("tastedive", data);

            for (let i = 0; i < data.Similar.Results.length; i++) {

                var omdbKey = "d9d0cc4d";
                var similarMovieData = "http://www.omdbapi.com/?t=" + data.Similar.Results[i].Name + "&apikey=" + omdbKey;

                fetch(similarMovieData)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data)

                        var similarMovieDetails = document.getElementById("similar-movie-details");

                        var similarMovieContainer = document.createElement("div")


                        var similarMovieTitle = document.createElement("p");
                        similarMovieTitle.setAttribute("class", "is-size-5"); 
                        similarMovieTitle.textContent = data.Title;
                        similarMovieContainer.append(similarMovieTitle);

                        var similarMoviePlot = document.createElement("p");
                        similarMoviePlot.textContent = data.Plot;
                        similarMovieContainer.append(similarMoviePlot);

                        var similarMoviePoster = document.createElement("img");
                        similarMoviePoster.setAttribute("src", data.Poster);
                        similarMovieContainer.append(similarMoviePoster);

                        var similarIMDBRating = document.createElement("p");
                        similarIMDBRating.textContent = data.Rating;
                        similarMovieContainer.append(similarIMDBRating);

                        similarMovieDetails.append(similarMovieContainer);
                    })
            }
        });
};

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var userMovie = document.getElementById("user-input").value;

    if (userMovie === "") {
        document.getElementById("warning").textContent = "Please enter a movie!";
    } else {

        document.getElementById("warning").textContent = "";

        console.log(userMovie);

        omdbApi(userMovie);
    }


});