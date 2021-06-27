/**缓存对象 */
let cache = {};
/**
 * 优化斐波那契数列
 * ache思想
 */
function fib(n) {
  /**计数 */
  console.count("计数");

  /**判断缓存对象有没有这个这个值，如果有就直接用 */
  if (cache.hasOwnProperty(n)) {
    console.log("命中了直接用");
    return cache[n];
  }
  /**缓存对象没有的值 */
  const v = n === 0 || n === 1 ? 1 : fib(n - 1) + fib(n - 2);

  /**写入缓存,每次算一个值，就加入缓存 */
  cache[n] = v;

  return v;
}

for (let i = 0; i < 10; i++) console.log(fib(i));

/**使用数组 */
const arr = [1, 1];

while (arr.length < 10) {
  arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
}

console.log(arr)
