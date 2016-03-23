encodeURIComponent()编码URL组件
decodeURIComponent()解码URL组件
encodeURI()字符串作为 URI 进行编码
decodeURI()解码某个编码的 URI
如果 URI 组件中含有分隔符，比如 ? 和 #，则应当使用 encodeURIComponent() 方法分别对各组件进行编码。
escape()对字符串进行编码，这样就可以在所有的计算机上读取该字符串。
unescape()对由 escape() 编码的字符串进行解码

parseFloat() 函数可解析一个字符串，并返回一个浮点数。
toFixed(2) 方法可把 Number 四舍五入为指定小数位数的数字。
instanceof
exec() 方法用于检索字符串中的正则表达式的匹配。
referrer 属性可返回载入当前文档的文档的 URL。
Navigator 对象包含有关浏览器的信息。
Screen 对象包含有关客户端显示屏幕的信息。（http://www.w3school.com.cn/jsref/dom_obj_screen.asp）
getTimezoneOffset() 方法可返回格林威治时间和本地时间之间的时差，以分钟为单位
getTime() 方法可返回距 1970 年 1 月 1 日之间的毫秒数。
random() 方法可返回介于 0 ~ 1 之间的一个随机数。
parseInt() 函数可解析一个字符串，并返回一个整数
javaEnabled() 方法可返回一个布尔值，该值指示浏览器是否支持并启用了 Java。如果是，则返回 true，否则返回 false。
