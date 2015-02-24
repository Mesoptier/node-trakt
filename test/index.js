import { Trakt } from "../src/trakt";

var apiKey = process.env.TRAKT_API_KEY;
var api = new Trakt(apiKey);

api.search({ query: "house", type: "show" })
  .map((item) => {
    return api.showSummary({ id: item.show.ids.trakt, extended: "full" });
  })
  .map((show) => {
    console.log(show);
  });