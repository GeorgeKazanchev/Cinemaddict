import gulp from 'gulp';
import rename from 'gulp-rename';
import gulpSass from 'gulp-sass';
import nodeSass from 'node-sass';

const sass = gulpSass(nodeSass);

const sassToCSS = async () => {
    return gulp.src('./src/scss/style.scss')
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./public/css/'));
};

gulp.task('build', sassToCSS);