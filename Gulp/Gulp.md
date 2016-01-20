> ### __目录结构__

1. Gulpfile.js: gulp自动化部署详细配置

2. Package.json:基本信息以及包依赖关系

3. node_modules:存放gulp依赖插件的文件夹


> ### __Gulpfile任务操作__

1. 使用操作：进入Gulpfile.js所在目录，在当前目录下输入gulp build默认处理所有的任务
 
2. 执行的任务：合并CSS/JS、JS压缩、CSS压缩、图片压缩、添加hash、替换js/html/ftl/css页面中的静态资源引用。

3. 任务简易流程：
 * 先定义使用的插件，并配置文件路径
 * __copy__: 复制index.html至index-clone.html，保证clone的文件为原始版本
 * __imagemin__: 图片压缩、添加hash
 * __replace__: 替换js/html/ftl/css文件中对图片的引用
 * __build__: css合并压缩并添加hash，js合并压缩并添加hash，usemin替换index.html中静态资源的引用


> ### __gulp包和任务插件__

 * 根据已有的package.json文件中的依赖项进行一次安装, npm install

 * 或者根据需要安装的任务插件进行单独安装，npm install --save-dev gulpPackageName

 * 安装插件的时候会在根目录生成一个node_modules，并存放插件
 
| Gulp Package Name | Usage |
| -------- | -------- |
| gulp-rename   | 重命名文件 |
| gulp-imagemin   | 压缩图片   |
| imagemin-pngquant   | 深度压缩图片   |
| gulp-minify-css   | 压缩css   |
| gulp-minify-html   |  压缩html   |
| gulp-uglify   | 压缩js   |
| gulp-rev   | 文件名添加hash   |
| gulp-rev-collector   | 将引用替换成hash过的名称   |
| gulp-load-plugins   | 自动加载插件   |



> ### __Gulpfile.js详细配置__

 * __任务一：清除临时目录__

1. gulp-load-plugins 自动帮你加载package.json里的gulp插件，如要使用gulp-rename则用plugin.rename即可，如要使用gulp-rev-collector则用plugin.revCollector驼峰式命名方法。它不会一开始就加载所有package.json里的gulp插件，而是在我们需要用到某个插件的时候，才去加载那个插件。

2. clean任务中，read:false 代表gulp直接做操作而不需要读取文件内容，这样使得操作更快

```javascript
var gulp = require('gulp');
var plugin = require('gulp-load-plugins')();
var pngquant = require('imagemin-pngquant');

gulp.task('clean', function () {
    return gulp.src(['WebContent/css/hash/**/*.*', 'WebContent/utils/hash/**',
        'WebContent/lib/hash/**', 'CmsTemplate/CmsTemplate-clone/**'], {read:false})
        .pipe(plugin.clean());
});
```

 * __任务二：备份index.html和ftl文件__

1. 备份index.html原始内容至index-clone.html文件里，保证index-clone.html里的内容为原始版本，以便恢复

2. 备份所有ftl至CmsTemplate-clone，因为原来的ftl文件中有部分图片文件名会修改为压缩加版本号的路径名

```javascript
gulp.task('backupIndex', ['clean'], function () {
    return gulp.src(['WebContent/index.html'])
        .pipe(plugin.rename('index-clone.html'))
        .pipe(gulp.dest('WebContent'));
});
gulp.task('backupFtl', ['clean'], function () {
    return gulp.src(['CmsTemplate/**/*.ftl'])
        .pipe(gulp.dest('CmsTemplate/CmsTemplate-clone'));
});
```

 * __任务三：替换静态资源引用__

1. plugin.usemin:替换静态资源引用 

2. plugin.minifyCss、uglify都表示压缩相应文件。其中plugin.uglify中，mangle:true表示混淆压缩

```javascript
gulp.task('usemin', ['backupIndex', 'backupFtl'], function () {
    return gulp.src('WebContent/index.html')
        .pipe(plugin. usemin({
            css: [function () {return plugin.minifyCss({compatibility: 'ie8'})}, plugin.rev],
            js: [function () {return plugin.uglify({mangle: true})}, plugin.rev]
        }))
        .pipe(gulp.dest('WebContent'));
});
```

3. 需要替换的文件中相应结构化文件(html)的块声明:

```html
<!-- build:<type><path> -->
	..list of script/css tags
<!-- endbuild -->
如
<!-- build:js utils/hash/miscellaneous.min.js -->
<script type="text/javascript" src="utils/jsencrypt.min.js"></script>
<script type="text/javascript" src="utils/miscellaneous.js"></script>
<!-- endbuild -->
```

 * __任务四：压缩图片添加版本号__

1. plugin.imagemin: 图片压缩，其中progressive: false表示无损压缩jpg图片，pngquant插件用于深度压缩png图片
 
2. plugin.rev为压缩过的图片添加版本号，plugin.rev.manifest生成资源替换表，merge:true表示merge已有的manifest.json文件，它可以帮助替换其他文件中对资源的引用路径

```javascript
gulp.task('imagemin', ['usemin'], function () {
    return gulp.src(['WebContent/css/images/**/*.{png,jpg,gif}'])
        .pipe(plugin.imagemin({progressive: true, use: [pngquant()]}))
        .pipe(plugin.rev())
        .pipe(gulp.dest('WebContent/css/hash/images'))
        .pipe(plugin.rev.manifest({merge:true}))
        .pipe(gulp.dest(''));
});

```

 * __任务五：替换js、ftl、css、index.html文件里的图片资源__

1. plugin.revCollector: 替换图片资源路径，replaceReved:true表示即便需要变动的html文件中原来被替换过的地方现在还可以替换

2. gulp.src中的前一个文件manifest.json表示需要对照的资源替换表，后一个文件表示需要替换的文件，在这里除了index-clone其他文件都做了替换。

```javascript
gulp.task('replace', ['imagemin'], function () {
    return gulp.src(['rev-manifest.json', 'WebContent/**/*.js', 'WebContent/index.html',
        '!WebContent/node_modules/**', '!WebContent/utils/*.js', '!WebContent/utils/head/**/*.*'])
        .pipe(plugin.revCollector({replaceReved: true, dirReplacements: {'images':'hash/images'}}))
        .pipe(gulp.dest('WebContent'));
});
gulp.task('replaceFtl', ['imagemin'], function () {
    return gulp.src(['rev-manifest.json', 'CmsTemplate/**/*.ftl', '!CmsTemplate/CmsTemplate-clone/**/*.ftl'])
        .pipe(plugin.revCollector({replaceReved: true, dirReplacements: {'images':'hash/images'}}))
        .pipe(gulp.dest('CmsTemplate'));
});
gulp.task('replaceCss', ['imagemin'], function () {
    return gulp.src(['rev-manifest.json', 'WebContent/css/hash/*.css'])
        .pipe(plugin.revCollector({replaceReved: true}))
        .pipe(gulp.dest('WebContent/css/hash'));
});
```

 * __最终任务：等待所有任务完成__

```javascript
gulp.task('build', ['replace', 'replaceCss', 'replaceFtl']);
```
