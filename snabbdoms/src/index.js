import h from "./h";
import patch from "./patch";

const container = document.getElementById("container");

const vnode = h("h1", {}, "测试");

patch(container, vnode);
