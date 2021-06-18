/**
 * 扫描器类
 */
export default class Scanner {
  constructor(templateStr) {
    /**将模板字符串赋值 */
    this.template = templateStr;
    /**指针 */
    this.pos = 0;
    /**尾巴，一开始就是模板字符串原文 */
    this.tail = templateStr;
  }

  /**
   * 扫描{ 或 } 的方法
   * 跳过指定内容，没有返回值
   *
   * @param {string} tag
   **/
  scan(tag) {
    if (this.tail.indexOf(tag) === 0) {
      /**tag有多长，比如{{ 长度为2，就让指针后移多少位 */
      this.pos += tag.length;
      /**改变尾巴为从当前指针之后字符串开始，到最后的全部字符串 */
      this.tail = this.template.substr(this.pos);
    }
  }

  /**
   * 扫描到{ 或 }之前的方法
   * 让指针进行扫描，直到遇到指定内容结束，并返回结束之前的值
   *
   * @param {string} stopTag 结束标记
   * @returns {string} 结束标记前的字符串
   */
  scamUtil(stopTag) {
    /**记录一下执行本方法的时候pos的值 */
    const pos_backup = this.pos;
    /**
     * 当前尾巴的开头不是stopTag的时候，就说明还没有扫描到stopTag
     * 并且pos不能超过template的字符串,找到最后直接停止
     **/
    while (!this.eos() && this.tail.indexOf(stopTag) !== 0) {
      this.pos++;
      /**改变尾巴为从当前指针之后字符串开始，到最后的全部字符串 */
      this.tail = this.template.substr(this.pos);
    }

    return this.template.substring(pos_backup, this.pos);
  }

  /**
   * 指针直接到头，返回布尔值
   * @returns {boolean}
   */
  eos() {
    return this.pos >= this.template.length;
  }
}
