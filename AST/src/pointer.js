/**尝试寻找连续重复次数最高的字符 */
const str = "aaaaabbbbbbbccccccccccccddddd";

/**双指针 */
let i = 0,
  j = 0;
/**当前重复最多的次数 */
let max = 0;
/**当前重复最多的字符串 */
let maxStr = "";

/**当i还在范围内的时候，应该继续寻找 */
while (i <= str.length - 1) {
  /**看i指向和j指向的字符是不是不相同 */
  if (str[i] !== str[j]) {
    /**和当前重复最多的进行比较 */
    if (j - i > max) {
      /**
       * 如果当前文字重复次数(j-i)超过此时的最大值
       * 就让他成为最大值
       */
      max = j - i;

      maxStr = str[i];
    }

    i = j;
  }

  /**不管相不相同，j都要后移 */
  j++;
}

console.log(max, maxStr);
