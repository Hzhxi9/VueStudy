/**
 * 让tokens数组变为dom字符串
 */

export default function renderTemplate(tokens, data) {
  /**结果 */
  let result = "";

  for (let i = 0, len = tokens.length; i < len; i++) {
    let token = tokens[i];

    /**判断类型 */
    if (token[0] === "text") {
      result += token[1];
    } else if (token[0] === "name") {
      /**
       * 需要处理对象内部嵌套属性 
       * 不能识别 类似mmm[a.b.c]
       **/
      result += data[token[1]];
    } else if (token[0] === " #") {
      /**#标记的tokens，需要递归处理它的下标为2的小数组 */
    }
  }

  console.log(result);
}
