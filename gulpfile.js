const gulp = require('gulp');
const excludeGitignore = require('gulp-exclude-gitignore');

const del = require('del');
const babel = require('gulp-babel');

gulp.task('babel', ['clean'], () => {
  gulp.src('src/**/*.js*')
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('clean', () => {
  del('lib/*').then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
  //del('lib');
});

gulp.task('prepublish', ['babel']);
