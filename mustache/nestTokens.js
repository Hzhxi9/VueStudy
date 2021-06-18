/**
 * 功能
 *  折叠tokens，将#和/之间的tokens能够整合起来，作为它的下标为2的值
 *
 * 思想
 *  遇见#进栈， 遇见/出栈
 */

export default function nestTokens(tokens) {
  /**结果 */
  const nestedTokens = [];

  /**
   * 栈结构
   * 存放小tokens,栈顶(靠近端口的，最新进入的)的tokens数组中点前操作的这个tokens小数组
   **/
  const sections = [];

  for (let i = 0, len = tokens.length; i < len; i++) {
    let token = tokens[i];

    switch (token[0]) {
      case "#":
        /**拓展token, 在下标为2创建一个数组，用来收集子元素*/
        token[2] = [];
        /**压栈(入栈) */
        sections.push(token);
        // console.log(`${token[1]}入栈`);
        break;
      case "/":
        /**弹栈(出栈), pop 会返回刚刚弹出的项目*/
        const section = sections.pop();
        /**刚刚弹出的项还没有加入到结果数组中 */
        nestedTokens.push(section);
        // console.log(`${section[1]}出栈`);
        break;
      default:
        if (!sections.length) {
          nestedTokens.push(token);
        } else {
          sections[sections.length - 1][2].push(token);
        }
        break;
    }
  }

  return nestedTokens;
}
