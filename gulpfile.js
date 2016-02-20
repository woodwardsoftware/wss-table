var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var merge2 = require('merge2');
var templateCache = require('gulp-angular-templatecache');

gulp.task('build', function () {
  var jsFiles = merge2(gulp.src([
      'src/wss-table.module.js',
      'src/wss-table.directive.js',
      'src/wss-table-cell.directive.js'
    ]),
    gulp.src('src/wss-table.html')
      .pipe(templateCache({
        module: 'wss-table'
      })));

  var minJs = jsFiles.pipe(concat('wss-table.min.js'))
    .pipe(uglify());

  var devJs = jsFiles.pipe(concat('wss-table.dev.js'));

  var css = gulp.src('src/wss-table.css');

  return merge2([devJs, minJs, css])
    .pipe(gulp.dest('dist'));
});

