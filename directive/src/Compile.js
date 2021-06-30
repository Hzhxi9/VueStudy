export default class Compile {
  constructor(el, vue) {
    /**vue实例 */
    this.$vue = vue;

    /**挂载点 */
    this.$el = document.querySelector(el);

    /**如果用传入了挂载点 */
    if (this.$el) {
      /**
       * 调用函数，让节点变为fragment
       * 类似与mustache中的tokens
       * 实际上用的就是AST
       * 这里就是轻量级的fragment
       */
      const $fragment = this.node2Fragment(this.$el);

      /**编译 */
      this.compile($fragment);
    }
  }
  node2Fragment(el) {
    console.log(el);
    /**
     * createDocumentFragment
     * 创建了一虚拟的节点对象，节点对象包含所有属性和方法。
     * 提取文档的一部分，改变，增加，或删除某些内容及插入到文档末尾可以使用createDocumentFragment() 方法
     **/
    const fragment = document.createDocumentFragment();

    let children;

    /**让所有DOM节点, 都进入fragment */
    while ((children = el.firstChild)) {
      /**加入到fragment中， 真实节点就消失 */
      fragment.appendChild(children);
    }
    return fragment;
  }
  compile(el) {
    console.log(el);
    /**得到子元素 */
    const childNodes = el.childNodes;

    let that = this;

    childNodes.forEach(node => {
      if (node.nodeType === 1) {
        /**nodeType === 1 	代表元素 */
        that.compileElement(node);
      } else if (node.nodeType === 3) {
        /**nodeType === 3  代表元素或属性中的文本内容。 */

        let text = node.textContent;

        console.log(text);
      }
    });
  }
  compileElement(node) {
    /**这里方便之处在于不是将HTML结构看做字符串，而是真正的属性列表 */
    const nodeAttrs = node.attributes;

    console.log(nodeAttrs, "=compileElement");

    /**类数组对象变为数组 */
    Array.prototype.slice.call(nodeAttrs).forEach(attr => {
      /**分析指令 */
      const attrName = attr.name;
      const value = attr.value;

      /**指令都是v-开头 */
      const dir = attrName.substring(2);

      /**看是不是指令 */
      if (attrName.indexOf("v-") === 0) {
        /**v-开头就是指令 */
        if (dir === "model") {
          /**v-model */
          console.log("model", value);
        } else if (dir === "for") {
          /**v-for */
        } else if (dir === "if") {
          /**v-if */
        }
      }
    });
  }
  compileText() {}
}
