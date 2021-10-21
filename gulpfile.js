const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const del = require('del');
const cssmin = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();

function clean() {
  return del('production');
}

function pug2html() {
  return gulp.src('source/pug/pages/*.pug')
  .pipe(plumber())
  .pipe(pug({pretty: true}))
  .pipe(plumber.stop())
  .pipe(gulp.dest('production/'));
}

function html() {
  return gulp.src("production/*.html")
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("production/"));
}


function scss2css() {
  return gulp.src('source/sass/styles.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(sourcemaps.init())
  .pipe(autoprefixer())
  .pipe(cssmin())
  .pipe(plumber.stop())
  .pipe(sourcemaps.write('../css/sourcemaps/'))
  .pipe(gulp.dest('production/css/'));
}

function script() {
  return gulp.src('source/js/main.js')
  .pipe(sourcemaps.init())
  .pipe(babel({
      presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(sourcemaps.write('../js/sourcemaps/'))
  .pipe(gulp.dest('production/js/'));
}

function imageMin() {
  return gulp.src("source/image/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.mozjpeg({progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("production/image"))
}

function copyImages() {
  return gulp.src("source/image/**/*.{png,jpg,svg}")
  .pipe(gulp.dest("production/image"))
}


function createWebp() {
  return gulp.src("source/image/**/*.{jpg,png}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("production/image"))
}

function sprite () {
  return gulp.src("source/image/icons/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("production/image"));
}

exports.default = gulp.series(clean, pug2html, html, scss2css, script);
