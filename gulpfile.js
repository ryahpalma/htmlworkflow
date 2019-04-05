var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Static Server + Watching SCSS/HTML files
gulp.task('server', ['sass'], function() {

    browserSync.init({
        server: "."
    });
// If you need to change your directory, change the values below "new_directory/*.scss"
    gulp.watch("scss/*.scss", ['sass']); //Watcher folder directory and file extension 
    gulp.watch("*.html").on('change', browserSync.reload); // Watcher of BrowserSync
});

// Compile SASS into CSS & auto-inject into browsers
gulp.task('sass', function() {
// If you need to change your directory, change the values below "new_directory/*.scss"
    return gulp.src('scss/*.scss') // Folder directory and file extension
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError)) // In OutputStyle select if you want compact,expanded,nested or compressed
        .pipe(gulp.dest('assets/css')) // Select the directory for the CSS file "new_directory/css"
        .pipe(browserSync.stream());
});

gulp.task('default', ['server']); // Initialize all tasks
