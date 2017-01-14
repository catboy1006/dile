var gulp = require('gulp');
var stylus = require('gulp-stylus');
var cssmin = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');
var uglify = require('gulp-uglify');

//编译css
gulp.task('stylus', function(){
   gulp.src('src/css/index.styl')
   .pipe(stylus({
       compress:true
   }))
   //.pipe(cssmin())
   //.pipe(sourcemaps.write())
   .pipe(gulp.dest('src/dist/css'))

});

//压缩js
gulp.task('script', function() {
    gulp.src('src/script/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('src/dist/js'));
});

gulp.task('vue', function(){
     gulp.src('node_modules/vue/dist/vue.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('src/dist/js'));
  
})
gulp.task('webserver', function() {
    gulp.src('src')
    .pipe(webserver({
        livereload: true,
        directoryListing: false,
        port:2333,
        open: true 
    }));
});

//监听变化
gulp.task('testWatch', function () {
    gulp.watch('src/**/*.styl', ['stylus']); 
    gulp.watch('src/**/*.js', ['script']); 
});

//启动serve
gulp.task('serve',['webserver','testWatch','vue','script'])
