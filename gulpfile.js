// 引入主文件 gulp 模块
const gulp = require('gulp');

// 引入需要用来处理特定任务的插件
    //图片处理插件
const imagemin = require('gulp-imagemin');
//压缩文件  
const uglify = require('gulp-uglify');
//处理sass
const sass = require('gulp-sass');
//合并文件
const concat = require('gulp-concat');

/*  
    gulp 是以文件流的方式来处理文件的,有.pipe()方法,
    来把处理的文件流下一个方法处理
    --Top level funtion
    gulp.task -- define tasks
    gulp.src  -- point to files to use
    gulp.dest -- points to folder to output
    gulp.wathc -- watch files and folders for changes
*/

//Logs message
gulp.task('message',function(){
    return console.log('gulp is running...');
});
//在终瑞中 输入 gulp message  就会运行这个message名




//此任务只指定了源文件,然后产生到指定的文件夹中,中间没有任何其他操作.
gulp.task('copyHtml',function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

//如果 任务 需要做一此特殊的处理,就要用到插件,插件需要先安装到开发依赖,然后引入此文件里
    //如 gulp-imagemin
gulp.task('imageMin', () =>
	gulp.src('src/images/*')              //指定源,导入到gulp,形成流
		.pipe(imagemin())                  //pipe 把文件流交流imgemin()处理 后又形成流
		.pipe(gulp.dest('dist/images'))    //流  又交到gulp dest 处理,生成最终文件
);

// mimify js
gulp.task('minify',function(){
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//compile sass
gulp.task('sass',function(){
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('dist/css'))
});

//script
gulp.task('scripts',function(){
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('default',['message','copyHtml','imageMin','sass','scripts']);
//默认任务,如果运行gulp 没有指定任务名(task函数第一个参数就是任务名),就运行这个默认的
//第二个参数,可以是一个函数,那就和上面的普通任务没什么区别,就运行所在的函数指定的任务
//第二个参数,也可以是一个数组,数组项可以是各个 任务的名字(sting)  然后,gulp 就可以一次
//执行数组里的任务


//watch 任务,就可以在指定的 文件改变时  自动运行 特定的任务
gulp.task('watch',function(){
    gulp.watch('src/js/*.js',['scripts']);
    gulp.watch('src/images/*',['imageMin']);
    gulp.watch('src/sass/*.scss',['sass']);
    gulp.watch('src/*.html',['copyHtml']);
});
