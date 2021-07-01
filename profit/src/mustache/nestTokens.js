export default function nestTokens(tokens) {
  const nestedTokens = [],
    selections = [];

  let collections = nestedTokens;

  for (let i = 0, len = tokens.length; i < len; i++) {
    const token = tokens[i];

    switch (token[0]) {
      case "#":
        selections.push(token);
        collections.push(token);
        collections = token[2] = [];
        break;

      case "/":
        selections.pop();
        collections =
          selections.length > 0
            ? selections[selections.length - 1][2]
            : nestedTokens;
        break;

      default:
        collections.push(token);
        break;
    }
  }
  return nestedTokens;
}
