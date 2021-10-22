var searchBtn = document.querySelector("#movie-searchBtn");

var displayMovieInfo = function () {
};

var omdbApi = function (userMovie) {
    var omdbKey = "d9d0cc4d";
    var omdbUrl = "http://www.omdbapi.com/?t=" + userMovie + "&apikey=" + omdbKey;

    fetch(omdbUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

        var actorInfo = document.getElementById("actors");
        actorInfo.append(data.Actors);

        // will take data from omdb fetch
        tastediveApi(data);
        });
};

var tastediveApi = function (movieData) {
    var cors_preface = 'https://uofa21cors.herokuapp.com/';
    var tastediveKey = "425881-GustavoH-440997PS"
    var tastediveUrl = cors_preface + "https://tastedive.com/api/similar?q=" + movieData.Title + "&type=movie" + "&k=" +tastediveKey;

    fetch(tastediveUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("tastedive", data);

        });


};

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var userMovie = document.getElementById("user-input").value;

    console.log(userMovie);

    omdbApi(userMovie);
});

displayMovieInfo();