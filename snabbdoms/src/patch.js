import vnode from "./vnode";
import createElement from "./createElement";

export default function (oldVnode, newVnode) {
  /**判断传入第一个参数是DOM节点还是虚拟节点 */
  if (oldVnode.sel === "" || oldVnode.sel === undefined) {
    /**传入的第一个参数是DOM节点，此时要包装为虚拟节点 */
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      [],
      undefined,
      oldVnode
    );
  }

  /** 判断oldVnode 和 newVnode是不是同个节点 */
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    /**同一个节点，进行精细化比较 */
    console.log("同一个节点");
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
      } else {
        /**老的没有children， 新的有children */

        /** 清空老的节点内容 */
        oldVnode.elm.innerHTML = "";
        
        /**遍历新的vnode的子节点， 创建DOM，上树 */
        for (let i = 0, len = newVnode.children.length; i < len; i++) {
          const dom = createElement(vnode.children);
          oldVnode.elm.appendChild(dom);
        }
      }
    }
  } else {
    /** 不是同一个节点，进行暴力操作，插入新的，删除旧的 */
    const newVnodeElm = createElement(newVnode, oldVnode.elm);
    /**插入到老节点之前 */
    if (oldVnode.elm.parentNode && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
    }

    /**删除老节点 */
    oldVnode.elm.parentNode.removeChild(oldVnode.elm);
  }
}
