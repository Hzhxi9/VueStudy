/**
 * 真正创建节点, 将vnode创建为DOM, 作为孤儿节点，不进行插入
 **/
export default function createElement(vnode) {
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
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    /**内部是子节点， 就要递归创建节点*/
    for (let i = 0, len = vnode.children.length; i < len; i++) {
      /**得到当前这个children */
      const ch = vnode.children[i];
      /**
       * 创建出它的DOM， 一旦调用createElement意味着
       * 创建出了DOM了，并且它的elm属性指向了创建出的DOM，但是还没有上树，是一个孤儿节点
       **/
      const chDom = createElement(ch);
      /**上树，插入到该子节点的父节点 */
      domNode.appendChild(chDom);
    }
  }

  /**补充elm属性 */
  vnode.elm = domNode;

  /**返回elm，elm是纯DOM对象 */
  return vnode.elm;
}
