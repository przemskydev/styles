const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');

gulp.task('sass', () => {
  return gulp.src('./app/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('watch', () => {
  gulp.watch('./app/sass/*/*.scss', gulp.series('sass'))
})

gulp.task('image', ()=>{
  gulp.src('./app/images/*.+(png|jpg)')
  .pipe(imagemin())
  .pipe(gulp.dest('./dist/images'))
})