> #### 以下为从stylus特性中挑选出的易于引用和学习的特性，其他特性可自行学习和使用
> #### 同时配合gulp或者webpack，可实现实时编译为css以及刷新浏览器


> ### 关于风格

```css
/*原有的标准*/
body {
  color: #fff;
}
/*现有风格，花括号、分号、冒号都可以不需要也可以任意存在，或者不同开发人员的不同习惯都可以同时存在，这里根据现有编辑器推荐如下写法*/
body
  color white;
```

> ### 多个选择器使用同种属性

```css
/*原有的标准*/
textarea,
input {
  border: 1px solid #eee;
}
/*推荐使用换行，为多个选择器定义属性*/
textarea
input
  border 1px solid #eee;
```

> ### 引用父级属性

```css
/*原有的标准*/
textarea,
input {
  color: #a7a7a7;
}
textarea:hover,
input:hover {
  color: #000;
}
/*父级引用写法*/
textarea
input
  color #A7A7A7;
  &:hover
    color #000;
```

> ### 常量用变量代替，方便统一修改

```css
/*原有标准，处处都是常量，比如字体大小、间距等等*/
body {
  font: 14px Arial, sans-serif;
}
/*颜色、字体大小、间距等等可以复用并且统一修改的东西用变量代替，并最好存放在一个文件里，其他stylus文件引用*/
font-size = 14px;
body
  font font-size Arial, sans-seri;
```

> ### 混合书写，多个选择器使用同一属性而其值不同的情况下

```css
/*原有情况，关于border-radius的属性在其他选择器也会存在，而值可能部位5px，若持续写同样的代码，冗余*/
form input[type=button] {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
/*提炼之，作为调用的方法*/
border-radius(n)
  -webkit-border-radius n;
  -moz-border-radius n;
  border-radius n;

form input[type=button]
  border-radius(5px);
```

> ### @import
将公共变量放在一个文件里，如页面统一边距、字体大小等等，可放在common.stylus里，需要使用时@import filename 引用进来
