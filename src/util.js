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
    if (!params.hasOwnProperty(key))
      throw new Error(`param '${key}' is required`);
  }
}

export function rename(object, oldKey, newKey) {
  if (object.hasOwnProperty(oldKey)) {
    object[newKey] = _delete(object, oldKey);
  }
}

export function normalize(object, key) {
  if (object.hasOwnProperty(key)) {
    let value = object[key];

    if (Array.isArray(value))
      value = value.join(",");
    else if (value instanceof Date)
      value = value.getUTCFullYear() + "-" + _pad(value.getUTCMonth() + 1, 2) + "-" + _pad(value.getUTCDate(), 2);

    object[key] = value;
  }
}

function _delete(object, key) {
  let value = object[key];
  delete object[key];
  return value;
}

function _pad(string, length) {
  string += "";
  while (string.length < length) {
    string = "0" + string;
  }
  return string;
}

export function clone(object) {
  if (object == null || typeof object !== "object") return object;
  let copy = object.constructor();
  for (let key in object) {
    if (object.hasOwnProperty(key)) copy[key] = object[key];
  }
  return copy;
}