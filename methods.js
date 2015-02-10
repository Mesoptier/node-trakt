var util = require("./util");
var path = util.path;

var search = {
  search: function (query, type) {
    var qs = { query: query };
    if (type) qs.type = type;
    return this.get("/search", qs);
  },

  searchId: function (type, id) {
    var qs = { id_type: type, id: id };
    return this.get("/search", qs);
  }
};

var shows = {
  showSummary: function (id, extended) {
    var qs = {};
    if (extended) qs.extended = extended;
    return this.get(path("/shows/%", id), qs);
  },

  showAliases: function (id) {
    return this.get(path("/shows/%/aliases", id));
  },

  showTranslations: function (id, language) {
    return this.get(path("/shows/%/translations/%", id, language));
  },

  showComments: function (id) {
    return this.get(path("/shows/%/comments", id));
  },

  showPeople: function (id) {
    return this.get(path("/shows/%/people", id));
  },

  showRatings: function (id) {
    return this.get(path("/shows/%/ratings", id));
  },

  showRelated: function (id) {
    return this.get(path("/shows/%/related", id));
  }
};

module.exports = {};
util.extend(module.exports, search);
util.extend(module.exports, shows);