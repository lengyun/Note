gulp入门

Gulp基于Node.js的前端构建工具，通过Gulp的插件可以实现前端代码的编译（sass、less、stylus）、压缩、测试；图片的压缩；浏览器自动刷新，还有许多强大的插件。（常用插件在这里找：http://gulpjs.com/plugins/）

安装 首先我们要全局安装一遍：

$ npm install gulp -g

接着我们要进去到项目的根目录再安装一遍（确保你根目录存在package.json文件）：

$ npm install gulp --save-dev （—save-dev这个属性会将条目保存到你package.json的devDependencies里面）

gulp的API介绍 使用gulp，仅需知道4个API即可：gulp.task(),gulp.src(),gulp.dest(),gulp.watch()，所以很容易就能掌握。 gulp的使用流程一般是这样子的：首先通过gulp.src()方法获取到我们想要处理的文件流，然后把文件流通过pipe方法导入到gulp的插件中，最后把经过插件处理后的流再通过pipe方法导入到gulp.dest()中

```javascript
gulp.src()
   这个方法来读取你需要操作的文件。 用来获取流的，但要注意这个流里的内容不是原始的文件流，而是一个虚拟文件对象流(Vinyl files)，这个虚拟文件对象中存储着原始文件的路径、文件名、内容等信息
   gulp.src(globs[, options])
      globs参数是文件匹配模式(类似正则表达式)，用来匹配文件路径(包括文件名)，当然这里也可以直接指定某个具体的文件路径。当有多个匹配模式时，该参数可以为一个数组。
      options为可选参数。通常情况下我们不需要用到。
   eg:
     //使用数组的方式来匹配多种文件
     gulp.src(['js/*.js','css/*.css','*.html'])

gulp.dest()
   该方法是用来写文件的，其语法为：
   gulp.dest(path[,options])
      path为写入文件的路径
      options为一个可选的参数对象，通常我们不需要用到
   eg:
    gulp.src('app/src/**/*.css') //此时base的值为app/src,也就是说它的base路径为app/src
         //设该模式匹配到了文件 app/src/css/normal.css
        .pipe(gulp.dest('dist')) //用dist替换掉base路径，最终得到 dist/css/normal.css

gulp.task()
    该方法用来定义任务
    gulp.task(name[, deps], fn)
       name 为任务名
       deps 是当前定义的任务需要依赖的其他任务，为一个数组。当前定义的任务会在所有依赖的任务执行完毕后才开始执行。如果没有依赖，则可省略这个参数
       fn 为任务函数，我们把任务要执行的代码都写在里面。该参数也是可选的。
    gulp.task('mytask', ['array', 'of', 'task', 'names'], function() { //定义一个有依赖的任务
      // Do something
    });

gulp.watch()
   gulp.watch()用来监视文件的变化，当文件发生变化后，我们可以利用它来执行相应的任务，例如文件压缩等。
   gulp.watch(glob[, opts], tasks)
       glob 为要监视的文件匹配模式，规则和用法与gulp.src()方法中的glob相同。
       opts 为一个可选的配置对象，通常不需要用到
       tasks 为文件变化后要执行的任务，为一个数组
   eg:
     gulp.task('uglify',function(){
       //do something
     });
     gulp.task('reload',function(){
       //do something
     });
     gulp.watch('js/**/*.js', ['uglify','reload']);
```

安装Gulp插件 通过package.json 里配置引用 我们将要使用Gulp插件来完成我们以下任务： stylus的编译（gulp-stylus） 自动添加css前缀（gulp-autoprefixer） 压缩css（gulp-minify-css） js代码校验（gulp-jshint） 合并js文件（gulp-concat） 压缩js代码（gulp-uglify） 压缩图片（gulp-imagemin） 图片缓存，只有图片更改了才重新压缩（gulp-cache） 清除文件（del） 替换html文件里静态资源（gulp-rev-replace） 给文件加版本号（gulp-rev）

```javascript
gulp插件介绍：http://colobu.com/2014/11/17/gulp-plugins-introduction/
```
新建Gulpfile文件，运行gulp 组件安装完毕后，我们需要新建gulpfile文件以指定gulp需要为我们完成什么任务。 执行 gulp default