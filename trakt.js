var request = require("request-promise");
var util = require("./util");
var extend = util.extend;

// TODO: Support pagination
// TODO: Support extended info
// TODO: Support authentication

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

Trakt.prototype.request = function (path, options) {
  var o = {
    url: this.baseUrl + path
  };
  extend(o, this.defaults);
  extend(o, options);

  return request(o);
};

Trakt.prototype.get = function (path, qs, options) {
  var o = { method: "get" };
  extend(o, { qs: qs });
  extend(o, options);
  return this.request(path, o);
};

// Add the API methods
extend(Trakt.prototype, require("./methods"));

module.exports = Trakt;