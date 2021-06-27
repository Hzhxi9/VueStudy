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
  /**备份原来的方法，push等七个函数的功能不能被剥夺 */
  const origins = arrayPrototype[method];

  /**定义新的方法 */
  def(
    arrayMethods,
    method,
    function () {
      /**
       * 改变this指向，this是数组
       * 恢复原来的功能
       */
      const result = origins.apply(this, arguments);

      /**把类数组变为数组 */
      const args = [...arguments];

      /**
       * 把这个函数身上的__ob__取出来
       * __ob__已经被添加了，为什么已经被添加了？
       * 因为数组肯定不是最高层，比如obj.g属性是数组，obj不能是数组
       * 第一次遍历obj这个对象的第一层的时候，已经给g属性添加了__ob__属性
       */
      const ob = this.__ob__;

      /**有三种方法push/unshift/splice能够插入新项，现在要把插入的新项也要变为observe */
      const inserted = [];
      switch (method) {
        case "push":
        case "unshift":
          inserted = args;
          break;
        case "splice":
          /**splice格式是splice(下标，数量，插入的新项) */
          inserted = args.slice(2);
          break;
      }
      /**判断有没有要插入的新项,让新项也变为响应式 */
      if (inserted) {
        ob.observeArray(inserted);
      }

      console.log("ll");

      return result;
    },
    false
  );
});
