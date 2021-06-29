import parseAttrString from "./parseAttrString";

/**parse函数。主函数*/
export default function parse(template) {
  /** 指针 */
  let idx = 0;

  /**剩余部分 */
  let rest = "";

  /**开始标记正则 */
  const startRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/;

  /**结束标记正则 */
  const endRegExp = /^\<\/([a-z]+[1-6]?)\>/;

  /**抓取结束标记前的文字 */
  const wordRegExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/;

  /**存放标记的栈 */
  const tagStack = [];

  /**存放内容的栈 */
  const textStack = [{ children: [] }];

  while (idx < template.length - 1) {
    rest = template.substring(idx);

    if (startRegExp.test(rest)) {
      /**识别遍历到的这个字符串是不是开始标签 */
      let tag = rest.match(startRegExp)[1]; /**捕获标签内容 */

      let attrString = rest.match(startRegExp)[2]; /**捕获attr内容 */

      tagStack.push(tag); /**将开始标记推入栈中 */

      textStack.push({
        tag,
        children: [],
        attrs: parseAttrString(attrString),
      }); /**将空数组推入栈中 */

      console.log("检测到开始标记", tag);

      /**得到attr字符串的总长度 */
      const attrStringLen = attrString ? attrString.length : 0;

      /**指针移动标签长度加2再加attrString的长度，因为<>也占两位 */
      idx += tag.length + 2 + attrStringLen;
    } else if (endRegExp.test(rest)) {
      /**识别遍历到的这个字符是不是结束标签 */

      let tag = rest.match(endRegExp)[1]; /**捕获标签内容 */

      const pop_tag = tagStack.pop();

      /**此时tag一定是和tagStack的栈顶一致 */
      if (tag === pop_tag) {
        const pop_text = textStack.pop();
        // /**检查textStack是否有children数组， 如果没有就创建 */
        if (textStack.length > 0) {
          textStack[textStack.length - 1].children.push(pop_text);
        }
      } else {
        throw new Error(pop_tag + "标签没有封闭");
      }

      console.log("检测到结束标记", tag);

      /**指针移动标签长度加3，因为</>也占两位 */
      idx += tag.length + 3;
    } else if (wordRegExp.test(rest)) {
      /**识别遍历到的这个字符是不是文字， 并且不能为空*/
      let word = rest.match(wordRegExp)[1]; /**捕获标签内容 */

      /**看word是不是全是空 */
      if (!/^\s+$/.test(word)) {
        /**不是全是空 */
        textStack[textStack.length - 1].children.push({
          text: word,
          type: 3,
        }); /**改变此时textStack栈顶元素中*/

        console.log("检测到文字", word);
      }

      /**指针移动标签长度 */
      idx += word.length;
    } else {
      /**标签中的文字 */
      idx++;
    }
  }

  /**
   * 此时textStack就是我们之前默认放置的一项了
   * 此时要返回这一项的children即可
   **/
  return textStack[0].children[0];
}
