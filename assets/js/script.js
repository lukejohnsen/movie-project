var searchBtn = document.querySelector("#movie-searchBtn");
var previousSearchEl = document.getElementById("previous-search")
var userMovies = getMovieFromStorage();
var similarMovieDetails = document.getElementById("similar-movie-details");

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

            similarMovieDetails.innerHTML = "";

            for (let i = 0; i < data.Similar.Results.length; i++) {

                var omdbKey = "d9d0cc4d";
                var similarMovieData = "http://www.omdbapi.com/?t=" + data.Similar.Results[i].Name + "&apikey=" + omdbKey;

                fetch(similarMovieData)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data)

                        var similarMovieContainer = document.createElement("div")
                        similarMovieContainer.setAttribute("class", "card");


                        var similarMovieTitle = document.createElement("p");
                        similarMovieTitle.setAttribute("class", "is-size-5 has-text-weight-bold");
                        similarMovieTitle.setAttribute("class", "card-header-title is-size-5 is-centered has-text-white");
                        similarMovieTitle.textContent = data.Title;
                        similarMovieContainer.append(similarMovieTitle);

                        var similarMoviePlot = document.createElement("p");

                        similarMoviePlot.innerHTML = "<span class='has-text-weight-bold'>Plot: </span>" + data.Plot;
                        similarMoviePlot.setAttribute("class", "card-content has-text-centered has-text-white");
                        similarMovieContainer.append(similarMoviePlot);

                        var similarIMDBRating = document.createElement("p");
                        similarIMDBRating.innerHTML = "<span class='has-text-weight-bold'>IMDB: </span>" + data.Ratings[0].Value;
                        similarIMDBRating.setAttribute("class", "card-content has-text-centered has-text-white");
                        similarMovieContainer.append(similarIMDBRating);

                        var similarRTRating = document.createElement("p");
                        similarRTRating.innerHTML = "<span class='has-text-weight-bold'>Rotten Tomatoes: </span>" + data.Ratings[1].Value;
                        similarRTRating.setAttribute("class", "card-content has-text-centered has-text-white");
                        similarMovieContainer.append(similarRTRating);

                        var similarMoviePoster = document.createElement("img");
                        similarMoviePoster.setAttribute("class", "card-image");
                        similarMoviePoster.setAttribute("src", data.Poster);
                        similarMovieContainer.append(similarMoviePoster);

                        similarMovieDetails.append(similarMovieContainer);
                    })
            }
        });
};

function getMovieFromStorage() {
    return JSON.parse(localStorage.getItem("movies")) || [];
};

function addMovieToStorage() {
    localStorage.setItem("movies", JSON.stringify(userMovies));
};

function generatePriorMovie() {
    previousSearchEl.innerHTML = "";
    userMovies = getMovieFromStorage();

    for (var i = 0; i < userMovies.length; i++) {
        var movieButton = document.createElement("button");
        movieButton.setAttribute("class", "button is-primary is-focused mr-2");
        movieButton.textContent = userMovies[i];
        movieButton.setAttribute("data-movie", userMovies[i]);

        movieButton.addEventListener("click", function (event) {

            var movie = event.target.getAttribute("data-movie");
            omdbApi(movie);

        });

        previousSearchEl.appendChild(movieButton);
    }
};


searchBtn.addEventListener("click", function (event) {
    
    event.preventDefault();

    var userMovie = document.getElementById("user-input").value;
    userMovies.push(userMovie);

    addMovieToStorage();
    generatePriorMovie();


    if (userMovie === "") {
        document.getElementById("warning").textContent = "Please enter a movie!";
    } else {

        document.getElementById("warning").textContent = "";

        console.log(userMovie);

        omdbApi(userMovie);
    }
});

generatePriorMovie();