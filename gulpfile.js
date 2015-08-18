var gulp = require('gulp')
var source = require('vinyl-source-stream') // Used to stream bundle for further handling
var browserify = require('browserify')
var watchify = require('watchify')
var reactify = require('reactify')
var concat = require('gulp-concat')
var sass = require('gulp-ruby-sass')
var autoprefix = require('gulp-autoprefixer')

gulp.task('browserify', function() {
  var bundler = browserify({
    entries: ['./src/app/main.js'], // Only need initial file, browserify finds the deps
    transform: [reactify], // We want to convert JSX to normal javascript
    debug: true, // Gives us sourcemapping
    cache: {}, packageCache: {}, fullPaths: true// Requirement of watchify
  })
  var watcher  = watchify(bundler)

  return watcher
    .on('update', function () { // When any files update
      var updateStart = Date.now()
      console.log('Updating!')
      watcher.bundle() // Create new bundle that uses the cache for high performance
      .pipe(source('main.js'))
      // This is where you add uglifying etc.
      .pipe(gulp.dest('./build/'))
      console.log('Updated!', (Date.now() - updateStart) + 'ms')
    })
    .bundle() // Create the initial bundle when starting the task
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build/'))
})

gulp.task('scss', function() {
  gulp.watch('src/client/scss/**/*.scss', function() {
    return sass('src/client/scss')
      .pipe(autoprefix({
        browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('src/client/css'))
    })
})

gulp.task('css', function () {
  gulp.watch('src/client/css/**/*.css', function () {
    return gulp.src('src/client/css/**/*.css')
      .pipe(concat('main.css'))
      .pipe(gulp.dest('./build'))
  })
})

gulp.task('default', ['browserify', 'scss', 'css'])