var api = require("./api-definition"),
    http = require("http"),
    _ = require("underscore"),
    crypto = require("crypto");

var trakt = module.exports = {};

var _options = {};

/**
 * Init
 * @param  {String} apiKey
 */
trakt.init = function(apiKey){
    if (!apiKey)
        throw new Error("No API key provided");

    _options.apiKey = apiKey;
};

/**
 * Login to trakt.tv
 * @param  {String}   username
 * @param  {String}   password
 * @param  {Function} callback
 */
trakt.login = function(username, password, callback){
    // Set defaults
    _options.authConfirmed = false;
    _options.username = undefined;
    _options.password = undefined;

    // If the password is not a SHA1 hash (40 characters long)
    if (password.length !== 40){
        // Create the password hash
        var hash = crypto.createHash("sha1");
        hash.update(password);
        password = hash.digest("hex");
    }

    // Set the username and password
    _options.username = username;
    _options.password = password;

    // Test authorization
    trakt.accountTest(function(err, res){
        if (res.status == "success")
            _options.authConfirmed = true;

        callback(_options.authConfirmed);
    });
};

/**
 * Check if the user is logged in
 * @param  {Boolean} confirmed Whether the credentials have to be confirmed
 * @return {Boolean}
 */
trakt.isLoggedIn = function(confirmed){
    if (confirmed === undefined)
        confirmed = true;
    return _options.username && _options.password
        && (_options.authConfirmed || !confirmed);
};

// Create the API methods
(function createMethods(){
    var path, name;
    Object.keys(api).forEach(function(key){
        Object.keys(api[key]).forEach(function(key2){
            // Get path based on the keys
            path = key + "/" + key2;

            // Get method name based on the path
            name = path.replace(/\/(\w)/g, function(w){ 
                return w[1].toUpperCase();
            });

            // Create the method
            trakt[name] = request.bind(trakt, path, api[key][key2]);
        });
    });
})();

function request(path, apiOptions, a, b){
    var param, request, auth, reqOptions = {
        hostname: "api.trakt.tv",
        port: 80,
        method: apiOptions.type
    }, params, callback;

    // Params can be skipped for some methods
    if (_.isFunction(a)){
        params = {};
        callback = a;
    } else if (_.isFunction(b)){
        params = a;
        callback = b;
    }
    
    // Create the path
    path = "/" + path + (apiOptions.type == "GET" ? ".json/" : "/") + _options.apiKey;

    // Verify the parameters
    for (var i = 0; i < apiOptions.params.length; i++){
        param = apiOptions.params[i];

        // If the parameter is not optional and not provided
        if (!param.optional && (!params || params[param.name] === undefined))
            return callback(new Error("Parameter '" + param.name + "' is required"));

        // If this is a GET request, add the parameter to the path
        if (apiOptions.type == "GET" && (param = params[param.name]) !== undefined){
            // Join arrays
            if (_.isArray(param))
                param = param.join(",");
            path += "/" + param;
        }
    };

    // Set the path
    reqOptions.path = path;

    // Create authorization string
    if (_options.username && _options.password)
        reqOptions.auth = _options.username + ":" + _options.password;

    // Verify authorization
    if (apiOptions.auth && !_options.authConfirmed)
        return callback(new Error("Authorization required"));

    // Make the request
    request = http.request(reqOptions, function(res){
        var data = "";

        res.on("data", function(chunk){
            data += chunk;
        });

        res.on("end", function(){
            // Parse the data
            data = JSON.parse(data);

            if (callback)
                callback(null, data);
        });
    });

    request.on("error", function(err){
        if (callback)
            callback(err);
    });

    if (apiOptions.type == "POST")
        request.end(JSON.stringify(params));
    else
        request.end();
}