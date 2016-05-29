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
    'js/**/*.js',
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
        .pipe(gulp.dest('./css'))
        .on('end', function() {
            gutil.log(gutil.colors.yellow('♠ La tâche Less est terminée.'));
        });
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
        .pipe(gulp.dest('dist/css/'))
        .on('end', function() {
            gutil.log(gutil.colors.yellow('♠ La tâche Style Less est terminée.'));
        });
});

/*
 * Tâche Scss
 * Commande : "gulp scss"
 * Description : Compile le fichier main.scss, place ce fichier dans le répertoire css et le minifie
 */
gulp.task('scss', function() {
    return gulp.src('css/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(rename('main.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('css/'))
        .pipe(size())
        .on('end', function() {
            gutil.log(gutil.colors.yellow('♠ La tâche SCSS est terminée.'));
        });
});

/*
 * Tâche js
 * Commande : "gulp js"
 * Description : Minifie les fichiers js en conservant la structure initiale et ajoute un sufixe .min 
 */
gulp.task('js', function() {
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

/*
 * Tâche Scripts
 * Commande : "gulp scripts"
 * Description : Minifie et concaténe les fichiers .js en créant un fichier main.min.js et place ce fichier dans dist/js
 */
gulp.task('scripts', function() {
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
 * Tâche Browserify
 * Commande : "gulp browserify"
 * Description : Quand vous incluez des modules dans un fichier main.js sans utiliser node comme server, 
 * vous aurez besoin de requireJS ou browserify afin que votre navigateur comprenne ces inclusions...
 * Cette tâche va interpretter ces inclusions et les traduires pour le navigateur.
 * 
 * Généralement, cette tâche est executée avant de minifier!
 *
 */
gulp.task('browserify', function() {
    // Single entry point to browserify
    gulp.src('js/main.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: !gulp.env.production
        }))
        .pipe(gulp.dest('js/build'))
});

/*
 * Tâche watch
 * Commande : "gulp watch"
 * Description : Vérifie si un fichier est modifié et si c'est le cas, exécute les tâches placées dans le tableau
 * 1er paramètre est le ou les fichier(s) à vérifier
 * 2ème paramètre sont les tâches à executer en cas de changement
 */
gulp.task('watch', function() {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('js/*.js', ['scripts']);
});

/*
 * Tâche Default
 * Commande : "gulp"
 * Description : Elle est executée lors de la command gulp
 * Généralement, on y execute une tâche watch
 */
gulp.task('default', function() {
    gulp.start('watch');
});
