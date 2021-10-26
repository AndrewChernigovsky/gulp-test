const
{src,dest,series,parallel,watch} = require('gulp'),
autoprefixer = require('gulp-autoprefixer'),
sourcemaps = require('gulp-sourcemaps'),
plumber = require('gulp-plumber'),
pug = require('gulp-pug'),
del = require('del'),
cssmin = require('gulp-clean-css'),
sass = require('gulp-sass')(require('sass')),
uglify = require('gulp-uglify'),
babel = require('gulp-babel'),
htmlmin = require('gulp-htmlmin'),
rename = require("gulp-rename"),
webp = require("gulp-webp"),
svgstore = require("gulp-svgstore"),
sync = require('browser-sync').create(),
ttf2woff = require('gulp-ttf2woff'),
ttf2woff2 = require('gulp-ttf2woff2'),
notify = require('gulp-notify'),
qgcmq = require('gulp-group-css-media-queries'),
concat = require('gulp-concat');

function fontW() {
  return src(['source/fonts/*.ttf'])
    .pipe(ttf2woff())
    .pipe(dest('production/fonts/'));
};

function fontW2() {
  return src(['source/fonts/*.ttf'])
    .pipe(ttf2woff2())
    .pipe(dest('production/fonts/'));

};

function clean() {
  return del('production');
}

function pug2html() {
  return src('source/pug/pages/*.pug')
    .pipe(plumber())
    .pipe(pug({pretty: true}))
    .pipe(plumber.stop())
    .pipe(sync.stream())
    .pipe(dest('production/'))
}

function html() {
  return src("production/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(sync.stream())
    .pipe(dest("production/"))
}


function scss2css() {

  return src('source/sass/styles.scss')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(qgcmq())
    .pipe(cssmin())
    .pipe(sync.stream())
    .pipe(sourcemaps.write())
    .pipe(rename('style.min.css'))
    .pipe(plumber.stop())
    .pipe(dest('production/css/'))
    .pipe(notify())
}

function script() {
  return src(["source/js/**/*.js","!source/js/libs/jquery-3.6.0.min.js"])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: [['@babel/env', {"modules": false}]]
    }))
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(rename('main.min.js'))
    .pipe(sync.stream())
    .pipe(dest('production/js/'));
}

function copyJquery() {
  return src(['source/js/libs/jquery-3.6.0.min.js'])
  .pipe(dest('production/js/libs/'))
}

function libs() {
  return src(['source/js/libs/swiper-bundle.min.js'])
    .pipe(concat('libs.js'))
    .pipe(dest('production/js/libs/'))
  }

function imageMin() {
  return src("source/image/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(dest("production/image"))
}

function copyImages() {
  return src("source/image/**/*.{png,jpg,svg}")
    .pipe(sync.stream())
    .pipe(dest("production/image"))

}

function copy (done){
  return src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/image/**/*.svg",
    "!source/image/icons/*.svg",
    ], {
      base: "source"
    })
    .pipe(sync.stream())
    .pipe(dest("production"))
    done()
}

function createWebp() {
  return src("source/image/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(sync.stream())
    .pipe(dest("production/image"))
  }

function sprite() {
  return src("source/image/icons/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(sync.stream())
    .pipe(dest("production/image"))
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
  watch("source/pug/**/*.pug", series(pug2html, reload));
  watch("source/sass/**/*.scss", series(scss2css, reload));
  watch("source/js/**/*.js", series(script, reload));
  watch("source/*.html", series(html, reload));
  watch("source/image/**/*.{jpg,png,svg,ico}", series(copyImages, reload));
}

exports.default = series(
  clean,
  copy,
  copyImages,
  fontW,
  fontW2,

  parallel(
    pug2html,
    html,
    scss2css,
    script,
    sprite,
    createWebp,
    copyJquery,
  ),

  series(
    server,
    watcher
  )
);

exports.build = series(
  clean,
  copy,
  imageMin,

  parallel(
    pug2html,
    html,
    scss2css,
    script,
    sprite,
    createWebp
  ),
  series(
    server,
    watcher
  )
);
