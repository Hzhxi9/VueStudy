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

    const fragment = document.createDocumentFragment();
    let children;
    /**让所有DOM节点, 都进入fragment */
    while ((children = el.firstChild)) {
      fragment.appendChild(children);
    }
    return fragment;
  }
  compile(el) {
    console.log(el);
    /**得到子元素 */
    const childNodes = el.childNodes;
  }
  compileElement(node) {}
  compileText() {}
}
