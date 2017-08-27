
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    gutil = require('gulp-util');
    sourcemaps = require('gulp-sourcemaps');

var jsPath = [
    'js/*.js',
    'js/**/*.js',
    '!js/*.min.js'
];

var cssPath = [
    'css/*.css'
];

var lessPath = [
    'less/*.less'
];

var scssPath = [
    'scss/*.scss'
];


////////////////////////////////////////////////// CSS ///////////////////////////////////////////////////////////////

/*
 * Tâche css
 * Commande : "gulp css"
 * Description : Concatene, minify, préfix les fichiers CSS
 */
gulp.task('css', function() {
    gulp.src(cssPath)
        .pipe(minifycss())
        .pipe(autoprefixer('last 2 version'))
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('dist/css'))
        .on('end', function() {
            gutil.log(gutil.colors.yellow('♠ La tâche less est terminée.'));
        });
});

/*
 * Tâche less
 * Commande : "gulp less"
 * Description : Compile les fichiers less, place les fichiers dans le répertoire dist/css et minifie le tout
 */
gulp.task('less', function() {
    gulp.src('less/main.less')
        .pipe(less())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css/'))
        .on('end', function() {
            gutil.log(gutil.colors.yellow('♠ La tâche less est terminée.'));
        });
});

/*
 * Tâche sass
 * Commande : "gulp sass"
 * Description : Compile le fichier main.scss, place ce fichier dans le répertoire css et le minifie
 */
gulp.task('sass', function() {
    return gulp.src('scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
        .on('end', function() {
            gutil.log(gutil.colors.yellow('♠ La tâche sass est terminée.'));
        });
});

////////////////////////////////////////////////// JS ///////////////////////////////////////////////////////////////

/*
 * Tâche jsToMin
 * Commande : "gulp jsToMin"
 * Description : Minifie les fichiers js en conservant la structure initiale et ajoute un sufixe .min 
 */
gulp.task('jsToMin', function() {
    return gulp.src(jsPath, { base: './' })
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./'))
        .on('end', function() {
            gutil.log(gutil.colors.yellow('♠ La tâche jsToMin est terminée.'));
        });
});

/*
 * Tâche js
 * Commande : "gulp js"
 * Description : Minifie et concaténe les fichiers .js en créant un fichier main.min.js et place ce fichier dans dist/js
 */
gulp.task('js', function() {
    return gulp.src(jsPaths)
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'))
        .on('end', function() {
            gutil.log(gutil.colors.yellow('♠ La tâche JavaScript est terminée.'));
        });
});




/*
 * Tâche watch
 * Commande : "gulp watch"
 * Description : Vérifie si un fichier est modifié et si c'est le cas, exécute les tâches placées dans le tableau
 * 1er paramètre est le ou les fichier(s) à vérifier
 * 2ème paramètre sont les tâches à executer en cas de changement
 */
gulp.task('watch', function() {
    gulp.watch(cssPath, ['css']);
    gulp.watch(lessPath, ['less']);
    gulp.watch(scssPath, ['sass']);
    gulp.watch(jsPath, ['jsToMin', 'js']);
});

/*
 * Tâche Default
 * Commande : "gulp"
 * Description : Elle est executée lors de la command gulp
 * Généralement, on y execute toutes les tâches
 */
gulp.task('default', function() {
    gulp.start('css');
    gulp.start('less');
    gulp.start('sass');
    gulp.start('jsToMin');
    gulp.start('js');
});
