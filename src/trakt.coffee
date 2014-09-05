_ = require "lodash"
url = require "url"
request = require "request"

trakt = module.exports =

  # Default options
  options:
    secure: true
    hostname: "api.trakt.tv"
    basepath: "/"


  # Initiates the wrapper
  init: (options) ->
    # Validate API key
    if not /^[a-z0-9]{32}$/.test options.apikey
      throw new Error "Invalid API key"

    _.extend @options, options


  # Makes requests to the API server
  request: ({path, post, auth}, params, callback) ->
    # Handle optional params
    if !_.isFunction callback && _.isFunction params
      callback = params
      params = null

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
      url:
        protocol: if @options.secure then "https" else "http"
        hostname: @options.hostname
        pathname: @options.basepath + path

    # For POST requests, set body, otherwise set querystring
    if post
      options.method = "post"
      options.json = params
    else
      options.method = "get"
      options.qs = params

    options.url = url.format options.url

    request options, (err, res, body) =>
      return callback err if err
      callback null, JSON.parse(body) if body


# Load endpoints and create corresponding request methods
endpoints = require "./endpoints"

for name1, methods of endpoints
  for name2, options of methods
    # Construct method name based on path
    path = "#{name1}/#{name2}"
    name = path.split("/")
      .reduce (name = "", part) ->
        name + part[0].toUpperCase() + part[1..-1]

    options.path = "#{path}#{options.path}"
    trakt[name] = trakt.request.bind trakt, options
