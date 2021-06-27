import { def } from "./utils";
import { arrayMethods } from "./array";
import defineReactive from "./defineReactive";
import observe from "./observe";
import Dep from "./Dep";

/**
 * 将一个正常的object转换为每个层级的属性都是响应式
 * (可以被侦测到的object)
 */
export default class Observer {
  constructor(value) {
    /**每一个Observer的实例身上都有一个dep */
    this.dep = new Dep();

    /**
     * 给实例(this一定要注意， 构造函数中的this不会表示类本身，而是表示实例)
     * 加了__ob__属性，值是这次new的实例
     **/
    def(value, "__ob__", this, false);

    /**检查它是数组还是对象 */
    if (Array.isArray(value)) {
      /**如果是数组，将这个数组的原型指向arrayMethods */
      Object.setPrototypeOf(value, arrayMethods);
      /**让这个数组变的observe */
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }
  /**遍历每个key */
  walk(value) {
    for (const key in value) {
      defineReactive(value, key);
    }
  }
  /**数组的特殊遍历 */
  observeArray(arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
      /**逐项进行observe */
      observe(arr[i]);
    }
  }
}
