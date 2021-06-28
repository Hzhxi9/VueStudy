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

const arr = [1, 2, 3, [4, 5], [6, [[[7], 8], 9], 10], 11];

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

console.log(parseArr(arr));

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

console.log(convert(arr));

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

console.log(transformArr(arr));
