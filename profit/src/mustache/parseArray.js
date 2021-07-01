import lookup from "./lookup";
import renderTemplate from "./renderTemplate";

export default function parseArray(data, token) {
  const v = lookup(data, token[1]);
  let result = "";
  for (let i = 0, len = v.length; i < len; i++) {
    result += renderTemplate(token[2], { ...v[i], ".": v[i] });
  }
  return result;
}
