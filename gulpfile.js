var gulp = require('gulp'),
   livereload = require('gulp-livereload'),// auto-reload browser when files are changed 
   wiredep = require('wiredep').stream,
   gutil = require('gulp-util'),
   connect = require('gulp-connect'),      // run a local dev server
   inject = require('gulp-inject'),        // inject app dependency includes on index.html
   open = require('gulp-open');            // open a URL in the browser

// File locations
var jsSources = ['app/app.js', 'app/*.js'],
   cssSources = ['app/**/*.css'],
   htmlSources = ['**/*.html'];

// Used for injections, file path must in order
var paths = ['./bower_components/','app/app.js','./app/*.js','./app/**/*.css'];

// Connect and Create Server
gulp.task('connect', function() {
   connect.server({
       root: '.',
       livereload: true
   })
});

// Sets URi and Browser
gulp.task('app', function(){
   var options = {
       uri: 'http://localhost:8080',
       app: 'Google Chrome'
   };
   gulp.src('./index.html')
       .pipe(open(options));
});


// Watch the sources below
gulp.task('watch', function() {
   gulp.watch(jsSources, ['js']);
   gulp.watch(cssSources, ['css']);
   gulp.watch(htmlSources, ['html']);
});

// Injectables
gulp.task('injectables', function() {
   var sources = gulp.src(paths, {read: false});
   return gulp.src('index.html')
       .pipe(wiredep())
       .pipe(inject(sources))
       .pipe(gulp.dest('.'));
});
// reloads individual task
gulp.task('js', function() {
   gulp.src(jsSources)
       .pipe(connect.reload())
});

gulp.task('html', function() {
   gulp.src(htmlSources)
       .pipe(connect.reload())
});

gulp.task('css', function() {
   gulp.src(cssSources)
       .pipe(connect.reload())
});





// Start Server and dependencies
gulp.task('serve', ['connect', 'watch', 'injectables', 'app']);




