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

            var releaseDate = document.getElementById("release-date");
            releaseDate.innerHTML = "";
            releaseDate.append("Release Date: " + data.Released);

            var actorInfo = document.getElementById("actors");
            actorInfo.innerHTML = "";
            actorInfo.append("Actors:" + data.Actors);

            var boxOffice = document.getElementById("box-office");
            boxOffice.innerHTML = "";
            boxOffice.append("Box Office:" + data.BoxOffice);

            var posterDisplay = document.getElementById("poster");
            posterDisplay.innerHTML = "";
            posterDisplay.append(data.Poster);

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

        });


};

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var userMovie = document.getElementById("user-input").value;

    console.log(userMovie);

    omdbApi(userMovie);
});
