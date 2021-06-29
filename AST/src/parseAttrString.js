export default function parseAttrString(attrString) {
  if (!attrString) return [];

  let isYinHao = false; /**当前是否在引号内 */

  let point = 0; /**断点 */

  let result = []; /**结果数组 */

  /**遍历attrString */
  for (let i = 0, len = attrString.length; i < len; i++) {
    let char = attrString[i];

    if (char === '"') {
      /**遇到引号 */
      isYinHao = !isYinHao;
    } else if (char === " " && !isYinHao) {
      /**遇见了空格，并且不在引号中 */
      if (!/^\s*$/.test(attrString.substring(point, i))) {
        /**去除空字符串情况 */
        result.push(attrString.substring(point, i).trim());
        /**赋值断点 */
        point = i;
      }
    }
  }
  /**循环结束最后，最后还剩一个属性k="v" */
  result.push(attrString.substring(point).trim());

  /**将["k=v","k=v"]变为[{name: k,value: v},{name: k,value: v}] */
  result = result.map(res => {
    /**根据等号拆分 */
    const o = res.match(/^(.+)="(.+)"$/);
    return {
      name: o[1],
      value: o[2],
    };
  });

  return result;
}
