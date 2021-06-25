import lookup from "./lookup";
import parseArray from "./parseArray";

export default function renderTemplate(tokens, data) {
  let result = "";

  for (let i = 0, len = tokens.length; i < len; i++) {
    const token = tokens[i];

    switch (token[0]) {
      case "text":
        result += token[1];
        break;
      case "name":
        result += lookup(data, token[1]);
        break;
      case "#":
        result += parseArray(token, data);
        break;
    }
  }

  return result;
}
