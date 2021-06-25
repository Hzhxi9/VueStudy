import lookup from "./lookup";
import renderTemplate from "./renderTemplate";

/**
 * 处理数组，结合renderTemplate实现递归
 *
 * 接收一个简单的token，则['#', 'students',[]]
 * 递归调用的次数由data的长度决定
 *
 */
export default function parseArray(token, data) {
  /**得到整体数据data中这个数组要处理的部分 */
  const v = lookup(data, token[1]);
  /**结果字符串 */
  let result = "";
  /**遍历v数据，v一定是数组 */
  for (let i = 0, len = v.length; i < len; i++) {
    /**需要补一个点属性的判断 */
    result += renderTemplate(token[2], { ...v[i], ".": v[i] });
  }
  return result;
}

