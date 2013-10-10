var trakt = require("../node-trakt")("db5ecf5582f5886f910a5a9cdc2b5065");

trakt.login("tube-test", "tube-test", function(loggedIn){
    console.log("Login: ", loggedIn);

    trakt.movieSummary({ title: "the-lone-ranger-2013" }, function(err, data){
        if (err)
            throw err;
        console.log(data);
    });
});