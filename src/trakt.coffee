_ = require "lodash"
request = require "request"

trakt = module.exports =

  # Default options
  options:
    baseUrl: "http://api.trakt.tv/"


  # Initiates the wrapper
  init: (options) ->
    # Validate API key
    if not /^[a-z0-9]{32}$/.test options.apikey
      throw new Error "Invalid API key"

    _.extend @options, options


  # Makes requests to the API server
  request: ({path, post, auth}, params, callback) ->
    # Resolve the path
    path = path.replace "{apikey}", @options.apikey

    while match = path.match /{(.+?)}/
      key = match[1]
      if params[key]
        path = path.replace "{#{key}}", params[key]
        delete params[key]
      else
        path = path[0...match.index]

    # Prepare the request
    options =
      url: @options.baseUrl + path
      method: post ? "POST" : "GET"

    # For POST requests, set body, otherwise set querystring
    if post
      options.method = "POST"
      options.json = params
    else
      options.method = "GET"
      options.qs = params

    request options, callback


# Load endpoints and create corresponding request methods
endpoints = require "./endpoints"

for name1, methods of endpoints
  for name2, options of methods
    name = name1 + name2[0].toUpperCase() + name2[1..-1]
    trakt[name] = trakt.request.bind trakt, options
