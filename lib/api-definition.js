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
    "general": { params: [] },
    "get": { auth: false },
    "post": { auth: true }
}

api.account = {
    "create": { type: "POST", auth: false }, // Dev
    "settings": { type: "POST" },
    "test": { type: "POST", auth: false }
};

api.movie = {
    "cancelcheckin": { type: "POST" }, // Dev
    "cancelwatching": { type: "POST", params: [ arg] }, // Dev
    "checkin": { type: "POST", params: [arg("imdb_id", true), arg("tmdb_id", true), arg("title"), arg("year"), arg("duration", true), arg("venue_id", true), arg("venue_name", true), arg("share", true), arg("message", true), arg("app_version"), arg("app_date")] }, // Dev
    "comments": { type: "GET", params: [arg("title"), arg("type", true)] },
    "scrobble": { type: "POST", params: [arg("imdb_id", true), arg("tmdb_id", true), arg("title"), arg("year"), arg("duration"), arg("progress"), arg("plugin_version"), arg("media_center_version"), arg("media_center_date") ] }, // Dev
    "seen": { type: "POST", params: [arg("movies")] },
    "library": { type: "POST", params: [arg("movies")] },
    "related": { type: "GET", params: [arg("title"), arg("hidewatched", true)] },
    "summary": { type: "GET", params: [arg("title")] },
    "summaries": { type: "GET", params: [arg("title"), arg("extended", true)] },
    "unlibrary": { type: "POST", params: [arg("movies")] },
    "unseen": { type: "POST", params: [arg("movies")] },
    "unwatchlist": { type: "POST", params: [arg("movies")] },
    "scrobble": { type: "POST", params: [arg("imdb_id", true), arg("tmdb_id", true), arg("title"), arg("year"), arg("duration"), arg("progress"), arg("plugin_version"), arg("media_center_version"), arg("media_center_date") ] }, // Dev
    "watchingnow": { type: "GET", params: [arg("title")] },
    "watchlist": { type: "POST", params: [arg("movies")] }
};

// Apply defaults
_.each(api, function(methods){
    _.each(methods, function(method){
        _.defaults(method, (method.type == "GET" ?
                defaults.get : defaults.post), defaults.general);
    });
});