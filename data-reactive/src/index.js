const o = {};

function defineReactive(data, key, val) {
  /**构造闭包环境 */
  Object.defineProperty(o, "a", {
    /**可枚举 */
    enumerable: true,
    /**可以被配置，比如可以被delete */
    configurable: true,
    /**数据劫持 getter */
    get() {
      console.log("试图访问" + key + "属性");
      return val;
    },
    /**setter */
    set(newValue) {
      console.log("你试图改变" + key + "属性", newValue);
      if (val === newValue) return;
      val = newValue;
    },
  });
}

defineReactive(o, "a", 10);

console.log(o.a);
o.a = 11;
console.log(o.a);
