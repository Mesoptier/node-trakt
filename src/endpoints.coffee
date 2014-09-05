module.exports =

account:
  create:
    path: "/{apikey}"
    auth: true
    post: true

  settings:
    path: "/{apikey}"
    auth: true
    post: true

  test:
    path: "/{apikey}"
    auth: true
    post: true

activity:
  community:
    path: ".json/{apikey}/{types}/{actions}/{start_ts}/{end_ts}"

  episodes:
    path: ".json/{apikey}/{title}/{season}/{episode}/{actions}/{start_ts}/{end_ts}"

  friends:
    path: ".json/{apikey}/{types}/{actions}/{start_ts}/{end_ts}"
    auth: true

  movies:
    path: ".json/{apikey}/{title}/{actions}/{start_ts}/{end_ts}"

  seasons:
    path: ".json/{apikey}/{title}/{season}/{actions}/{start_ts}/{end_ts}"

  shows:
    path: ".json/{apikey}/{title}/{actions}/{start_ts}/{end_ts}"

  user:
    path: ".json/{apikey}/{username}/{types}/{actions}/{start_ts}/{end_ts}"

  "user/episodes":
    path: ".json/{apikey}/{username}/{title}/{season}/{episode}/{actions}/{start_ts}/{end_ts}"

  "user/movies":
    path: ".json/{apikey}/{username}/{title}/{actions}/{start_ts}/{end_ts}"

  "user/seasons":
    path: ".json/{apikey}/{username}/{title}/{season}/{actions}/{start_ts}/{end_ts}"

  "user/shows":
    path: ".json/{apikey}/{username}/{title}/{actions}/{start_ts}/{end_ts}"

movie:
  cancelcheckin:
    path: "/{apikey}"
    auth: true
    post: true

  cancelwatching:
    path: "/{apikey}"
    auth: true
    post: true

  checkin:
    path: "/{apikey}"
    auth: true
    post: true

  comments:
    path: ".json/{apikey}/{title}/{type}"

  scrobble:
    path: "/{apikey}"
    auth: true
    post: true

  seen:
    path: "/{apikey}"
    auth: true
    post: true

  library:
    path: "/{apikey}"
    auth: true
    post: true

  related:
    path: ".json/{apikey}/{title}/{hidewatched}"

  stats:
    path: ".json/{apikey}/{title}"

  summary:
    path: ".json/{apikey}/{title}"

  summaries:
    path: ".json/{apikey}/{title}/{extended}"

  unlibrary:
    path: "/{apikey}"
    auth: true
    post: true

  unseen:
    path: "/{apikey}"
    auth: true
    post: true

  unwatchlist:
    path: "/{apikey}"
    auth: true
    post: true

  watching:
    path: "/{apikey}"
    auth: true
    post: true

  watchingnow:
    path: ".json/{apikey}/{title}"

  watchlist:
    path: "/{apikey}"
    auth: true
    post: true
