import { path } from "./util";

export default {
  search(query, type) {
    let qs = { query: query };
    if (type) qs.type = type;
    return this._get("/search", qs);
  },

  searchId(type, id) {
    let qs = { id_type: type, id: id };
    return this._get("/search", qs);
  },

  showSummary(id, extended) {
    let qs = {};
    if (extended) qs.extended = extended;
    return this._get(path("/shows/%", id), qs);
  },

  showAliases(id) {
    return this._get(path("/shows/%/aliases", id));
  },

  showTranslations(id, language) {
    return this._get(path("/shows/%/translations/%", id, language));
  },

  showComments(id) {
    return this._get(path("/shows/%/comments", id));
  },

  showPeople(id) {
    return this._get(path("/shows/%/people", id));
  },

  showRatings(id) {
    return this._get(path("/shows/%/ratings", id));
  },

  showRelated(id) {
    return this._get(path("/shows/%/related", id));
  }
};