var _ = require("underscore");

var api = module.exports = {};

// Creates a parameter definition
function arg(name, optional){
    if (optional === undefined)
        optional = false;
    return { name: name, optional: optional };
}

/**
 * Format of method definition
 * @property {String} type Type of request (POST or GET)
 * @property {Array} params The parameters of the method
 * @property {Boolean} auth Whether confirmed authorization is required
 */

var defaults = {
    "all": { params: [] },
    "get": { auth: false },
    "post": { auth: true }
}

api.account = {
    "create": { type: "POST", auth: false }, // Dev
    "settings": { type: "POST" },
    "test": { type: "POST", auth: false }
};

api.activity = {
    "community": { type: "GET", params: [arg("types", true), arg("actions", true), arg("start_ts", true), arg("end_ts", true)] },
    "episodes": { type: "GET", params: [arg("title"), arg("season"), arg("episode"), arg("actions", true), arg("start_ts", true), arg("end_ts", true)]},
    "friends": { type: "GET", params: [arg("types", true), arg("actions", true), arg("start_ts", true), arg("end_ts", true)], auth: true },
    "movies": { type: "GET", params: [arg("title"), arg("actions", true), arg("start_ts", true), arg("end_ts", true)] },
    "seasons": { type: "GET", params: [arg("title"), arg("season"), arg("actions", true), arg("start_ts", true), arg("end_ts", true)] },
    "shows": { type: "GET", params: [arg("title"), arg("actions", true), arg("start_ts", true), arg("end_ts", true)] },
    "user": { type: "GET", params: [arg("username"), arg("actions", true), arg("start_ts", true), arg("end_ts", true)] },
    "user/episodes": { type: "GET", params: [arg("username"), arg("title"), arg("season"), arg("episode"), arg("actions", true), arg("start_ts", true), arg("end_ts", true)] },
    "user/movies": { type: "GET", params: [arg("username"), arg("title"), arg("actions", true), arg("start_ts", true), arg("end_ts", true)] },
    "user/seasons": { type: "GET", params: [arg("username"), arg("title"), arg("season"), arg("actions", true), arg("start_ts", true), arg("end_ts", true)] },
    "user/shows": { type: "GET", params: [arg("username"), arg("title"), arg("actions", true), arg("start_ts", true), arg("end_ts", true)] }
};

api.calendar = {
    "premieres": { type: "GET", params: [arg("date", true), arg("days", true)] },
    "shows": { type: "GET", params: [arg("date", true), arg("days", true)] }
};

api.comment = {
    "episode": { type: "POST", params: [arg("tvdb_id", true), arg("imdb_id", true), arg("title", true), arg("year", true), arg("season"), arg("episode"), arg("comment"), arg("spoiler", true), arg("review", true)] },
    "movie": { type: "POST", params: [arg("imdb_id", true), arg("tmdb_id", true), arg("title", true), arg("year", true), arg("comment"), arg("spoiler", true), arg("review", true)] },
    "episode": { type: "POST", params: [arg("tvdb_id", true), arg("imdb_id", true), arg("title", true), arg("year", true), arg("comment"), arg("spoiler", true), arg("review", true)] }
};

api.genres = {
    "movies": { type: "GET" },
    "shows": { type: "GET" }
};

api.lists = {
    "add": { type: "POST", params: [arg("name"), arg("description", true), arg("privacy"), arg("show_numbers", true), arg("allow_shouts", true)] },
    "delete": { type: "POST", params: [arg("slug")] },
    "items/add": { type: "POST", params: [arg("slug"), arg("items")] },
    "items/delete": { type: "POST", params: [arg("slug"), arg("items")] },
    "update": { type: "POST", params: [arg("slug"), arg("name", true), arg("description", true), arg("privacy", true), arg("show_numbers", true), arg("allow_shouts", true)] }
};

api.movie = {
    "cancelcheckin": { type: "POST" }, // Dev
    "cancelwatching": { type: "POST" }, // Dev
    "checkin": { type: "POST", params: [arg("imdb_id", true), arg("tmdb_id", true), arg("title", true), arg("year", true), arg("duration", true), arg("venue_id", true), arg("venue_name", true), arg("share", true), arg("message", true), arg("app_version"), arg("app_date")] }, // Dev
    "comments": { type: "GET", params: [arg("title"), arg("type", true)] },
    "scrobble": { type: "POST", params: [arg("imdb_id", true), arg("tmdb_id", true), arg("title", true), arg("year", true), arg("duration"), arg("progress"), arg("plugin_version"), arg("media_center_version"), arg("media_center_date") ] }, // Dev
    "seen": { type: "POST", params: [arg("movies")] },
    "library": { type: "POST", params: [arg("movies")] },
    "related": { type: "GET", params: [arg("title"), arg("hidewatched", true)] },
    "summary": { type: "GET", params: [arg("title")] },
    "summaries": { type: "GET", params: [arg("title"), arg("extended", true)] },
    "unlibrary": { type: "POST", params: [arg("movies")] },
    "unseen": { type: "POST", params: [arg("movies")] },
    "unwatchlist": { type: "POST", params: [arg("movies")] },
    "watching": { type: "POST", params: [arg("imdb_id", true), arg("tmdb_id", true), arg("title"), arg("year"), arg("duration"), arg("progress"), arg("plugin_version"), arg("media_center_version"), arg("media_center_date") ] }, // Dev
    "watchingnow": { type: "GET", params: [arg("title")] },
    "watchlist": { type: "POST", params: [arg("movies")] }
};

api.movies = {
    "trending": { type: "GET" },
    "updated": { type: "GET", params: [arg("timestamp")] }
};

api.network = {
    "approve": { type: "POST", params: [arg("user"), arg("follow_back", true)] },
    "deny": { type: "POST", params: [arg("user")]  },
    "follow": { type: "POST", params: [arg("user")]  },
    "requests": { type: "POST" },
    "unfollow": { type: "POST", params: [arg("user")]  }
};

api.rate = {
    "episode": { type: "POST", params: [arg("tvdb_id", true), arg("imdb_id", true), arg("title", true), arg("year", true), arg("season"), arg("episode"), arg("rating")] },
    "episodes": { type: "POST", params: [arg("episodes")] },
    "movie": { type: "POST", params: [arg("imdb_id", true), arg("tmdb_id", true), arg("title", true), arg("year", true), arg("rating")] },
    "movies": { type: "POST", params: [arg("movies")] },
    "episode": { type: "POST", params: [arg("tvdb_id", true), arg("imdb_id", true), arg("title", true), arg("year", true), arg("rating")] },
    "episodes": { type: "POST", params: [arg("shows")] }
};

api.recommendations = {
    "movies": { type: "POST", params: [arg("genre", true), arg("start_year", true), arg("end_year", true), arg("hide_collected", true), arg("hide_watchlisted", true)] },
    "movies/dismiss": { type: "POST", params: [arg("imdb_id", true), arg("tmdb_id", true), arg("title", true), arg("year", true)] },
    "shows": { type: "POST", params: [arg("genre", true), arg("start_year", true), arg("end_year", true), arg("hide_collected", true), arg("hide_watchlisted", true)] },
    "shows/dismiss": { type: "POST", params: [arg("tvdb_id", true), arg("title", true), arg("year", true)] }
};

api.search = {
    "episodes": { type: "GET", params: [arg("query")] },
    "movies": { type: "GET", params: [arg("query")] },
    "people": { type: "GET", params: [arg("query")] },
    "shows": { type: "GET", params: [arg("query"), arg("limit", true), arg("seasons", true)] },
    "users": { type: "GET", params: [arg("query")] }
};

api.server = {
    "time": { type: "GET" }
};

api.show = {
    "cancelcheckin": { type: "POST" }, // Dev
    "cancelwatching": { type: "POST" }, // Dev
    "checkin": { type: "POST", params: [arg("tvdb_id", true), arg("title", true), arg("year", true), arg("season", true), arg("episode", true), arg("episode_tvdb_id", true), arg("duration", true), arg("venue_id", true), arg("venue_name", true), arg("share", true), arg("message", true), arg("app_version"), arg("app_date")] }, // Dev
    "comments": { type: "GET", params: [arg("title"), arg("type", true)] },
    "episode/comments": { type: "GET", params: [arg("title"), arg("season"), arg("episode"), arg("type", true)] },
    "episode/library": { type: "POST", params: [arg("imdb_id", true), arg("tvdb_id", true), arg("title", true), arg("year", true), arg("episodes")] },
    "episode/seen": { type: "POST", params: [arg("imdb_id", true), arg("tvdb_id", true), arg("title", true), arg("year", true), arg("episodes")] },
    "episode/summary": { type: "GET", params: [arg("title"), arg("season"), arg("episode")] },
    "episode/unlibrary": { type: "POST", params: [arg("imdb_id", true), arg("tvdb_id", true), arg("title", true), arg("year", true), arg("episodes")] },
    "episode/unseen": { type: "POST", params: [arg("imdb_id", true), arg("tvdb_id", true), arg("title", true), arg("year", true), arg("episodes")] },
    "episode/unwatchlist": { type: "POST", params: [arg("imdb_id", true), arg("tvdb_id", true), arg("title", true), arg("year", true), arg("episodes")] },
    "episode/watchingnow": { type: "GET", params: [arg("title"), arg("season"), arg("episode")] },
    "episode/watchlist": { type: "POST", params: [arg("imdb_id", true), arg("tvdb_id", true), arg("title", true), arg("year", true), arg("episodes")] },
    "library": { type: "POST", params: [arg("imdb_id", true), arg("tvdb_id", true), arg("title", true), arg("year", true)] },
    "related": { type: "GET", params: [arg("title"), arg("hidewatched", true)] },
    "scrobble": { type: "POST", params: [arg("tvdb_id", true), arg("title", true), arg("year", true), arg("season", true), arg("episode", true), arg("episode_tvdb_id", true), arg("duration"), arg("progress"), arg("plugin_version"), arg("media_center_version"), arg("media_center_date")] }, // Dev
    "season": { type: "GET", params: [arg("title"), arg("season")] },
    "season/library": { type: "POST", params: [arg("imdb_id", true), arg("tvdb_id", true), arg("title", true), arg("year", true), arg("season")] },
    "season/seen": { type: "POST", params: [arg("imdb_id", true), arg("tvdb_id", true), arg("title", true), arg("year", true), arg("season")] },
    "seasons": { type: "GET", params: [arg("title")] },
    "seen": { type: "POST", params: [arg("imdb_id", true), arg("tvdb_id", true), arg("title", true), arg("year", true)] },
    "summary": { type: "GET", params: [arg("title"), arg("extended", true)] },
    "summaries": { type: "GET", params: [arg("title"), arg("extended", true)] },
    "unlibrary": { type: "POST", params: [arg("imdb_id", true), arg("tvdb_id", true), arg("title", true), arg("year", true)] },
    "unwatchlist": { type: "POST", params: [arg("shows")] },
    "watching": { type: "POST", params: [arg("tvdb_id", true), arg("title", true), arg("year", true), arg("season", true), arg("episode", true), arg("episode_tvdb_id", true), arg("duration"), arg("progress"), arg("plugin_version"), arg("media_center_version"), arg("media_center_date")] }, // Dev
    "watchingnow": { type: "GET", params: [arg("title")] },
    "watchlist": { type: "POST", params: [arg("shows")] }
};

api.shows = {
    "trending": { type: "GET" },
    "updated": { type: "GET", params: [arg("timestamp")] }
}

api.user = {
    "calendar/shows": { type: "GET", params: [arg("username"), arg("date", true), arg("days", true)] },
    "lastactivity": { type: "GET", params: [arg("username")] },
    "library/movies/all": { type: "GET", params: [arg("username"), arg("extended", true)] },
    "library/movies/collection": { type: "GET", params: [arg("username"), arg("extended", true)] },
    "library/movies/watched": { type: "GET", params: [arg("username"), arg("extended", true)] },
    "library/shows/all": { type: "GET", params: [arg("username"), arg("extended", true)] },
    "library/shows/collection": { type: "GET", params: [arg("username"), arg("extended", true)] },
    "library/shows/watched": { type: "GET", params: [arg("username"), arg("extended", true)] },
    "list": { type: "GET", params: [arg("username"), arg("slug")] },
    "lists": { type: "GET", params: [arg("username")] },
    "network/followers": { type: "GET", params: [arg("username")] },
    "network/following": { type: "GET", params: [arg("username")] },
    "network/friends": { type: "GET", params: [arg("username")] },
    "profile": { type: "GET", params: [arg("username")] },
    "progress/collected": { type: "GET", params: [arg("username"), arg("title", true), arg("sort", true), arg("extended", true)] },
    "progress/watched": { type: "GET", params: [arg("username"), arg("title", true), arg("sort", true), arg("extended", true)] },
    "ratings/episodes": { type: "GET", params: [arg("username"), arg("rating", true), arg("extended", true)] },
    "ratings/movies": { type: "GET", params: [arg("username"), arg("rating", true), arg("extended", true)] },
    "ratings/shows": { type: "GET", params: [arg("username"), arg("rating", true), arg("extended", true)] },
    "watching": { type: "GET", params: [arg("username")] },
    "watchlist/episodes": { type: "GET", params: [arg("username")] },
    "watchlist/movies": { type: "GET", params: [arg("username")] },
    "watchlist/shows": { type: "GET", params: [arg("username")] }
};

// Apply defaults
_.each(api, function(methods){
    _.each(methods, function(method){
        _.defaults(method, (method.type == "GET" ?
                defaults.get : defaults.post), defaults.all);
    });
});