## Latte 项目中Web trends 介绍

### 1.  面向对象：
> Latte前端开发人员

### 2.  Webtrends作用：
> 跟踪用户进入网站的渠道，用户在站点中操作习惯，页面跳转流程跟踪等。

### 3.  实现原理：
> 监控页面按钮，下拉框，a连接等form元素连接ulr 等用户操作行为，将数据通过一个图片请求发送给后台

请求实例：
```
https://sdc.cmbchina.com/dcsknzf0q00000s9iyvgzijo3_9i7f/dcs.gif?
&dcsdat=1456825476197
&dcssip=xyk.cmbchina.com
&dcsuri=/Latte/myAccount/settledBillStage
&dcsqry=?WT.refp=/Latte/myAccount/index/settledBillStage$
&dcsref=https://xyk.cmbchina.com/Latte/login?WT.mc_inner_id=
&WT.mc_id=
&WT.refp=/Latte/myAccindex/myIndex$
&WT.co_f=26579e08a2c64e281101456796363123
&WT.vt_sid=26579e08a2c64e281101456796363123.1456825378731
&WT.tz=8
&WT.bh=17
&WT.ul=zh-CN
&WT.cd=24
&WT.sr=353x627
&WT.jo=Yes
&WT.ti=34b652ecf52f19ca068aa30c9b4a6107
&WT.js=Yes
&WT.bs=353x627
&WT.fi=No
&WT.em=uri
&WT.le=GBK
&WT.tv=8.0.2
&WT.cfp=2f3e27855044844c8a1afea2bb2f2d9f
&WT.vt_f_tlh=1456825473
```

### 4.  webtrends引入：
    <script  type="text/javascript" src="utils/webtrends/sdc_web.js"></script>
### 5.  Latte中是如何使用的
> Html中P-name属性：
>> 每个a连接在cms配置中都有设置p-name属性的选项

> V-href添加
>> v-href中会添加对应的webtrends参数信息

### 6.  各参数名称作用

参数 | 作用 | 调用方法 | 实例
----|----|----|----
dcsdat|时间|
dcssip|主域名或ip|
dcsuri|url路径|
dcsqry|url参数|
dcsref|载入当前文档的文档的 URL|document.referrer|
WT.mc_id|外部连接标识|
WT.mc_inner_id|内部连接标识|
WT.refp|URL的路径名和pName|
WT.co_f|使用随机数和时间生成一个标识符放在cooker中|random()|
WT.vt_sid|WT.co_f加上时间戳|
WT.tz|时区|getTimezoneOffset()|
WT.bh|当前小时数|getHours()|
WT.ul|操作系统语言|navigator.appName == "Netscape" ? navigator.language: navigator.userLanguage;|
WT.cd|浏览颜色分辨率|navigator.appName == "Netscape" ? screen.pixelDepth: screen.colorDepth;|
WT.sr|浏览器屏幕的宽和高|screen.width + "x" + screen.height;|
WT.jo|浏览器是否支持并启用了Java|navigator.javaEnabled()|
WT.ti|页面title|
WT.js|webtrends是否加载|
WT.bs|窗口的宽高|window.innerWidth + "x" + window.innerHeight;|
WT.fi|浏览器插件|navigator.plugins:window.ActiveXObject|
WT.em|编码方式是encodeURIComponent还是escape|
WT.le|文件格式是gbk还是utf-8|document.defaultCharset:document.characterSet|
WT.tv|webtrends版本号|
WT.cfp|[指纹识别](http://valve.github.io/fingerprintjs/)|
WT.vt_f_tlh|当前时间标识|