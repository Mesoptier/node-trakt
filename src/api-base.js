import request from "superagent-bluebird-promise";
import { resolve as resolveUrl } from "url";
import { path as buildPath, clone, assertParams, rename, normalize } from "./util";

export class ApiBase {

  constructor({ baseUrl, modifier }) {
    this.baseUrl = baseUrl;
    this.modifier = modifier;
  }

  _request(method, path, params, modifier) {
    let url = resolveUrl(this.baseUrl, buildPath(path, params));
    return request(method, url)
      .use(this.modifier)
      .use(modifier)
    .promise()
      .catch(console.error)
      .then(res => res.body);
  }

  _get(path, params) {
    return this._request("get", path, params, (req) => {
      req.query(params);
    });
  }

  static _installMethods(methods) {
    for (let name of Object.keys(methods)) {
      let method = methods[name];

      // Build short-hand methods
      if (typeof method != "function")
        method = this._buildMethod(method);

      Object.defineProperty(this.prototype, name, {
        value: function (params) { return method.call(this, clone(params)); }
      });
    }
  }

  static _buildMethod(options) {
    return function (params) {
      if (options.required)
        assertParams.apply(null, [params, ...options.required]);
      if (options.normalize)
        options.normalize.forEach(key => normalize(params, key));
      if (options.rename)
        Object.keys(options.rename).forEach(oldKey => rename(params, oldKey, options.rename[oldKey]));

      return this["_" + options.method].call(this, options.path, params);
    };
  }

}