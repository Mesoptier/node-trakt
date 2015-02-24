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

  showSummary: { method: "get", path: "/shows/:id", required: ["id"] },

  showAliases: { method: "get", path: "/shows/:id/aliases", required: ["id"] },

  showTranslations: { method: "get", path: "/shows/:id/translations/:language", required: ["id"] },

  showComments: { method: "get", path: "/shows/:id/comments", required: ["id"] },

  showPeople: { method: "get", path: "/shows/:id/people", required: ["id"] },

  showRatings: { method: "get", path: "/shows/:id/ratings", required: ["id"] },

  showRelated: { method: "get", path: "/shows/:id/related", required: ["id"] }

};