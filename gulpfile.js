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
const rename = require("gulp-rename");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const sync = require('browser-sync').create();
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const concat = require('gulp-concat');

function fontW() {
  return gulp.src(['source/fonts/*.ttf'])
  .pipe(ttf2woff())
  .pipe(gulp.dest('production/fonts/'));
};

function fontW2() {
  return gulp.src(['source/fonts/*.ttf'])
    .pipe(ttf2woff2())
    .pipe(gulp.dest('production/fonts/'));

};

function clean() {
  return del('production');
}

function pug2html() {
  return gulp.src('source/pug/pages/*.pug')
  .pipe(plumber())
  .pipe(pug({pretty: true}))
  .pipe(plumber.stop())
  .pipe(sync.stream())
  .pipe(gulp.dest('production/'))
}

function html() {
  return gulp.src("production/*.html")
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(sync.stream())
  .pipe(gulp.dest("production/"))
}


function scss2css() {
  return gulp.src('source/sass/styles.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(cssmin())
  .pipe(autoprefixer())
  .pipe(plumber.stop())
  .pipe(rename('style.min.css'))
  .pipe(sync.stream())
  .pipe(gulp.dest('production/css/'))
}

function script() {
  return gulp.src('source/js/main.js')
  .pipe(sourcemaps.init())
  .pipe(babel({
      presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(rename('main.min.js'))
  .pipe(sync.stream())
  .pipe(gulp.dest('production/js/'))
}

function copyJquery() {
  return gulp.src(['source/js/libs/jquery-3.6.0.min.js'])
  .pipe(gulp.dest('production/js/libs/'))
}

function libs() {
  return gulp.src(['source/js/libs/swiper-bundle.min.js'])
  .pipe(concat('libs.js'))
  .pipe(gulp.dest('production/js/libs/'))
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
  .pipe(sync.stream())
  .pipe(gulp.dest("production/image"))

}

function copy (done){
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/image/**/*.svg",
    "!source/image/icons/*.svg",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("production"))
  done()
}

function createWebp() {
  return gulp.src("source/image/**/*.{jpg,png}")
  .pipe(webp({quality: 90}))
  .pipe(sync.stream())
  .pipe(gulp.dest("production/image"))
}

function sprite() {
  return gulp.src("source/image/icons/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(sync.stream())
    .pipe(gulp.dest("production/image"))
}

function server(done){
  sync.init({
    server: {
      baseDir: "production"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

function reload (done){
  sync.reload()
  done();
}

function watcher(){
  gulp.watch("source/pug/**/*.pug", gulp.series(pug2html, reload));
  gulp.watch("source/sass/**/*.scss", gulp.series(scss2css, reload));
  gulp.watch("source/js/script.js", gulp.series(script, reload));
  gulp.watch("source/*.html", gulp.series(html, reload));
  gulp.watch("source/image/**/*.{jpg,png,svg,ico}", gulp.series(copyImages, reload));
}

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  fontW,
  fontW2,

  gulp.parallel(
    pug2html,
    html,
    scss2css,
    script,
    sprite,
    createWebp,
    copyJquery
  ),

  gulp.series(
    server,
    watcher
  )
);

exports.build = gulp.series(
  clean,
  copy,
  imageMin,
  gulp.parallel(
    pug2html,
    html,
    scss2css,
    script,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
