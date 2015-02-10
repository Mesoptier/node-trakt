module.exports = {
  search: function (query, type) {
    var options = { qs: { query: query } };
    if (type) options.qs.type = type;
    return this.get("/search", options);
  }
};