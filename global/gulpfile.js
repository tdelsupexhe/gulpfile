var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    size = require('gulp-filesize'),
    less = require('gulp-less'),
    path = require('path'),
    sourcemaps = require('gulp-sourcemaps');

var jsPaths = [
    'js/*.js',
    '!js/*.min.js'
];

var cssPaths = [
    'css/*.css'
];

var lessPaths = [
    'less/*.less'
];

var scssPaths = [
    'scss/*.scss'
];


/*
 * Tâche Less
 * Commande : "gulp less"
 * Description : Compile les fichiers less en conservant la structure initiale
 */
gulp.task('less', function() {
    return gulp.src(lessPaths)
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./css'));
});

/*
 * Tâche Styles Less
 * Commande : "gulp styles-less"
 * Description : Compile les fichiers less, place les fichiers dans le répertoire dist/css et minifie le tout
 */
gulp.task('styles-less', function() {
    gulp.src(lessPaths)
        .pipe(less())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css/'));
});

// css task
gulp.task('styles', function() {
    return gulp.src('css/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(rename('main.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('css/'))
        .pipe(size())
        .on('end', function() {
            gutil.log(gutil.colors.yellow('♠ La tâche CSS est terminée.'));
        });
});

gulp.task('scripts', function() {
    return gulp.src(jsPaths, { base: './' })
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./'))
        .on('end', function() {
            gutil.log(gutil.colors.yellow('♠ La tâche JavaScript est terminée.'));
        });
});

gulp.task('watch', function() {
    gulp.watch('css/*.scss', ['styles']);
    gulp.watch('css/**/*.scss', ['styles']);
    gulp.watch('js/*.js', ['scripts']);
});

// default task
gulp.task('default', function() {
    gulp.start('watch');
});
