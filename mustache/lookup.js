/**
 * 在目标对象寻找连续点符号的key属性
 *
 * 比如
 * const o = { a : { b : { c : 100 }}}
 * 那么lookup(o, 'a.b.c') 结果就是100
 *
 * @param {object} o
 * @param {string} key
 */

export default function lookup(o, key) {
  /**先判断有没有点符号,但不能是点本身*/
  if (~key.indexOf(".") && key !== ".") {
    let keys = key.split(".");
    /**设置临时变量， 用于周转， 一层层寻找下去 */
    let temp = o;
    /**每找一层，就把它设置为新的临时变量 */
    for (let i = 0, len = keys.length; i < len; i++) {
      temp = temp[keys[i]];
    }
    return temp;
  }
  /**没有符号直接返回 */
  return o[key];
}
