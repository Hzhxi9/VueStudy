import parseTemplateToTokens from "./parseTemplateToTokens";
import renderTemplate from "./renderTemplate";

/**
 * 创建全局变量 TemplateEngine
 */
window.TemplateEngine = {
  /**渲染方法 */
  render(template, data) {
    /**
     * 调用parseTemplateToTokens函数，让模板字符串能够变成tokens数组
     */
    const tokens = parseTemplateToTokens(template);

    /**
     * 调用renderTemplate函数，让tokens数组变为dom字符串
     */
    return renderTemplate(tokens, data);
  },
};
