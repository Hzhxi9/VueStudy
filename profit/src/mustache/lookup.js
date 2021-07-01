export default function lookup(o, key) {
  if (~key.indexOf(".") && key !== ".") {
    const keys = key.split(".");
    let tmp = o;
    for (let i = 0, len = keys.length; i < len; i++) tmp = tmp[keys[i]];
    return tmp;
  }
  return o[key];
}
