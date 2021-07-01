let uid = 0;
export default class Dep {
  constructor() {
    /**
     * 用数组存储自己的订阅者
     * 存放Watcher的实例
     **/
    this.subs = [];

    this.id = uid++;
  }

  /**添加依赖 */
  depend() {
    /**
     * Dep.target就是我们指定的全局的位置
     * 用window.target也行
     * 只要全局唯一，没有歧义就行
     */
    if (Dep.target) {
      this.addSub(Dep.target);
    }
  }

  /**添加订阅 */
  addSub(sub) {
    this.subs.push(sub);
  }

  /**移除订阅 */

  /**通知更新 */
  notify() {
    /**浅克隆备份一份 */
    const subs = this.subs.slice();

    /**遍历 */
    for (let i = 0, len = subs.length; i < len; i++) {
      subs[i].update();
    }
  }
}
