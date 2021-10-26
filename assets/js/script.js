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
            movieTitle.append("Title: " + data.Title);

            var directorInfo = document.getElementById("director");
            directorInfo.innerHTML = "";
            directorInfo.append("Director(s): " + data.Director);

            var releaseDate = document.getElementById("release-date");
            releaseDate.innerHTML = "";
            releaseDate.append("Release Date: " + data.Released);

            var actorInfo = document.getElementById("actors");
            actorInfo.innerHTML = "";
            actorInfo.append("Actors: " + data.Actors);

            writerInfo = document.getElementById("writer");
            writerInfo.innerHTML = "";
            writerInfo.append("Writer(s): " + data.Writer);

            var plotInfo = document.getElementById("plot");
            plotInfo.innerHTML = "";
            plotInfo.append("Plot: " + data.Plot);

            var boxOffice = document.getElementById("box-office");
            boxOffice.innerHTML = "";
            boxOffice.append("Box Office: " + data.BoxOffice);

            var imdbRating = document.getElementById("imdb-rating");
            imdbRating.innerHTML = "";
            imdbRating.append("IMDB Rating: " + data.Ratings[0].Value);

            var moviePoster = document.getElementById("poster");
            moviePoster.setAttribute("src", data.Poster);

            

            // tasteDiveApi will take data from omdb fetch
            tasteDiveApi(data);
        });
};

var tasteDiveApi = function (movieData) {
    var cors_preface = 'https://uofa21cors.herokuapp.com/';
    var tasteDiveKey = "425881-GustavoH-440997PS"
    var tasteDiveUrl = cors_preface + "https://tastedive.com/api/similar?q=" + movieData.Title + "&type=movie" + "&k=" + tasteDiveKey;

    fetch(tasteDiveUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("tastedive", data);

            for (let i = 0; i < data.Similar.Results.length; i++) {
                var similarMovie = document.createElement("div");
                similarMovie.textContent = "Title: " + data.Similar.Results[i].Name;
    
                var movieList = document.getElementById("similar-titles");
                movieList.appendChild(similarMovie);
            }    

        });


};

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var userMovie = document.getElementById("user-input").value;

    console.log(userMovie);

    omdbApi(userMovie);
});
