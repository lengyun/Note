**开始**

HammerJS是一个开源的库，可以识别由 touch, mouse 和 pointerEvents 触发的系列手势。它非常小巧，压缩后仅有3.96kb，并没有多余的脚本依赖。

你可以从[Github](https://github.com/hammerjs/hammer.js/tree/master/)上获取最新版的HammerJS，或者直接下载[压缩版](http://hammerjs.github.io/dist/hammer.min.js) 或 未压缩的[开发版](http://hammerjs.github.io/dist/hammer.js)的HammerJS源码。

**使用**

HammerJS的使用方式非常简单，只要将库引入到文件中，并创建一个新的实例即可：

```js
var hammertime = new Hammer(myElement, myOptions);
hammertime.on('pan', function(ev) {
    console.log(ev);
});
```

它会默认为这个对象添加一系列识别器，包括 tap<点>, doubletap<双点击>, press<按住>, 水平方位的pan<平移> 和 swipe<快速滑动>, 以及多触点的 pinch<捏放> 和 rotate<旋转>识别器。不过呢，其中的 pinch 和 rotate 默认是不可用的，因为它们可能会导致元素被卡住，如果你想启用它们，可以加上这两句：

```js
hammertime.get('pinch').set({ enable: true });
hammertime.get('rotate').set({ enable: true });
```

若要允许识别器识别垂直方位或全部方位的 pan 和 swipe，可以这么写：

```
hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
```

另建议加上如下meta标签，防止doubletap 或 pinch 缩放了viewport：

```
<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
```