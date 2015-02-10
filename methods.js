var util = require("./util");
var path = util.path;

module.exports = {
  search: function (query, type) {
    var qs = { query: query };
    if (type) qs.type = type;
    return this.get("/search", qs);
  },

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
  }
};