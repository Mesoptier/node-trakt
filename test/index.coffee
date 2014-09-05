assert = require "assert"
nock = require "nock"
trakt = require "../src/trakt.coffee"

describe "node-trakt", ->
  httpScope = nock "http://api.trakt.tv"
  httpsScope = nock "https://api.trakt.tv"

  apikey = "00000000000000000000000000000000"

  trakt.init
    apikey: apikey
    username: "test"
    password: "test"
    secure: false

  describe "request", ->

    describe "with {secure: false}", ->

      it "should use http protocol", (done) ->
        httpScope
          .get "/server/time.json/#{apikey}"
          .reply 200, ->
            assert.ok true
            done()

        trakt.serverTime()


    describe "with {secure: true}", ->
      before -> trakt.options.secure = true
      after -> trakt.options.secure = false

      it "should use https protocol", (done) ->
        httpsScope
          .get "/server/time.json/#{apikey}"
          .reply 200, ->
            assert.ok true
            done()

        trakt.serverTime()
