var Trakt = require("../trakt");

var apiKey = process.env.TRAKT_API_KEY;
var api = new Trakt(apiKey);

api.search("house of cards", "show")
  .then(function (data) {
    console.log("Found", data.length, "shows");
    data.forEach(function (item) {
      console.log("-", item.show.title, "(" + item.show.year + ")");
    });
  });