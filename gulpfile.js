const gulp = require('gulp');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const del = require('del');

function pugtohtml() {
    return gulp.src('build/pages/*.pug')
    .pipe(plumber())
    .pipe(pug({pretty: true}))
    .pipe(plumber.stop())
    .pipe(gulp.dest('source/'));
  }
  
function scsstoCss() {
  return gulp.src('build/static/styles/style.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(sourcemaps.init())
  .pipe(cssmin())
  .pipe(autoprefixer())
  .pipe(plumber.stop())
  .pipe(sourcemaps.write('../css/sourcemaps/'))
  .pipe(gulp.dest('source/css/'));
}

function script() {
  return gulp.src('build/static/js/main.js')
  .pipe(sourcemaps.init())
  .pipe(babel({
      presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(sourcemaps.write('../js/sourcemaps/'))
  .pipe(gulp.dest('source/js/'));
}

// function clean() {
//   return 
//     del('build')
// }
   

exports.default = gulp.series(pugtohtml, scsstoCss, script);