import patchVnode from "./patchVnode";
import createElement from "./createElement";

/**
 * 子节点的更新策略
 * @param {*} parentElm 父节点
 * @param {*} oldCh 老的子元素
 * @param {*} newCh 新的子元素
 */
export default function updateChildren(parentElm, oldCh, newCh) {
  console.log("当前children", oldCh, "===", newCh);

  /**旧的开始索引(旧前) */
  let oldStartIndex = 0;

  /**新的开始索引(新前) */
  let newStartIndex = 0;

  /**旧的结束索引(旧后) */
  let oldEndIndex = oldCh.length - 1;

  /**新的结束索引(新后) */
  let newEndIndex = newCh.length - 1;

  /**旧前节点 */
  let oldStartVnode = oldCh[0];

  /**旧后节点 */
  let oldEndVnode = oldCh[oldEndIndex];

  /**新前节点 */
  let newStartVnode = newCh[0];

  /**新后节点 */
  let newEndVnode = newCh[newEndIndex];

  /**循环 */
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (checkSameVnode(oldStartVnode, newStartVnode)) {
      /**1. 新前和旧前 */
      console.log("新前和旧前命中");
      patchVnode(oldStartVnode, newStartVnode);

      /**先指针下移， 在赋值 */
      oldStartVnode = oldCh[++oldStartIndex];
      newStartVnode = newCh[++newStartIndex];
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      /**2. 新后与旧后 */
      console.log("新后与旧后命中");
      patchVnode(oldEndVnode, newEndVnode);

      /**先指针上移动， 在赋值 */
      oldEndVnode = oldCh[--oldEndIndex];
      newEndVnode = newCh[--newEndIndex];
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      /**3. 新后与旧前 */
      console.log("新后与旧前命中");
      patchVnode(oldStartVnode, newEndVnode);

      /**
       * 插入节点,当新后与旧前命中的时候，此时要移动节点。移动新前指向的这个节点到老节点的旧后的后面
       *
       * 如何移动节点
       * 主要插入一个已经在DOM树上的节点，他就会被移动
       **/
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);

      oldStartVnode = oldCh[++oldStartIndex];
      newEndVnode = newCh[--newEndIndex];
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      /**4. 新前与旧后 */
      console.log("新前与旧后命中");
      patchVnode(oldEndVnode, newStartVnode);

      /**
       * 当新前与旧后命中的时候，此时要移动节点。移动新前指向的这个节点到老节点的旧前的前面
       *
       * 如何移动节点
       * 主要插入一个已经在DOM树上的节点，他就会被移动
       */
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);

      oldEndVnode = oldCh[--oldEndIndex];
      newStartVnode = newCh[++newStartIndex];
    } else {
      /**都没有命中的情况 */
    }
  }
}

/**
 * 判断是否同一个虚拟节点
 * @param {*} a 老元素
 * @param {*} b 新元素
 * @returns {boolean}
 */
function checkSameVnode(a, b) {
  return a.sel === b.sel && a.key === b.key;
}
