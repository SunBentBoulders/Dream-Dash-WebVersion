'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cssmin = require('gulp-minify-css');
/*var changed = require('gulp-changed');
var mocha = require('gulp-mocha');*/

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
    audio: 'public_html/assets/bgm/**/*',
    css: [
        'public_html/css/**/*.css',
        'public_html/assets/style/**/*.css'
    ]
    //will need to add style.css at root to this task, or can combine with other style/css
};

gulp.task('watch', function(){
    gulp.watch(paths.scripts, ['scripts']);
    /*
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.audio, ['audio']);
    */
    gulp.watch(paths.css, ['css']);
});

gulp.task('scripts', function(){
    //output and put script in build folder
    return gulp.src(paths.scripts)
        //concat and uglify scripts
        .pipe(concat('allfiles.js'))
        .pipe(uglify().on('error', gutil.log))
        //rename minified file, then place in public folder
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('public_html/minified'));

});

//TASK to Minify All Images - Currently only reduces size by 1.5MB, using API instead
/*gulp.task('minimgs', function(){
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 6}))
        .pipe(gulp.dest('minified'));
});*/

//TASK to Minify All CSS
gulp.task('mincss', function(){
    return gulp.src(paths.css)
        /*.pipe(concat('allfiles.css'))*/
        .pipe(cssmin({compatibility: 'ie8'}))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('public_html/minified'))
});

/* START of MOCHA TEST-RELATED
gulp.task('mocha', function(){
    return gulp.src(['src/*.js'], {read: false}) //read option "false" allows files to be piped to mocha first
        .pipe(mocha({reporter: 'nyan'}))
        //reporter option "nyan" is just one of many we can use
        .on('error', gutil.log);
});

gulp.task('watch-mocha', function(){
    gulp.watch('src/**', ['mocha']);
});
END OF MOCHA TEST-RELATED
*/

//Removed ImageMin from default task, will compress elsewhere
gulp.task('default', ['watch', 'scripts', 'mincss']);