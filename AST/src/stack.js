/**智能重复(smartRepeat) */

function smartRepeat(templateString) {
  /**指针 */
  let idx = 0;

  /**存放数字的栈 */
  let numberStack = [];

  /**存放字符串的栈 */
  let stringStack = [];

  /**长度 */
  const len = templateString.length;

  /**剩余部分 */
  let rest = templateString;

  while (idx < len - 1) {
    /**剩余部分 */
    rest = templateString.substring(idx);

    if (/^\d+\[/.test(rest)) {
      /**判断当前剩余是不是以数字和方括号开头 */

      /**得到这个数字 */
      let times = Number(rest.match(/^(\d+)\[/)[1]);

      /**
       * 指针后移,times这个数字是多少位就后移多少位加一位
       * 加一是为了跳过[
       */
      idx += times.toString().length + 1;

      /**数字压栈 */
      numberStack.push(times);

      /**字符串压栈 */
      stringStack.push("");
    } else if (/^\w+\]/.test(rest)) {
      /**
       * 判断当前剩余是不是以字母与和方括号开头
       * 如果这个字符是字母， 那么此时就把栈顶这项改为这个字母
       **/
      let word = rest.match(/^(\w+)\]/)[1];

      stringStack[stringStack.length - 1] = word;

      /**指针后移,word这个词是多少位就后移多少位 */
      idx += word.length;
    } else if (rest[0] === "]") {
      /**如果这个字符是]， */

      /**1. 那么就将numberStack弹栈， */
      let times = numberStack.pop();

      /**2. stringStack弹栈 */
      let word = stringStack.pop();

      /**3. 把字符栈的新栈顶的元素重复刚刚弹出的那个字符串指定次数拼接到新栈顶上 */
      stringStack[stringStack.length - 1] += word.repeat(times);

      idx++;
    }
  }
  /**
   * while结束之后，numberStack和stringStack肯定害剩余一项。
   * 返回stringStack中剩余这一项，重复numberStack剩下的这一项的次数， 组成字符串
   * 如果剩的个数不对，那就是用户的问题，方括号没有闭合
   **/
  return stringStack[0].repeat(numberStack[0]);
}

const template = "3[2[abc]2[d]]";

console.log(smartRepeat(template));
