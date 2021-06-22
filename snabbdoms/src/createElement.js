/**
 * 真正创建节点, 将vnode创建为DOM, 插入到pivot这个元素之前
 **/
export default function (vnode, pivot) {
  /**
   * 目的是把虚拟节点vnode 插入到 pivot 前
   * 创建的DOM节点， 这个节点还是孤儿节点，
   **/
  const domNode = document.createElement(vnode.sel);
  /**判断有子节点还是有文本 */
  if (
    vnode.text !== "" &&
    (vnode.children === undefined || vnode.children.length === 0)
  ) {
    /**内部是文字 */
    domNode.innerText = vnode.text;
    /**
     * 将孤儿节点上树
     * 让标杆节点的父元素调用insertBefore方法，将新的孤儿节点插入到标杆节点之前
     */
    pivot.parentNode.insertBefore(domNode, pivot);
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    /**内部是子节点 */
  }
}
