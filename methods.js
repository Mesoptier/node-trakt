import { path, assertParams, rename, normalize } from "./util";

export default {
  search(params) {
    try {
      assertParams(params, "query");
      normalize(params, "type");
    } catch (err) {
      assertParams(params, "id", "type");
      rename(params, "type", "id_type");
    }
    return this._get("/search", params);
  },

  showSummary(params) {
    assertParams(params, "id");
    return this._get(path("/shows/:id", params), params);
  },

  showAliases(params) {
    assertParams(params, "id");
    return this._get(path("/shows/:id/aliases", params), params);
  },

  showTranslations(params) {
    assertParams(params, "id");
    return this._get(path("/shows/:id/translations/:language", params), params);
  },

  showComments(params) {
    assertParams(params, "id");
    return this._get(path("/shows/:id/comments", params), params);
  },

  showPeople(params) {
    assertParams(params, "id");
    return this._get(path("/shows/:id/people", params), params);
  },

  showRatings(params) {
    assertParams(params, "id");
    return this._get(path("/shows/:id/ratings", params), params);
  },

  showRelated(params) {
    assertParams(params, "id");
    return this._get(path("/shows/:id/related", params), params);
  }
};