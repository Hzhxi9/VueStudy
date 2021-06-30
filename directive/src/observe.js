import Observer from "./Observer";

/**创建observe辅助函数 */
const observe = function (value) {
  /**如果value不是函数，什么都不做 */
  if (typeof value !== "object") return;

  /**定义ob */
  let ob;

  if (typeof value.__ob__ !== "undefined") {
    /**__ob__ Observer的示例 */
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }

  return ob;
};

export default observe;
