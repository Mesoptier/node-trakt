import assert from "assert";

export function extend(destination, source) {
  for (let k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }
}

export function path(_path, params) {
  return _path.replace(/(\/?):(\w+)(\/.*)?$/, (math, pre, key, _path) =>
    params.hasOwnProperty(key)
      ? pre + _delete(params, key) + (_path ? path(_path, params) : "")
      : ""
  );
}

export function assertParams(params, ...required) {
  for (let key of required) {
    assert(params.hasOwnProperty(key), `param '${key}' is required`);
  }
}

export function rename(object, oldKey, newKey) {
  if (object.hasOwnProperty(oldKey)) {
    object[newKey] = _delete(object, oldKey);
  }
}

export function normalize(object, key) {
  if (object.hasOwnProperty(key)) {
    if (Array.isArray(object[key]))
      object[key] = object[key].join(",");
  }
}

function _delete(object, key) {
  let value = object[key];
  delete object[key];
  return value;
}

export function clone(object) {
  if (object == null || typeof object !== "object") return object;
  let copy = object.constructor();
  for (let key in object) {
    if (object.hasOwnProperty(key)) copy[key] = object[key];
  }
  return copy;
}