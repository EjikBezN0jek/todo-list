const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const plumber = require("gulp-plumber");
const del = require("del");
const ghpages = require('gh-pages');

function copyTask() {
  return gulp.src(['src/*.html', "src/*.js"])
    .pipe(gulp.dest("build"))
}

function copyImgTask() {
  return gulp.src("src/img/**/*.{svg,png,jpg}")
    .pipe(gulp.dest("build/img"))
}

function cleanTask() {
  return del("build")
}

function styleTask() {
  return gulp.src('src/styles/main.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
}

function serveTask() {
  browserSync.init({server: {baseDir: "build"}});
  gulp.watch('src/styles/*.scss', styleTask);
  gulp.watch('src/script.js', copyTask).on('change', browserSync.reload);
  gulp.watch('src/index.html', copyTask).on('change', browserSync.reload);
  gulp.watch('src/img/', copyImgTask).on('change', browserSync.reload);
}

async function publishTask() {
  await ghpages.publish(
    'build',
    {branch: 'gh-pages', repo: 'https://github.com/EjikBezN0jek/todo-list.git'},
    function(err) {});
}

exports.style = styleTask;
exports.copy = copyTask;
exports.clean = cleanTask;
exports.serve = serveTask;
exports.publish = publishTask;
exports.build = gulp.series(
  cleanTask,
  copyTask,
  copyImgTask,
  styleTask
  // gulp.parallel(pugTask, styleTask, jsTask, imageTask)
);