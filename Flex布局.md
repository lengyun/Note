#Flex布局

Flex是Flexible Box的缩写，意为“弹性布局”用来为盒状模型提供最大的灵活性

> 任何一个容器都可以指定为 Flex 布局。

```css
.box{
  display: flex;
  display: -webkit-flex; /* Safari */
}
/*行内元素*/
.box{
  display: inline-flex;
}
```

> 设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

## 基本概念

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。



> 容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做`main start`，结束位置叫做`main end`；交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`。

> 项目默认沿主轴排列。单个项目占据的主轴空间叫做`main size`，占据的交叉轴空间叫做`cross size`。

## 容器属性

|                   |                                          |                                          |
| ----------------- | ---------------------------------------- | ---------------------------------------- |
| `flex-direction`  | 决定主轴的方向（即项目的排列方向）                        | row \| row-reverse \| column \| column-reverse |
| ` flex-wrap`      | 一条轴线排不下，如何换行。                            | nowrap \| wrap \| wrap-reverse           |
| `flex-flow`       | `flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap` | flex-start \| flex-end \| center \| space-between \| space-around; |
| `justify-content` | 项目在主轴上的对齐方式                              | flex-start \| flex-end \| center \| baseline \| stretch |
| `align-items`     | 定义项目在交叉轴上如何对齐                            | flex-start \| flex-end \| center \| baseline \| stretch; |
| ` align-content`  | 定义了多根轴线的对齐方式                             | flex-start \| flex-end \| center \| space-between \| space-around \| stretch; |

## 项目的属性

|               |                                          |
| ------------- | ---------------------------------------- |
| `order`       | 定义项目的排列顺序。数值越小，排列越靠前，默认为0                |
| `flex-grow`   | 定义项目的放大比例。默认为`0`，即存在剩余空间，也不放大。 为1，则它们将等分剩余空间。为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍 |
| `flex-shrink` | 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。 都为1，当空间不足时，都将等比例缩小。 为0，其他项目都为1，则空间不足时，前者不缩小 |
| `flex-basis`  | 定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。 可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间。 |
| `flex`        | 是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。 |
| `align-self`  | 允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch` |

