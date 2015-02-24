import { Trakt } from "../src/trakt";

var apiKey = process.env.TRAKT_API_KEY;
var api = new Trakt(apiKey);

api.showsPopular()
  .then(console.log);