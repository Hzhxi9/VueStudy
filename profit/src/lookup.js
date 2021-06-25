export default function lookup(o, key) {
  if (~key.indexOf(".") && key !== ".") {
    let keys = key.split("."),
      temp = o;

    for (let i = 0, len = keys.length; i < len; i++) {
      temp = temp[keys[i]];
    }
    return temp;
  }

  return o[key];
}
