import h from "./h";
import patch from "./patch";

const container = document.getElementById("container");

// const vnode = h("h1", {}, "测试");

const vnode = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C"),
]);
patch(container, vnode);

const btn = document.getElementById("btn");

const vnode2 = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "M" }, "M"),
  h("li", { key: "N" }, "N"),
  h("li", { key: "C" }, "C"),
]);

btn.onclick = function () {
  patch(vnode, vnode2);
};
