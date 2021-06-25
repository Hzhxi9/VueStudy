import vnode from "./vnode";
import patchVnode from "./patchVnode";
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

    patchVnode(oldVnode, newVnode);
  } else {
    /** 不是同一个节点，进行暴力操作，插入新的，删除旧的 */
    const newVnodeElm = createElement(newVnode);

    /**插入到老节点之前 */
    if (oldVnode.elm.parentNode && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
    }

    /**删除老节点 */
    oldVnode.elm.parentNode.removeChild(oldVnode.elm);
  }
}
