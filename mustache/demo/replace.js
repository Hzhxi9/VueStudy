/**
 * 利用replace中第一个参数的正则表达式，实现模板引擎，是最简单的模板引擎实现机理
 *
 * replace() 第二个参数可以是一个参数，这个函数提供捕获的东西的参数，$1
 * 结合data对象，即可进行智能的替换
 */
const template = "<h1>我买了一个{{thing}}，花了{{money}}元，好{{mood}}</h1>";
const data = {
  thing: "手机",
  money: 1999,
  mood: "开心",
};

/**
 * @param findStr 匹配的部分
 * @param $1 捕获的内容，()里的内容
 * @param index 匹配到的索引值
 * @param str 原字符串
 */
const render = (template, data) =>
  template.replace(/\{\{(\w+)\}\}/g, (findStr, $1, index, str) => data[$1]);

const render = (template, data) => {
  const reg = /\{\{(\w+)\}\}/;
  if (reg.test(template)) {
    const target = reg.exec(template)[1];
    template = template.replace(reg, data[target]);
    return render(template, data);
  }
  return template;
};

console.log(render(template, data));
