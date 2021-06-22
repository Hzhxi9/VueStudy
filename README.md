## Vue2.0 源码学习

## 参考链接

1. [汪图南](https://wangtunan.github.io/blog/vueAnalysis/introduction/)
2. [Vue 源码分析 -- 基于 2.2.6 版本](https://github.com/liutao/vue2.0-source)
3. [Vue 源码逐行注释分析](https://github.com/qq281113270/vue)
4. [推荐 7 个 Vue2、Vue3 源码解密分析的重磅开源项目](https://juejin.cn/post/6942492146725290020#heading-5)
5. [Vue 源码解读](https://www.bilibili.com/video/BV1Jb4y1D7eA?share_source=copy_web)
6. [Vue 源码解析系列课程](https://www.bilibili.com/video/BV1iX4y1K72v?p=7&spm_id_from=pageDriver)
7. [百度云备份(c7zf)](https://pan.baidu.com/s/1QLKyi8NsLf5touOePRfTYg)

## 数据变为视图的方法

1. 纯 DOM 法

```
var arr = [
    {name: '小明'},
    {name: '小红'},
    {name: '小强'}
]
var list = document.getElementById('list');
for(var i = 0; i < arr.length; i++){
    // 每遍历一项， 都要用DOM方法去创建li标签
    let oLi = document.createElement('li');
    oLi.innerText = arr[i].name;
    // 创建的节点是孤儿节点，必须要上树才能被用户看见
    list.appendChild(oLi)
}
```

2. 数组 join 法

```
var arr = [
    {name: '小明'},
    {name: '小红'},
    {name: '小强'}
]
var list = document.getElementById('list');
// 遍历arr数组，每遍历一项，就以字符串的视角将HTML字符串添加到list中
for(var i = 0; i < arr.length; i++){
    list.innerHTML += [
    '<li>',
    '   <div class='hd'>'+ arr[i].name +'</div>',
    '   <div class='bd'>',
    '       <p>姓名:'+ arr[i].name +'</p>',
    '   </div>',
    '</li>'
 ].join('')
}
```

3. ES6 的反引号法

```
var arr = [
    {name: '小明'},
    {name: '小红'},
    {name: '小强'}
]
var list = document.getElementById('list');

for(var i = 0; i < arr.length; i++){
    list.innerHTML += `
        <li>
            <div class='hd'>${arr[i].name}</div>
            <div class='bd'>
                <p>姓名: ${arr[i].name}</p>
            </div>
        </li>
    `
}
```

4. 模板引擎

## mustache 模版引擎

将数据变为视图最优雅的解决方案

git 地址 <https://github.com/janl/mustache.js>

### 模版语法

在 BootCDN 找到 mustache 包

```
// 循环对象数组
var template = `
 <ul>
    {{#arr}}
         <li>
            <div class='hd'>{{name}}</div>
            <div class='bd'>
                <p>姓名: {{name}}</p>
            </div>
        </li>
    {{/arr}}
 </ul>
`;

var data = {
    arr: [
        {name: '小明'},
        {name: '小红'},
        {name: '小强'}
    ]
}

const domStr = Mustache.render(template, data);
const container = document.getElementById('container');
container.innerHTML = domStr;

// 不循环
const template = `
    <h1>我买了一个{{thing}},好{{mood}}</h1>
`
const data = {
    thing: '华为手机',
    mood: '开心'
}
const domStr = Mustache.render(template, data);
const container = document.getElementById('container');
container.innerHTML = domStr;

// 循环简单数组
var data = {
    arr: [
        'A','B','C'
    ]
};

// 用.代表简单数组里的元素
var template = `
    <ul>
        {{#arr}}
            <li>{{.}}</li>
        {{/arr}}
    </ul>
`
// 数组的嵌套
var template =`
    <ul>
        {{#arr}}
            <li>
              <ol>
                {{#hobbies}}
                    <li>{{.}}</li>
                {{/hobbies}}
              </ol>
            </li>
        {{/arr}}
    </ul>
`

// 布尔值
var template = `
    {{#m}}
        <h1>hello world</h1>
    {{/m}}
`
var data = {
    m: false
}

// 模版 存储字符串 不会被浏览器识别
<script type='text/template' id='template'>
     <ul>
        {{#arr}}
            <li>
              <ol>
                {{#hobbies}}
                    <li>{{.}}</li>
                {{/hobbies}}
              </ol>
            </li>
        {{/arr}}
    </ul>
</script>

const templateStr = document.getElementById('template'),innerHTML;
```

### mustache 底层核心机理

1. 简单示例情况下， 可以用正则表达式实现

```
const render = (template, data) =>
  template.replace(/\{\{(\w+)\}\}/g, (findStr, $1, index, str) => data[$1]);
```

2. 复杂情况下，mustache 实现机理

   - tokens
     - 一个 js 的嵌套数组，也就是模板字符串的 js 表示
     - 它是抽象语法树，虚拟节点等的开山鼻祖

3. mustache 库底层重点要做的两个事情

   - 将模板字符串编译为 tokens 形式
   - 将 tokens 结合数据，解析为 dom 字符串

```
  // 模板字符串
  <h1>我买了一个{{thing}}，花了{{money}}元，好{{mood}}啊</h1>

  // tokens
  [
    ["text", " <h1>我买了一个"],
    ["name","thing"],
    ["text", ",好"],
    ["name", "mood"],
    ["text","啊</h1>"]
  ]
```

mustache 流程
![avatar](/images/mustache.jpg)
普通的字符串
![avatar](/images/mustache1.jpg)
循环情况下的 tokens
![avatar](/images/mustache2.png)
双重循环情况下的 tokens
![avatar](/images/mustache3.png)

### 手写 mustache 库

1. 使用 webpack 和 webpack-dev-server 构建
   - 模块化打包工具有 webpack(webpack-dev-server),rollup,Parcel 等
   - mustache 官方库使用 rollup 进行模块化打包,而我们使用 webpack 进行模块化打包
   - 生成库是 `UMD` 的，这意味着他可以同时在 nodejs 环境中使用，也可以在浏览器环境中使用，实现 UMD 不难，只需要一个"通用头"
2. 注意 webpack 和 webpack-dev-server 的版本

   webpack 最新版是 5，webpack-dev-server 最新版本是 4，但是目前他的兼容性不好，所以建议使用下面的版本
   ![avatar](/images/mustache4.png)

3. 配置 webpack.config.js
   ![avatar](/images/mustache5.png)

## 虚拟 DOM 和 diff 算法

### 虚拟 DOM

将真实 DOM 转化为 js 对象

用 JavaScript 对象描述 DOM 的层次结构，DOM 中的一切属性都在虚拟 DOM 中有对应的属性

![avatar](/images/diff1.jpg)

### diff 算法

diff 是发生在虚拟 DOM 上的
新虚拟 DOM 和老虚拟 DOM 进行 diff(精细化比较)，算出应该如何最小量更新，最后反映到真正的 DOM 上。

### snabbdom 简介

著名的虚拟 DOM 库，是 diff 算法的鼻祖，Vue 源码借鉴了 snabbdom

### snabbdom 测试环境搭建

1.  snabbdom 库是 DOM 库，所以不能在 nodejs 环境中允许，需要搭建 webpack 和 webpack-dev-server 开发环境，并且不需要安装任何 loader
2.  必须安装最新版 webpack@5，因为 webpack@4 没有读取身份证中 exports 的能力
    `npm i -D webpack@5 webpack-cli@3 webpack-dev-server@3`

3.  参考 webpack 官网，书写好 webpack.config.js 文件

### snabbdom 的 h 函数如何工作

1. 用来产生虚拟节点(vnode)

   ```
   比如调用 h 函数
   @params 标签名字
   @params 对象,各种属性
   @params 文本
   h('a', {props: {href: 'http://www.baidu.com'}}, '百度')

   将得到这样的虚拟节点
   {'sel': 'a', 'data': { props: { href: 'http://www.baidu.com'}}, 'text': '百度'}

   它表示真正的DOM节点
   <a href='http://www.baidu.com'>百度</a>
   ```

2. h 函数可以嵌套使用，从而得到虚拟 DOM 树

   ```
    比如这样嵌套使用 h 函数
    h('ul', {}, [
        h('li', {}, '牛奶'),
        h('li', {}, '咖啡'),
        h('li', {}, '可乐'),
    ])

    将得到这样的虚拟DOM树
    {
        'sel': 'ul',
        'data': {},
        'children': [
            { 'sel': 'li', 'text': '牛奶'},
            { 'sel': 'li', 'text': '咖啡'},
            { 'sel': 'li', 'text': '可乐'},
        ]
    }
   ```

### 一个虚拟节点有那些属性

```
{
    children: undefined, // 子元素
    data: {},  // 本身带的属性 样式等等
    elm: undefined,  // 这个元素对应的真正的dom节点， undefined表示还没有上树渲染
    key: undefined, // 这个节点的唯一标识
    sel: 'div', // 选择器
    text: '我是一个盒子' // 文本
}
```

### diff 算法原理

#### 感受 diff 算法

1. key 很重要，key 是这个节点的唯一标识，告诉 diff 算法，在更改前后它们是同一个 DOM 节点
2. 只有是同一个虚拟节点，才进行精细化比较，否则就是暴力删除旧的，插入新的。
   - 延伸问题： 如何定义是同一个虚拟节点？
   - 选择器相同且 key 相同
3. 只进行同层比较，不会进行跨层比较。 即使是同一个虚拟节点，但是跨层了，就不进行精细化比较，而是暴力删除旧的，然后插入新的
   ![avatar](/images/diff2.png)

4. 2,3 操作在实际开发中基本不会出现，所以这是合理的优化机制

#### patch 函数被调用(流程图)

![avatar](/images/diff3.png)

#### 如何定义同一个节点

![avatar](/images/diff4.png)
旧节点的 key 要和新节点的 key 相同且旧节点的选择器要和新节点的选择器相同

#### 创建节点时， 所有子节点需要递归创建

![avatar](/images/diff5.png)

#### oldVnode 和 newVnode 是同一个节点

![avatar](/images/diff6.png)
