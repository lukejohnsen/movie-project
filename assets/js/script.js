var searchBtn = document.querySelector("#movie-searchBtn");

var displayMovieInfo = function () {
    searchBtn.addEventListener("click", function () {
        var userMovie = document.getElementById("user-input").value;

        console.log(userMovie);

        omdbApi(userMovie);
    });
};

var omdbApi = function (userMovie) {
    var omdbKey = "d9d0cc4d";
    var omdbUrl = "http://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + userMovie;

    fetch(omdbUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
};

displayMovieInfo();