'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');

var stripDebug = require('gulp-strip-debug');
var stripComments = require('gulp-strip-comments');
var uncss = require('gulp-uncss');

var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var imagemin = require('gulp-imagemin');
var cssmin = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');

var htmlbuild = require('gulp-htmlbuild');
var clean = require('gulp-clean'); //will delete non-min files for deployment
var git = require('gulp-git');

var paths = {
    scripts: [
        'public_html/app.js',
        'public_html/factories/**/*.js',
        'public_html/aboutGame/**/*.js',
        'public_html/info/**/*.js',
        'public_html/game/**/*.js',
        'public_html/vendor/**/*.js',
        'public_html/lib/**/*.js',
        'public_html/src/**/*.js'
    ],
    images: [
        'public_html/img/**/*',
        'public_html/assets/images/**/*',
        'public_html/icons/**/*'
    ],
    css: [
        'public_html/css/**/*.css',
        'public_html/assets/style/**/*.css'
    ],
    html: [
        'public_html/**/*.html',
        'public_html/game/**/*.html',
        'public_html/aboutGame/**/*.html',
        'public_html/info/**/*.html'
    ]
};

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    /*
    gulp.watch(paths.images, ['images']);
    */
    gulp.watch(paths.css, ['mincss']);
});

//TASK to Remove Console.log and Debugger statements
gulp.task('devstrip', function(){
    return gulp.src('paths.scripts')
        .pipe(stripDebug())
        .pipe(stripComments())
});

//TASK to Remove NonMin & Add Min Script Tags to Index.html
gulp.task('injecthtml', function(){
    gulp.src(['public_html/index.html'])
        .pipe(htmlbuild({
            js: htmlbuild.preprocess.js(function(block){
                block.write('minified/allfiles.min.js');
                block.end();
            }),
            css: htmlbuild.preprocess.css(function(block){
                block.write('minified/stylesheet.min.css');
                block.end();
            })
//        .pipe(gulp.dest('public_html/index.html'))    
    }))
    //.pipe(gulp.dest('./')); Needed?
});

gulp.task('minhtml', function(){
    gulp.src(paths.html)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(rename({
            extname: '.min.html'
        }))
        .pipe(gulp.dest('public_html/minified'))
});

gulp.task('scripts', function() {
    //output and put script in build folder
    return gulp.src(paths.scripts)
        //concat and uglify scripts
        .pipe(concat('allfiles.js'))
        .pipe(uglify().on('error', gutil.log))
        //rename minified file, then place in public folder
        .pipe(rename({
            extname: '.min.js'
        }))
//        .pipe(gulp.dest('public_html/minified'));

});

//TASK to Minify All Images - Currently only reduces size by 1.5MB, using API instead
/*gulp.task('minimgs', function(){
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 6}))
        .pipe(gulp.dest('minified'));
});*/

//TASK to Remove Unused CSS
/*gulp.task('delcss', function(){
   return gulp.src(paths.css)
        .pipe(uncss(paths.html))
//        .pipe(gulp.dest('./css'))
});*/

//TASK to Minify All CSS
gulp.task('mincss', function() {
    return gulp.src(paths.css)
        .pipe(cssmin({
            compatibility: 'ie8'
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('public_html/minified'));
});

//TASK to delete non-minified files, to-be-used after minification ONLY
gulp.task('cleanup', function(){
    return gulp.src([paths.scripts, paths.html, paths.css], {read: false})
        .pipe(clean())
});

//Start of Git TASKS
gulp.task('clone', function(){
    git.clone('https://github.com/sunbentboulders/Dream-Dash-WebVersion.git', function (err) {
        if (err) throw err;
  });
});

gulp.task('checkout', function(){
    git.checkout('branchName', function (err) {
        if (err) throw err;
    });
});

gulp.task('pull', function(){
    git.pull('upstream', ' ', {args: '--rebase'}, function (err) {
        if (err) throw err;
    });
});

gulp.task('push', function(){
    git.push('origin', 'master', {args: " -f"}, function (err) {
        if (err) throw err;
    });
});

gulp.task('default', [
    'watch', 
    'mincss',
    'minhtml'
]);

gulp.task('deploy', [
    'watch', 
    'devstrip',
//    'cleanup',
    'scripts', 
//    'delcss', 
    'mincss', 
    'injecthtml', 
    'minhtml'
]);