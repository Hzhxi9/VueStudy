import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

// 创建出patch函数
const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

// 让虚拟节点上树
const container = document.getElementById("container");

// 创建虚拟节点
const myVnode = h("a", { props: { href: "http://www.baidu.com" } }, "百度");

const myVnode3 = h("ul", [
  h("li", "苹果"),
  h("li", [h("div", [h("p", "哈哈")]), h("p", "嘻嘻")]),
  h("li", h("span", "火龙果")),
]);

patch(container, myVnode3);
