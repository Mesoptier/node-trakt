var trakt = require("../node-trakt");

trakt.init("db5ecf5582f5886f910a5a9cdc2b5065");

trakt.login("tube-test", "tube-test", function(){
    trakt.movieSummaries({ title: "the-social-network-2010,tt1483013" }, function(err, data){
        if (err)
            throw err;
        console.log(data);
    });
});