import Scanner from "./Scanner";
import nestTokens from "./nestTokens";

/**
 * 将模板字符串变为tokens数组
 *
 * @param {string} template 模板字符串
 * @returns
 */
export default function parseTemplateToTokens(template) {
  const tokens = [];

  /**实例化扫描器，构造时候传入模板字符串，针对模板字符串进行处理 */
  const scanner = new Scanner(template);

  let words;
  /**当scanner没有到头 */
  while (!scanner.eos()) {
    /**收集开始标记之前出现的文字 */
    words = scanner.scamUtil("{{");

    /**保存 */
    tokens.push(["text", words]);

    /**跳过{{ */
    scanner.scan("{{");

    /**收集开始标记之前出现的文字 */
    words = scanner.scamUtil("}}");
    /**保存 */
    if (words !== "") {
      /**需要判断多维数组的时候 */
      if (words.startsWith("#")) {
        tokens.push(["#", words.substring(1)]);
      } else if (words.startsWith("/")) {
        tokens.push(["/", words.substring(1)]);
      } else {
        tokens.push(["text", words]);
      }

      // tokens.push(["name", words]);
    }

    /**跳过}} */
    scanner.scan("}}");
  }

  return nestTokens(tokens);
}
