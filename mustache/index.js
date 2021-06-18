import parseTemplateToTokens from "./parseTemplateToTokens";

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

    console.log(tokens);
  },
};
