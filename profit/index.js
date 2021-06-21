import parseTemplateToTokens from "./parseTemplateToTokens";
import renderTemplate from "./renderTemplate";

window.TemplateEngine = {
  render(template, data) {
    const tokens = parseTemplateToTokens(template);

    const dom = renderTemplate(tokens, data);

    return dom;
  },
};
