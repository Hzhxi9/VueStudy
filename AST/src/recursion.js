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

console.log(arr);

/**
 * 尝试将高维数组[1,2,3,[4,5]]
 * 变为
 * {
 *    children: [
 *      { value: 1},
 *      { value: 2},
 *      { value: 3},
 *      { children: [
 *        { value: 4 },
 *        { value: 5 },
 *      ] },
 *    ]
 * }
 */

const arr_ = [1, 2, 3, [4, 5], [6, [[[7], 8], 9], 10], 11];

function parseArr(arr) {
  let result = null;

  if (Array.isArray(arr)) {
    result = { children: [] };
  }

  for (let i = 0, len = arr.length; i < len; i++) {
    const value = arr[i];
    if (Array.isArray(value)) {
      result["children"] = [...result["children"], parseArr(value)];
    } else {
      result["children"].push({ value });
    }
  }

  return result;
}

console.log(parseArr(arr_));

function convert(arr) {
  /**结果数组 */
  let result = [];

  for (let i = 0, len = arr.length; i < len; i++) {
    const value = arr[i];

    if (typeof value === "number") {
      result.push({ value });
    } else if (Array.isArray(value)) {
      result.push({ children: convert(value) });
    }
  }
  return result;
}

console.log(convert(arr_));

/**
 * 映射
 * @param {number[] | number} value
 **/
function transformArr(value) {
  if (typeof value === "number") {
    return {
      value,
    };
  } else if (Array.isArray(value)) {
    return {
      children: value.map(_value => transformArr(_value)),
    };
  }
}

console.log(transformArr(arr_));
