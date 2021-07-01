import parseTemplateToTokens from "./mustache/parseTemplateToTokens";
import renderTemplate from "./mustache/renderTemplate";

window.TemplateEngine = {
  render(template, data) {
    const tokens = parseTemplateToTokens(template);
    console.log(tokens);
    const dom = renderTemplate(tokens, data);
    return dom;
  },
};
