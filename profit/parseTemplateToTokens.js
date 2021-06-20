import Scanner from "./Scanner";

export default function parseTemplateToTokens(template) {
  const tokens = [],
    scanner = new Scanner(template);

  let words = "";

  while (!scanner.eos()) {
    words = scanner.scanUtil("{{");

    if (words !== "") {
      let isInLabel = false,
        _words = "";

      for (let i = 0, len = words.length; i < len; i++) {
        const word = words[i];
        if (word === "<") {
          isInLabel = true;
        } else if (word === ">") {
          isInLabel = false;
        }

        if (!/\s/.test(word)) {
          _words += word;
        } else {
          if (isInLabel) _words += " ";
        }
      }

      tokens.push(["text", _words1]);
    }

    scanner.scan("{{");

    words = scanner.scanUtil("}}");

    if (words !== "") {
      if (words.startsWith("#")) {
        tokens.push(["#", words.substring(1)]);
      } else if (words.startsWith("/")) {
        tokens.push(["/", words.substring(1)]);
      } else {
        tokens.push(["name", words]);
      }
    }
  }

  return tokens;
}
