var gulp = require('gulp');
var plugin = require('gulp-load-plugins')();
var pngquant = require('imagemin-pngquant');


//清除临时目录 read:false prevents gulp from reading the contents of the file and makes this task a lot faster
gulp.task('clean', function () {
    return gulp.src(['WebContent/css/hash/**/*.*', 'WebContent/utils/hash/**',
        'WebContent/lib/hash/**', 'CmsTemplate/CmsTemplate-clone/**'], {read:false})
        .pipe(plugin.clean());
});

//备份index.html和ftl
gulp.task('backupIndex', ['clean'], function () {
    return gulp.src(['WebContent/index.html'])
        .pipe(plugin.rename('index-clone.html'))
        .pipe(gulp.dest('WebContent'));
});
gulp.task('backupFtl', ['clean'], function () {
    return gulp.src(['CmsTemplate/**/*.ftl'])
        .pipe(gulp.dest('CmsTemplate/CmsTemplate-clone'));
});

//替换静态资源引用 Uglify mangle: Pass false to skip mangling names.
gulp.task('usemin', ['backupIndex', 'backupFtl'], function () {
    return gulp.src('WebContent/index.html')
        .pipe(plugin. usemin({
            css: [function () {return plugin.minifyCss({compatibility: 'ie8'})}, plugin.rev],
            js: [function () {return plugin.uglify({mangle: true})}, plugin.rev]
        }))
        .pipe(gulp.dest('WebContent'));
});

//图片压缩 progressive: false 无损压缩jpg图片;pngquant深度压缩png图片的imagemin插件
gulp.task('imagemin', ['usemin'], function () {
    return gulp.src(['WebContent/css/images/**/*.{png,jpg,gif}'])
        .pipe(plugin.imagemin({progressive: true, use: [pngquant()]}))
        .pipe(plugin.rev())
        .pipe(gulp.dest('WebContent/css/hash/images'))
        .pipe(plugin.rev.manifest({merge:true}))
        .pipe(gulp.dest(''));
});

//替换js、ftl、css、index.html文件里的图片资源
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


gulp.task('build', ['replace', 'replaceCss', 'replaceFtl']);
