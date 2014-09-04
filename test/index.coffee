trakt = require "../src/trakt.coffee"

trakt.init
  apikey: "db5ecf5582f5886f910a5a9cdc2b5065"
  username: "tube-test"
  password: "tube-test"

trakt.movieComments { title: "tt1210819" }, (err, data) ->
  console.log err, data
