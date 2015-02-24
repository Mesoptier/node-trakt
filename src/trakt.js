import request from "superagent-bluebird-promise";
import { resolve as resolveUrl } from "url";
import * as util from "./util";
import methods from "./methods";

// TODO: Authorization (OAuth / Media Center)

export class Trakt {

  constructor(apiKey) {
    this.baseUrl = "https://api-v2launch.trakt.tv";
    this.apiKey = apiKey;
  }

  _request(method, path, params) {
    let url = this._buildUrl(path, params);
    let req = request(method, url)
      .set("trakt-api-key", this.apiKey)
      .set("trakt-api-version", 2)
      .type("json");

    if (method == "get")
      req.query(params);

    return req.promise()
      .catch(console.error)
      .then(res => res.body);
  }

  _buildUrl(path, params) {
    return resolveUrl(this.baseUrl, this._buildPath(path, params));
  }

  _buildPath(path, params) {
    return path.replace(/(\/?):(\w+)(\/.*)?$/, (math, pre, key, path) =>
        params.hasOwnProperty(key)
          ? pre + util.del(params, key) + (path ? this._buildPath(path, params) : "")
          : ""
    );
  }

  static _installMethods(methods) {
    for (let name of Object.keys(methods)) {
      let method = methods[name];

      // Build shorthand methods
      if (typeof method != "function") {
        let options = method;
        method = function (params) {
          if (options.required)
            assertParams.apply(null, [params, ...options.required]);
          if (options.normalize)
            options.normalize.forEach(key => util.normalize(params, key));

          return this._request(options.method, options.path, params);
        };
      }

      Object.defineProperty(this.prototype, name, {
        value: function (params) { return method.call(this, util.clone(params)); }
      });
    }
  }

}

Trakt._installMethods(methods);