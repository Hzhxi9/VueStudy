import Compile from "./Compile";
import observe from "./observe";
import Watcher from "./Watcher";

class Vue {
  constructor(options) {
    /**把参数options对象存为$options */
    this.$options = options || [];

    /**数据 */
    this._data = options.data || undefined;

    /**数据要变为响应式 */
    observe(this._data);

    /**
     * 默认数据要变为响应式的
     * 这里就是生命周期
     */
    this._initData();
    this._initComputed();

    /**默认绑定watch */
    this._initWatch();

    /**模板编译 */
    new Compile(options.el, this);
  }

  _initData() {
    const that = this;
    /**数据绑定 */
    Object.keys(this._data).forEach(key => {
      Object.defineProperty(that, key, {
        get() {
          return that._data[key];
        },
        set(newValue) {
          that._data[key] = newValue;
        },
      });
    });
  }

  _initWatch() {
    const that = this;
    const watch = this.$options.watch;
    Object.keys(watch).forEach(key => {
      new Watcher(that, key, watch[key]);
    });
  }

  _initComputed() {}
}

window.Vue = Vue;
