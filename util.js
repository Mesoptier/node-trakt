export function extend(destination, source) {
  for (let k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }
}

export function path(path) {
  let params = [], i;
  for (i = 1; i < arguments.length; i++)
    params[i - 1] = arguments[i];

  return pathReplace(path, params);
}

function pathReplace(path, params) {
  return path.replace(/(\/?)%(.*)$/g, (match, pre, path) => {
    return params.length && params[0] !== undefined
      ? pre + params.shift() + pathReplace(path, params)
      : "";
  });
}