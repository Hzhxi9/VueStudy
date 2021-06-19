–import Scanner from "./Scanner";
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
    if (words !== "") {
      /**
       * 去掉空格，智能判断是普通文字的空格还是标签内的空格
       * 标签内的空格，不能去掉，不如class前面的空格不能去掉
       */
      let isInLabel = false;
      
      /**空白字符串 */
      let _words = '';

      for(let i= 0, len = words.length;i<len;i++){
        /**判断是否在标签内 */
        if(words[i] === '<'){
          isInLabel = true
        }else if(words[i] === '>'){
          isInLabel = true
        }

        /**如果当前这项不是空格，就拼接上 */
        if(!/\s/.test(words[i])){
          _words += words[i]
        }else{
           if(isInLabel) _words += ' ';
        }
      }


      tokens.push(["text", _words]);
    }

    /**跳过{{ */
    scanner.scan("{{");

    /**收集开始标记之前出现的文字 */
    words = scanner.scamUtil("}}");
    /**保存 */
    if (words !== "") {
      /**
       * 需要判断多维数组的时候
       * 判断words的首字符
       **/
      if (words.startsWith("#")) {
        tokens.push(["#", words.substring(1)]);
      } else if (words.startsWith("/")) {
        tokens.push(["/", words.substring(1)]);
      } else {
        tokens.push(["name", words]);
      }
    }

    /**跳过}} */
    scanner.scan("}}");
  }

  return nestTokens(tokens);
}
