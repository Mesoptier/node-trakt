import { assertParams, rename, normalize } from "./util";

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
    return this._get("/shows/:id", params);
  },

  showAliases(params) {
    assertParams(params, "id");
    return this._get("/shows/:id/aliases", params);
  },

  showTranslations(params) {
    assertParams(params, "id");
    return this._get("/shows/:id/translations/:language", params);
  },

  showComments(params) {
    assertParams(params, "id");
    return this._get("/shows/:id/comments", params);
  },

  showPeople(params) {
    assertParams(params, "id");
    return this._get("/shows/:id/people", params);
  },

  showRatings(params) {
    assertParams(params, "id");
    return this._get("/shows/:id/ratings", params);
  },

  showRelated(params) {
    assertParams(params, "id");
    return this._get("/shows/:id/related", params);
  }
};