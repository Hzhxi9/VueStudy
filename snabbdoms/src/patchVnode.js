import createElement from "./createElement";

export default function patchVnode(newVnode, oldVnode) {
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
      /**老的有children，新的有children */

      let un = 0; /**所有为处理节点的开头 */
      for (let i = 0, len = newVnode.children.length; i < len; i++) {
        const ch = newVnode.children[i];
        let isExist = false;

        /**再次遍历， 看看oldVnode中有没有节点和它的一样的*/
        for (let j = 0, length = oldVnode.children.length; j < length; j++) {
          const oldCh = oldVnode.children[j];
          if (oldCh.sel === ch.sel && oldCh.key === ch.key) {
            isExist = true;
          }
        }

        if (!isExist) {
          const dom = createElement(ch);
          ch.elm = dom;

          if (un < oldVnode.children.length) {
            oldVnode.elm.insertBefore(dom, oldVnode.children[un].elm);
          } else {
            oldVnode.elm.appendChild(dom);
          }
        } else {
          un++; /** 让未处理指针下移 */

          /**判断移动节点 */
        }
      }
    } else {
      /**老的没有children， 新的有children */

      oldVnode.elm.innerHTML = ""; /** 清空老的节点内容 */

      /**遍历新的vnode的子节点， 创建DOM，上树 */
      for (let i = 0, len = newVnode.children.length; i < len; i++) {
        const dom = createElement(vnode.children);
        oldVnode.elm.appendChild(dom);
      }
    }
  }
}
