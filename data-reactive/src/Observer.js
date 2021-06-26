import { def } from "./utils";

import defineReactive from "./defineReactive";

/**
 * 将一个正常的object转换为每个层级的属性都是响应式
 * (可以被侦测到的object)
 */
export default class Observer {
  constructor(value) {
    /**
     * 给实例(this一定要注意， 构造函数中的this不会表示类本身，而是表示实例)
     * 加了__ob__属性，值是这次new的实例
     **/
    def(value, "__ob__", this, false);
    console.log(value);
    this.walk(value);
  }
  /**遍历每个key */
  walk(value) {
    for (const key in value) {
      defineReactive(value, key);
    }
  }
}
