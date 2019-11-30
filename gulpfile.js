const gulp = require('gulp');
gulp.task('processHTML', () => {
    
});
gulp.task('processHTML', () => {
  gulp.src('index.html')
});
gulp.task('processHTML', () => {
  gulp.src('*.html')
    .pipe(gulp.dest('dist'));
});
gulp.task('processJS', () => {
  gulp.src('js/*.js')
    .pipe(gulp.dest('dist'));
});
const jshint = require('gulp-jshint');
gulp.task('processJS', () => {
  gulp.src('js/*.js')
    .pipe(jshint({
        esversion: 6
    }))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('dist'));
});
const babel = require('gulp-babel');
gulp.task('processJS', () => {
  gulp.src('js/script.js')
    .pipe(jshint({
      esversion: 6
    }))
    .pipe(jshint.reporter('default'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('dist'));
});
const uglify = require('gulp-uglify');
gulp.task('processJS', () => {
  gulp.src('js/script.js')
    .pipe(jshint({
      esversion: 6
    }))
    .pipe(jshint.reporter('default'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
const runSequence = require('run-sequence');
gulp.task('default', (callback) => {
  runSequence(['processHTML', 'processJS', 'babelPolyfill'], callback);
});