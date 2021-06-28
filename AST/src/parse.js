/**parse函数。主函数*/
export default function parse(template) {
  /** 指针 */
  let idx = 0;

  /**剩余部分 */
  let rest = "";

  /**开始标记正则 */
  const startRegExp = /^\<([a-z]+[1-6]?)\>/;

  /**结束标记正则 */
  const endRegExp = /^\<\/([a-z]+[1-6]?)\>/;

  /**抓取结束标记前的文字 */
  const wordRegExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/;

  /**存放标记的栈 */
  const tagStack = [];

  /**存放内容的栈 */
  const textStack = [];

  while (idx <= template.length - 1) {
    rest = template.substring(idx);

    if (startRegExp.test(rest)) {
      /**识别遍历到的这个字符串是不是开始标签 */
      let tag = rest.match(startRegExp)[1]; /**捕获标签内容 */

      tagStack.push(tag); /**将开始标记推入栈中 */

      textStack.push([]); /**将空数组推入栈中 */

      console.log("检测到开始标记", tag);
      /**指针移动标签长度加2，因为<>也占两位 */
      idx += tag.length + 2;
      //   console.log(tagStack, textStack);
    } else if (endRegExp.test(rest)) {
      /**识别遍历到的这个字符是不是结束标签 */

      let tag = rest.match(endRegExp)[1]; /**捕获标签内容 */

      /**此时tag一定是和tagStack的栈顶一致 */
      if (tag === tagStack[tagStack.length - 1]) {
        tagStack.pop();
      } else {
        throw new Error(tagStack[tagStack.length - 1] + "标签没有封闭");
      }

      console.log("检测到结束标记", tag);

      /**指针移动标签长度加3，因为</>也占两位 */
      idx += tag.length + 3;
      //   console.log(tagStack, textStack);
    } else if (wordRegExp.test(rest)) {
      /**识别遍历到的这个字符是不是文字， 并且不能为空*/
      let word = rest.match(wordRegExp)[1]; /**捕获标签内容 */

      /**看word是不是全是空 */
      if (!/^\s+$/.test(word)) {
        /**不是全是空 */

        console.log("检测到文字", word);
      }

      /**指针移动标签长度 */
      idx += word.length;
    } else {
      /**标签中的文字 */
      idx++;
    }
  }
}
