var request = require("request-promise");
var methods = require("./methods");
var util = require("./util");

module.exports = Trakt;

function Trakt(apiKey) {
  this.baseUrl = "https://api-v2launch.trakt.tv";
  this.defaults = {
    headers: {
      "Content-type": "application/json",
      "trakt-api-key": apiKey,
      "trakt-api-version": 2
    },
    json: true
  };
}

util.extend(Trakt.prototype, methods);

Trakt.prototype.request = function (path, options) {
  var o = {
    url: this.baseUrl + path
  };
  util.extend(o, this.defaults);
  util.extend(o, options);

  return request(o);
};

Trakt.prototype.get = function (path, qs, options) {
  var o = { method: "get" };
  util.extend(o, { qs: qs });
  util.extend(o, options);
  return this.request(path, o);
};