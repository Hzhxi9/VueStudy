import { def } from "./utils";

/**得到Array.prototype */
const arrayPrototype = Array.prototype;

/**以Array.prototype为原型创建arrayMethods对象 */
export const arrayMethods = Object.create(arrayPrototype);

/**要被改写的七个数组方法 */
const methodsNeedChange = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];

methodsNeedChange.forEach((method, idx) => {
  /**备份原来的方法 */
  const origins = arrayPrototype[method];

  /**定义新的方法 */
  def(
    arrayMethods,
    method,
    function () {
      console.log("ll");
      /**
       * 改变this指向，this是数组
       * 恢复原来的功能
       */
      origins.apply(this, arguments);
    },
    false
  );
});
