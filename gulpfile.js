var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var angularFilesort = require('gulp-angular-filesort');
var ngAnnotate = require('gulp-ng-annotate');
var inject = require('gulp-inject');
var watch = require('gulp-watch'),
  filter = require('gulp-filter'),
  through = require('through2'),
  del = require('del'),
  shell = require('gulp-shell'),
  plumber = require('gulp-plumber');
var paths = {
  sass: ['app/**/*.scss'],
  js: ['app/**/*.js'],
  assets: ['app/assets/**/*'],
  templates: ['app/**/*.html', '!./app/main.html'],
  settings: ['app_settings'],
  build: 'www'
};

gulp.task('default', ['sass', 'js']);

gulp.task('sass', function(done) {
  gulp.src('./app/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(paths.build + '/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.build + '/css/'))
    .on('end', done);
});

gulp.task('index', function () {
  gulp.src('./app/main.html')
    .pipe(
      inject(
        gulp.src(paths.js)
          .pipe(plumber())
          .pipe(angularFilesort()), {relative: true}
      )
    )
    .pipe(gulp.dest(paths.build));
});

function createCopyTasks(taskName, source, dest, customTaskCallback){
  function baseCopyTask(extendBaseTaskCallback){
    var myFilter = filter(function (file) {
      return file.event === 'unlink';
    });

    var baseTask = gulp.src(source);

    if(extendBaseTaskCallback){
      baseTask = extendBaseTaskCallback(baseTask);
    }

    if(customTaskCallback){
      baseTask = customTaskCallback(baseTask);
    }

    baseTask.pipe(gulp.dest(dest))
      .pipe(myFilter)
      .pipe(through.obj(function (chunk, enc, cb) {
        del(chunk.path);
        cb(null, chunk);
      }));
  }

  gulp.task(taskName, function(){
    baseCopyTask();
  });

  gulp.task(taskName + "-watch", function(){
    baseCopyTask(function(task){
      return task.pipe(watch(source));
    });
  });
}

createCopyTasks('js', paths.js, paths.build, function(task){
  return task.pipe(ngAnnotate());
});
createCopyTasks('assets', paths.assets, paths.build + "/assets");
createCopyTasks('templates', paths.templates, paths.build);

gulp.task('build', ['sass', 'js', 'assets', 'templates', 'index']);

gulp.task('watch', ['js-watch', 'assets-watch', 'templates-watch'], function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js.concat(['./app/index.html']), ['index']);
});

gulp.task('install', shell.task(['bower install', 'ionic state restore', 'ionic browser add crosswalk']));

gulp.task('clean', function () {
  del.sync([paths.build + '/**', '!' + paths.build, '!' + paths.build + '/lib/**']);
});

gulp.task('env-dev', function () {
  gulp.src(paths.settings + '/settings.dev.js')
    .pipe(rename('settings.js'))
    .pipe(gulp.dest(paths.build));
});

gulp.task('env-staging', function () {
  gulp.src(paths.settings + '/settings.staging.js')
    .pipe(rename('settings.js'))
    .pipe(gulp.dest(paths.build));
});

gulp.task('env-production', function () {
  gulp.src(paths.settings + '/settings.production.js')
    .pipe(rename('settings.js'))
    .pipe(gulp.dest(paths.build));
});


