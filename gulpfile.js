let {
  dest,
  src,
  watch,
  series
} = require('gulp');

const sass = require('gulp-sass');

const fileExists = require('file-exists');
const gulpif = require('gulp-if');



//Fontawesome task
const webFontsPath = 'node_modules/@fortawesome/fontawesome-free/webfonts/*';
const distWebfonts = 'dist/webfonts';

// use a file of webfonts to check it's existing then make a copy in dist
const fontawesomeWebfont =
  './node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.eot';

// to check if file exists or not for testing purposes
console.log(fileExists.sync(fontawesomeWebfont)); // OUTPUTS: true or false

// copy webfonts folder if it exists
// because our task contains asynchronous code
// use async before our task
// to avoid getting this error `Did you forget to signal async completion`
async function copyfontawesomeWebfontsTask() {
  return gulpif(
    fileExists.sync(fontawesomeWebfont),
    src([webFontsPath]).pipe(dest(distWebfonts))
  );
}
//End of Fontawesome task


//index.html copy
function copy() {
  return src('index.html')
    .pipe(dest('dist/'));
}


//converting scss to css
function scssTask() {
  return src('app/scss/styles.scss')
    .pipe(sass())
    .pipe(dest('dist/css'));
}



// Watch Task
function watchTask() {
  watch('app/**/*.scss', series(scssTask)); //if more tasks to watch in a signle statement then use, watch(['app/**/*.scss','...','...'], series(scssTask, ... , ...));
  watch('./index.html', copy);
}


// Default Gulp Task
exports.default = series(
  copyfontawesomeWebfontsTask,
  copy,
  scssTask,
  watchTask,
);
