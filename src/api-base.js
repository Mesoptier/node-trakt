import request from "superagent-bluebird-promise";
import { resolve as resolveUrl } from "url";
import { path as buildPath, extend, clone } from "./util";

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
      Object.defineProperty(this.prototype, name, {
        value: function (params) { return methods[name].call(this, clone(params)); }
      });
    }
  }

}