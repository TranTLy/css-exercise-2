'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

sass.compiler = require('node-sass');

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', gulp.series('sass'));
});

gulp.task('sass', function () {
   return gulp.src('./sass/**/*.scss')
   .pipe(concat('style.scss'))
   .pipe(sass().on('error', sass.logError))
   .pipe(postcss([autoprefixer()]))
   .pipe(gulp.dest('./'));
});