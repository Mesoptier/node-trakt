var trakt = require("./lib/trakt");

trakt.init("db5ecf5582f5886f910a5a9cdc2b5065");
 
    trakt.searchMovies({ query: 'V For Vendetta' }, function(err, data){
        if (err)
            throw err;
        console.log(data);
    }); 