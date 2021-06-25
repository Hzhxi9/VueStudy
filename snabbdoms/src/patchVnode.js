import createElement from "./createElement";
import updateChildren from "./updateChildren";

/**对比同一个虚拟节点 */
export default function patchVnode(oldVnode, newVnode) {
  /**如果新旧vnode是否是同一个对象 */
  if (oldVnode === newVnode) return;

  /**判断新vnode有没有text属性 */
  if (
    newVnode.text !== undefined &&
    (newVnode.children === undefined || newVnode.children.length === 0)
  ) {
    /**newVnode有text属性 */
    if (newVnode.text !== oldVnode.text) {
      /**
       * 如果newVnode的text和oldVnode的text不同
       * 那么直接让新的text写入老的elm中
       * 如果老的elm是children，那么也会立即消失掉
       */
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    /**newVnode没有text属性 */
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      /**
       * 老的有children，新的有children
       * 此时是最复杂的情况
       */
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
    } else {
      /**老的没有children， 新的有children */

      oldVnode.elm.innerHTML = ""; /** 清空老的节点内容 */

      /**遍历新的vnode的子节点， 创建DOM，上树 */
      for (let i = 0, len = newVnode.children.length; i < len; i++) {
        const dom = createElement(newVnode.children[i]);
        oldVnode.elm.appendChild(dom);
      }
    }
  }
}
