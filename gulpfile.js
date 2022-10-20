const gulp = require('gulp');
const rename = require('gulp-rename');
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

const paths = {
  styles: {
    src: 'src/styles/**/*.css',
    dest: 'build/styles/',
  },
  html: {
    src: 'src/*.html',
    dest: 'build/',
  },
  fonts: {
    src: 'src/fonts/**',
    dest: 'build/fonts/',
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'build/js/',
  },
};

/**
 * removed build catalog
 */
function removeBuild() {
  console.info('removed build catalog');

  return del(['build/**/*']);
}

/**
 * cleaning fonts build directory
 */
function cleanFonts() {
  return del(['build/fonts/']);
}

/**
 * control and replacement of changed html
 */
function copyHtml() {
  console.info('html file replaced');

  return gulp
    .src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

/**
 * assembly and control of style changes
 */
function styles() {
  console.info('style file has been compiled');

  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(concat('style.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

/**
 * control and replacement of changed fonts
 */
function fonts() {
  console.info('all font files replaced');

  return gulp
    .src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest))
    .pipe(browserSync.stream());
}

/**
 * assembly and change control of scripts
 */
function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
}

/**
 * tracking changes in project files.
 */
function observer() {
  console.info('observer has been started');

  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.html.src, copyHtml);
  gulp.watch(paths.html.dest).on('change', browserSync.reload);
  gulp.watch(paths.fonts.src, fonts);
  gulp.watch(paths.fonts.src).on('unlink', cleanFonts);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.scripts.dest).on('change', browserSync.reload);
}

/**
 * start and restart the project server
 */
function sync() {
  console.info('browser sync function has been started');

  browserSync.init({
    server: {
      baseDir: 'build/',
    },
  });
}

/**
 * Assembly of the final project
 */
gulp.task(
  'default',
  gulp.parallel(removeBuild, copyHtml, fonts, styles, scripts, observer, sync)
);
gulp.task('build', gulp.series(removeBuild, copyHtml, fonts, styles, scripts));
