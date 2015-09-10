/**
 * Created by Just on 10.09.2015.
 */
'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    styl = require('gulp-stylus'),
    jade = require('gulp-jade'),
    jadeInherit = require('gulp-jade-inheritance'),
    css = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    concat = require ('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: { //Указываем куда складывать, готовые после сборки файлы
        html: 'dist/',
        js: 'dist/assets/scripts/',
        css: 'dist/assets/style/',
        img: 'dist/assets/images/',
        fonts: 'dist/assets/fonts/'
    },
    src: { //Пути откуда брать исходники
        //html: 'app/*.html', //Берем все файлы с расширением .html
        jade: 'app/template/pages/*.jade', // Откуда брать jade файлы
        js: ['bower_components/jquery/dist/jquery.js', 'bower_components/jquery-ui/jquery-ui.js', 'bower_components/bootstrap/dist/js/bootstrap.min.js', 'app/scripts/*.js'], //Берем скрипты и файлы стилей
        style: ['app/sass/*.scss', 'bower_components/normalize.css/normalize.css', 'bower_components/bootstrap/dist/css/bootstrap.css'],
        img: 'app/images/*.*', //Берем картинки всех расширений из папки и из вложенных каталогов
        fonts: 'app/fonts/**/*.*'
    },
    watch: { //Указываем, за изменением каких файлов мы хотим наблюдать
        //html: 'app/**/*.html',
        jade: 'app/template/**/*.jade',
        js: 'app/scripts/**/*.js',
        style: 'app/sass/**/*.scss',
        img: 'app/images/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    clean: './dist'
};

var config = {
    server: {
        baseDir: "./dist"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_New"
};

/*
gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});
*/

gulp.task('jade:build', function() {
  var YOUR_LOCALS = {};

  gulp.src(path.src.jade)
    .pipe(rigger()) //Прогоним через rigger
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(concat('common.min.js')) // собираем все в 1 файл
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

/*
gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.styl
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(styl()) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(concat('common.min.css')) // собираем все в 1 файл
        .pipe(cssmin()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});
*/

gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(concat('common.min.css')) // собираем все в 1 файл
        .pipe(cssmin()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin()) //Сожмем их
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    //'html:build',
    'jade:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

gulp.task('watch', function(){
    /*
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    */
    watch([path.watch.jade], function(event, cb) {
        gulp.start('jade:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);