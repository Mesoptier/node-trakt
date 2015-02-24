import { assertParams, rename, normalize } from "./util";

export default {

  /* === SCROBBLE === */

  // TODO: scrobbleStart
  // TODO: scrobblePause
  // TODO: scrobbleStop

  /* === SEARCH === */

  search(params) {
    try {
      assertParams(params, "query");
      normalize(params, "type");
    } catch (err) {
      assertParams(params, "id", "id_type");
    }
    return this._request("get", "/search", params);
  },

  /* === SHOWS === */

  showsPopular: { method: "get", path: "/shows/popular" },

  showsTrending: { method: "get", path: "/shows/trending" },

  showsUpdates: { method: "get", path: "/shows/updated/:start_date", normalize: ["start_date"] },

  showSummary: { method: "get", path: "/shows/:id", required: ["id"] },

  showAliases: { method: "get", path: "/shows/:id/aliases", required: ["id"] },

  showTranslations: { method: "get", path: "/shows/:id/translations/:language", required: ["id"] },

  showComments: { method: "get", path: "/shows/:id/comments", required: ["id"] },

  // TODO: showCollectionProgress
  // TODO: showWatchedProgress

  showPeople: { method: "get", path: "/shows/:id/people", required: ["id"] },

  showRatings: { method: "get", path: "/shows/:id/ratings", required: ["id"] },

  showRelated: { method: "get", path: "/shows/:id/related", required: ["id"] },

  // TODO: showStats
  // TODO: showWatching

};