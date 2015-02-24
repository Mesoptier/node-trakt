import request from "request-promise";
import { extend, clone } from "./util";

export class ApiBase {

  constructor({ baseUrl, defaults }) {
    this.baseUrl = baseUrl;
    this.defaults = defaults;
  }

  _request(path, options) {
    var o = {
      url: this.baseUrl + path
    };
    extend(o, this.defaults);
    extend(o, options);

    let req = request(o);
    return req.promise();
  }

  _get(path, qs, options) {
    var o = { method: "get" };
    extend(o, { qs: qs });
    extend(o, options);
    return this._request(path, o);
  }

  static _installMethods(methods) {
    for (let name of Object.keys(methods)) {
      Object.defineProperty(this.prototype, name, {
        value: function (params) { return methods[name].call(this, clone(params)); }
      });
    }
  }

}