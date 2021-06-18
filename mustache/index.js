import Scanner from "./Scanner";

/**
 * 创建全局变量 TemplateEngine
 */
window.TemplateEngine = {
  render(template, data) {
    /**实例化扫描器，构造时候传入模板字符串，针对模板字符串进行处理 */
    const scanner = new Scanner(template);
    let words;
    /**当scanner没有到头 */
    while (!scanner.eos()) {
      words = scanner.scamUtil("{{");
      console.log(words);
      scanner.scan("{{");

      words = scanner.scamUtil("}}");
      console.log(words);
      scanner.scan("}}");
    }
  },
};
