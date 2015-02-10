var Trakt = require("../trakt");

var apiKey = process.env.TRAKT_API_KEY;
var api = new Trakt(apiKey);

api.search("house of cards", "show")
  .then(function (data) {
    console.log("Found %d shows", data.length);
    return data;
  })
  .map(function (item) {
    var id = item.show.ids.slug;
    return api.showSummary(id, "full");
  })
  .each(function (show) {
    console.log("");
    console.log("%s", show.title);
    console.log("| Year: %d", show.year);
    console.log("| Network: %s", show.network);
    console.log("| Status: %s", show.status);
  });