> 本文根据IMSP小组的 __[Webpack Demo](http://99.48.236.51/imsp/imsp-admin-gateway)__，针对webpack初学者进行基本学习

Webpack是一个模块打包器，它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。

它将所有的css png js html等等资源都当做模块，进行组织和打包，生成静态资源，实现按需加载，同时为开发者提供便利。


### __首先，来看配置文件[webpack.config.js](http://99.48.236.51/imsp/imsp-admin-gateway/blob/master/webpack.config.js)__
```javascript
module.exports = {
   /* 入口文件*/
    entry: {
        app: ["./app/main.js"]
    },
    // pack file
    output: {
        // 打包文件存放的绝对路径
        path: "public/dist",
        // 打包后的文件名
        filename: "bundle.js",
        // lazy pack file [id] 1,2,3.....
        chunkFilename: "[id].bundle.js",
        //网站运行时的访问路径
        publicPath: 'dist/'
    },
    //加载器
    module: {
        // 通过管道方式链式调用，每个 loader 可以把资源转换成任意格式并传递给下一个 loader ，但是最后一个 loader 必须返回 JavaScript。
        loaders: [
            //css加载器
            { test: /\.css$/, loader: "style!css"},
            //stylus加载器
            { test: /\.styl$/, loader: 'style!css!stylus' },
            //图片加载器
            {test: /\.(eot|woff|gif|png|svg|ttf)(\?v=(\d|\.)*)*$/, loader: "file-loader"}
        ]
    },
    // 默认模块路径
    resolve: {
        modulesDirectories: ["node_modules", "app/components"]
    }
};
```

> entry

1. 配置入口文件
2. 入口文件可以为一个文件，可以为多个文件，可以为一个对象

> output

1. 打包文件输出的路径，即生成的bundle.js文件存放路径，外界可访问到的路径，所以可以取名为public
2. chunkFilename，配置懒加载的打包文件名，如[demo](http://99.48.236.51/imsp/imsp-admin-gateway/tree/master/public/dist)中生成的1.bundle.js 和2.bundle.js就是按照"[id].bundle.js"的规则生成的，根据页面需要按需增量加载1或者2

> loader

1. Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。
2. Loader 可以理解为是模块和资源的转换器，它本身是一个函数，接受源文件作为参数，返回转换的结果。这样，我们就可以通过 require 来加载任何类型的模块或文件，比如 CoffeeScript、 JSX、 LESS 或图片。
3. 上述例子中，css加载器，从右至左，针对一个stylus文件，将其当成一个模块资源，首先使用stylus加载器，再使用css加载器，最后使用style加载器将其插入到页面中，加载器之间用!进行连接。
4. loader有很多，用npm管理，可查询文档 

> resolve

1. 上述例子中，配置了默认模块路径，如入口文件中require了某个资源，可以不需要指定其路径，可以看到 [demo](http://99.48.236.51/imsp/imsp-admin-gateway/blob/master/app/main.js)中，angular\jquery\routerbuild都是从modulesDirectories配置的路径中查找到的
2. 可以配置默认文件后缀，这样，require的模块就不需要再写文件后缀了
3. 其他配置参考文档


### __其次，来看入口文件[./app/main.js](http://99.48.236.51/imsp/imsp-admin-gateway/blob/master/app/main.js)__
```javascript
var angular = require('angular');
jQuery = $ = require('jquery');
require('angular-ui-router');
require('ocLazyLoad');
_ = require('lodash');
var app = angular.module('app', ['ui.router', 'oc.lazyLoad']);

//require('helloworld')(app);
//require('test')(app);
require('routerBuilder')(app);
angular.bootstrap(document.body, ['app']);
```

1. 将所需要的资源require进来，每一个资源都当做一个模块
2. 路径不需要注明，因为在webpack.config.js里的resolve里已经做了配置，webpack会自动在modulesDirectories里的目录下寻找模块资源
3. app/components里有helloworld test routerbuild三个模块，每个模块的入口为相应的index.js，即，require的模块会从相应的资源里找index.js


### __接着，我们可以来看每一个模块的组织结构，如[helloworld模块](http://99.48.236.51/imsp/imsp-admin-gateway/tree/master/app/components/helloworld)__

```javascript
var helloworldCtrl = require('./helloworldCtrl.js');
require('./style.css');
var mod = angular.module('app.helloworld', []);
mod.controller('helloworldCtrl', ['$scope', helloworldCtrl]);
module.exports = mod;
```

1. 可以看到，该模块包含了所有需要的资源，html\js\css，入口为index.js如上
2. index.js中把该模块所需要的资源同样require进来了，可以理解为它把helloworld这个组件所需要的资源都引进来，然后暴露一个入口给别人，只要别人require了它，就可以从这个mod入口进去，获取其他资源
3. 这种组件化开发的方式也是非常流行的，开发团队可以很容易划分任务，开发者可以很轻易地定位问题，互不干扰，新人也很轻松地梳理项目并贡献力量

### __紧接着，我们再来看更细小的一个模块资源，比如[helloworldCtrl](http://99.48.236.51/imsp/imsp-admin-gateway/blob/master/app/components/helloworld/helloworldCtrl.js)__

```javascript
// helloworldCtrl.js
module.exports = function($scope){
    $scope.name = 'hellow world';
     console.log('hello world!');
}
```

1. 这里，直接把controller包装成一个对象暴露出去，任何要使用它的只要require它就行了，比如index.js
2. webpack就是通过这个require的方式层层引入所需资源


### __最后，看[routerBuilder](http://99.48.236.51/imsp/imsp-admin-gateway/blob/master/app/components/routerBuilder/index.js)模块，即app/main.js里require的模块，网站进来，先找入口文件main.js，然后获取相应资源，即routerBuilder，再通过它进行路由分发，获取所需模块__

```javascript
module.exports = function(app) {
    app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
        //app.controller = $controllerProvider.register;
   
        $urlRouterProvider.otherwise('/helloworld');
        $stateProvider
            .state('helloworld', {
                url: "/helloworld",
                templateUrl: require("file!../helloworld/template.html"),
                controller: 'helloworldCtrl',
                resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    var deferred = $q.defer();

                    require.ensure([], function (require) {
                      var mod = require('helloworld');
                      $ocLazyLoad.load({
                        name: mod.name,
                      });
                      
                      deferred.resolve(mod.controller);
                    });

                    return deferred.promise;
                }]
            }).state('test', {
                url: "/test",
                templateUrl: require("file!../test/template.html"),
                controller: 'testCtrl',
                resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    var deferred = $q.defer();

                    require.ensure([], function (require) {
                      var mod = require('test');
                      $ocLazyLoad.load({
                        name: mod.name,
                      });
                      
                      deferred.resolve(mod.controller);
                    });

                    return deferred.promise;
                }]
            });
    }]);
};
```

1.  这里使用的是angular的路由规则，若不熟悉的开发者先熟悉angular
2.  若路由为helloworld，则做相应的操作，这里不赘述
3.  需要强调的是，这里使用了懒加载，而templateUrl是将相应的html文件通过file加载器根据webpack.config.js的output的规则生成相应的[html](http://99.48.236.51/imsp/imsp-admin-gateway/blob/master/public/dist/abfa204b1f78a1d11d31102929d0fe6c.html)，再将该文件名包括路径返回给templateUrl


### __关于webpack项目学习就到这里，看到这里应该对webpack的机制和实现有了一定的了解，相应的原理和理论还需要自行去学习和研究__