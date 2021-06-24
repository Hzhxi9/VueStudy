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

  /**存放key的缓存 */
  let keyMap = null;

  /**循环 */
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    /**略过已经标记了undefined标记的东西 */
    if (oldStartVnode === null || oldCh[oldStartIndex] === undefined) {
      oldStartVnode = oldCh[++oldStartIndex];
    } else if (oldEndVnode === null || oldCh[oldEndIndex] === undefined) {
      oldEndVnode = oldCh[--oldEndIndex];
    } else if (newStartVnode === null || oldCh[newStartIndex] === undefined) {
      newStartVnode = newCh[++newStartIndex];
    } else if (newEndVnode === null || oldCh[newEndIndex] === undefined) {
      newEndVnode = newCh[--newEndIndex];
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
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
      /**四种名字都没有命中的情况 */
      /**寻找key中map */
      if (!keyMap) {
        keyMap = {};
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
          const key = oldCh[i].key;
          if (key !== undefined) {
            keyMap[key] = i;
          }
        }
      }

      /**寻找当前这项(newStartIndex)这项在keyMap中映射的位置序号 */
      const indexInOld = keyMap[newStartVnode.key];

      if (indexInOld === undefined) {
        /**如果indexOfIndex是undefined表示他是全新的项目 */
        /**加入的项(就是) */

      } else {
        /**不是undefined,则就不是全新的项，而是要移动 */
        const elmToMove = oldCh[indexInOld];

        patchVnode(elmToMove, newStartVnode);
        /**把这项设置为undefined，表示我已经处理完这项了 */
        oldCh[indexInOld] = undefined;

        /**移动 调用insertBefore实现移动 */
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
      }
      /**指针下移，只移动新的头 */
      newStartVnode = newCh[++newStartIndex];
    }
  }

  /**
   * 继续寻找有没有剩余的
   * 循环结束了start比old的小
   */
  if (newStartIndex <= newEndIndex) {
    /**new 还有剩余节点没有处理, 加项*/
    const before =
      newCh[newEndIndex + 1] === null
        ? null
        : newCh[newEndIndex + 1].elm; /**插入的标杆 */

    for (let i = newStartIndex; i <= newEndIndex; i++) {
      /**
       * insertBefore方法可以自动识别null，
       * 如果是null就会自动拍到队尾去
       * 和appendChild是一致的
       *
       * newCh[i]现在还没真正成为DOM, 所以要调用createElement()函数变为DOM
       */
      parentElm.insertBefore(createElement(newCh[i]), before);
    }
  } else if (oldStartIndex <= oldEndIndex) {
    /**
     * old 还有剩余节点没有处理 删项
     * 批量删除oldStartIndex 和 oldEndIndex 之间的项目
     */
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm);
      }
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
