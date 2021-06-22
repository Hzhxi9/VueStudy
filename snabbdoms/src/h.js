import vnode from "./vnode";

/**
 * 函数必须接收三个参数
 * 相当于重载能力较弱
 *
 *  调用的形态是下述三种情况
 *  h('div', {}, '文字')
 *  h('div', {}, [])
 *  h('div', {}, h())
 **/
export default function (sel, data, c) {
  /**检查参数的个数 */
  if (arguments.length !== 3)
    throw new Error("this function must have three params");

  /**检查参数c的类型 */
  if (typeof c === "string" || typeof c === "number") {
    /**h('div', {}, '文字') */
    return vnode(sel, data, undefined, c, undefined);
  } else if (Array.isArray(c)) {
    /**
     *  h('div', {}, [])
     *  遍历参数c
     **/
    let children = [];
    for (let i = 0, len = c.length; i < len; i++) {
      /**检查c[i]必须是一个对象如果不满足*/
      if (!(typeof c[i] === "object" && c[i].hasOwnProperty("sel")))
        throw new Error("c array is error h function");

      /**
       * 这个不用执行c[i],
       * 测试语句已经有执行了
       * 只需要收集 */
      children.push(c[i]);
    }
    return vnode(sel, data, children, undefined, undefined);
  } else if (typeof c === "object" && c.hasOwnProperty("sel")) {
    /**
     * h('div', {}, h())
     * 即传入的c是唯一的children
     * 不用执行c
     **/
    const children = [c];
    return vnode(sel, data, children, undefined, undefined);
  } else {
    throw new Error("c is error type");
  }
}
