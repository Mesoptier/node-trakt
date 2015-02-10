module.exports = {
  search: function (query, type) {
    return this.get("/search", { query: { query: query, type: type } });
  }
};