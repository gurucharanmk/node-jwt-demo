const gulp = require('gulp');

const eslint = require('gulp-eslint');
const excludeGitignore = require('gulp-exclude-gitignore');

const del = require('del');
const babel = require('gulp-babel');


// Initialize the babel transpiler so ES2015/ES6 files gets compiled on runtime
// Used only for development purpose
require('babel-register');

gulp.task('babel', ['clean'], () => {
  gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('clean', () => {
  // del(['lib']);
  del.sync(['lib']);
});

gulp.task('lint', () => {
  gulp.src('**/*.js')
    // ESLint ignores files with "node_modules" and other path mentioned in .gitignore files.
    .pipe(excludeGitignore())
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs of gulp-eslint).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});


gulp.task('transpile', ['babel']);
