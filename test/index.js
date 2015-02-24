import { Trakt } from "../trakt";

var apiKey = process.env.TRAKT_API_KEY;
var api = new Trakt(apiKey);

api.search({ query: "castle", type: "show" })
  .map((item) => {
    return api.showSummary({ id: item.show.ids.trakt });
  })
  .map((show) => {
    console.log(show);
  });