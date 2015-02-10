var restler = require("restler");
var methods = require("./methods");

function constructor(apiKey) {
  this.defaults.headers = {
    "Content-type": "application/json",
    "trakt-api-key": apiKey,
    "trakt-api-version": 2
  };
}

var defaults = {
  baseURL: "https://api-v2launch.trakt.tv",
  parser: false
};

var Trakt = restler.service(constructor, defaults, methods);

var oldGet = Trakt.prototype.get;
Trakt.prototype.get = function () {
  var req = oldGet.apply(this, arguments);

  var oldEmit = req.emit;

  req.emit = function (name) {
    console.log(name);
    oldEmit.apply(this, arguments);
  };

  return req;
};

module.exports = Trakt;