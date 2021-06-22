import h from "./h";
import patch from "./patch";

const container = document.getElementById("container");

// const vnode = h("h1", {}, "测试");

const vnode = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, "C"),
  h("li", {}, "D"),
]);

patch(container, vnode);

const btn = document.getElementById("btn");

const vnode2 = h("div", {}, [h("h1", {}, "这是h1"), h("h2", {}, "这是h2")]);

btn.onclick = function () {
  patch(vnode, vnode2);
};
