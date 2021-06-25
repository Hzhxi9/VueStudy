export default function nestTokens(tokens) {
  const nestedTokens = [],
    sections = [];

  let collector = nestedTokens;

  for (let i = 0, len = tokens.length; i < len; i++) {
    const token = tokens[i];

    switch (token[0]) {
      case "#":
        collector.push(token);
        sections.push(token);
        collector = token[2] = [];
        break;
      case "/":
        sections.pop();
        collector =
          sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens;
        break;
      default:
        collector.push(token);
        break;
    }
  }

  return nestedTokens;
}
