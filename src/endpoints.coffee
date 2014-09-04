module.exports =

movie:
  cancelcheckin:
    path: "movie/cancelcheckin/{apikey}"
    auth: true
    post: true

  cancelwatching:
    path: "movie/cancelwatching/{apikey}"
    auth: true
    post: true

  checkin:
    path: "movie/checkin/{apikey}"
    auth: true
    post: true

  comments:
    path: "movie/comments.json/{apikey}/{title}/{type}"

  scrobble:
    path: "movie/scrobble/{apikey}"
    auth: true
    post: true

  seen:
    path: "movie/seen/{apikey}"
    auth: true
    post: true

  library:
    path: "movie/library/{apikey}"
    auth: true
    post: true

  related:
    path: "movie/related.json/{apikey}/{title}/{hidewatched}"

  stats:
    path: "movie/stats.json/{apikey}/{title}"

  summary:
    path: "movie/summary.json/{apikey}/{title}"

  summaries:
    path: "movie/summaries.json/{apikey}/{title}/{extended}"

  unlibrary:
    path: "movie/unlibrary/{apikey}"
    auth: true
    post: true

  unseen:
    path: "movie/unseen/{apikey}"
    auth: true
    post: true

  unwatchlist:
    path: "movie/unwatchlist/{apikey}"
    auth: true
    post: true

  watching:
    path: "movie/watching/{apikey}"
    auth: true
    post: true

  watchingnow:
    path: "movie/watchingnow.format/{apikey}/{title}"

  watchlist:
    path: "movie/watchlist/{apikey}"
    auth: true
    post: true
