import h from "./h";

const vnode1 = h("div", {}, "文字");
console.log(vnode1);

const vnode2 = h("div", {}, [
  h("p", {}, "呵呵"),
  h("p", {}, "嘻嘻"),
  h("p", {}, "呵呵"),
]);
console.log(vnode2);

const vnode3 = h("div", {}, h("p", {}, "测试"));
console.log(vnode3);

const vnode4 = h("ul", {}, [
  h("li", {}, "苹果"),
  h("li", {}, [h("div", {}, [h("p", {}, "哈哈")]), h("p", {}, "嘻嘻")]),
  h("li", {}, h("span", {}, "火龙果")),
]);
console.log(vnode4);
