/**
 * gulpfile.js
 *
 * Typo3 Gulp SCSS Autocompiler to CSS + CSS Minifier + CSS Sourcemaps + JS Minifier
 *
 * @author     Sebastian Pieczona
 * @company    ioCron
 * @copyright  2018 Sebastian Pieczona
 * @license    MIT License (see https://github.com/iocron/typo3-gulp-scss/blob/master/LICENSE)
 * @link       https://github.com/iocron/typo3-gulp-scss
 */

'use strict';

// NPM PACKAGES
let gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require("gulp-rename"),
    minify = require("gulp-babel-minify"),
    sourcemaps = require('gulp-sourcemaps'),
    commandExists = require('command-exists'),
    download = require("gulp-download-stream");

// NATIVE NODE MODULES
let fs = require("fs"),
    path = require("path");

// GENERIC VARIABLES
const exec = require('child_process').exec,
      themePath = './Resources/Public/',
      themeName = path.basename(__dirname),
      scssPath = themePath + 'Scss',
      jsPath = themePath + 'JavaScript',
      cssPath = themePath + 'Css',
      imgPath = themePath + 'Images',
      repoUrl = 'https://github.com/iocron/typo3-gulp-scss',
      repoUrlRaw = 'https://raw.githubusercontent.com/iocron/typo3-gulp-scss/master/';

// DEFAULT HELPER TASK
gulp.task('default', function(cb){
  exec('gulp --tasks-simple', function (err, stdout, stderr) {
    console.log("\nAll gulp parameters:\n(Usage Example: \"gulp build\")\n-------------------");
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

// INSTALLER - IDE Plugins for Atom
gulp.task('install:onsave-atom', function(done){
  commandExists('apm').then(function(command){
    fs.stat('.on-save.json', function(err, stat){
      if(err == null){
        // .. file exists already
      } else if(err.code == 'ENOENT'){
        download(repoUrlRaw + '.on-save.json').pipe(gulp.dest("./"));
      } else {
        console.log(err, stat);
        done(err);
      }
    });

    exec('apm install on-save --compatible', function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      console.log("Please restart your IDE so the Plugin can be correctly initialized.");
      done(err);
    });

    done();
  }).catch(function(){
    console.log("The Command \"apm\" (from Atom) was not found or is not accessible on your System.\nSkipped Implementation of the Auto-Save Functionality..");
  });
});

// INSTALLER - IDE Plugins for VSCode
gulp.task('install:onsave-vscode', function(done){
  commandExists('code').then(function(command){
    exec('code --install-extension wk-j.save-and-run', function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      console.log("Please restart your IDE so the Plugin can be correctly initialized.");
      done(err);
    });
  }).catch(function(){
    console.log("The Command \"code\" (from Visual Studio Code) was not found or is not accessible on your System (please read the docs if you want to use it in your vscode environment: https://code.visualstudio.com/docs/editor/command-line).\nSkipped Implementation of the Auto-Save Functionality..");
  });
});

// INSTALLER - IDE Plugins for ATOM AND VSCODE
gulp.task('install:onsave', gulp.parallel('install:onsave-atom', 'install:onsave-vscode'));

// SETUP SYMLINKS (create generic theme symlinks)
gulp.task('setup:symlinks', function(done){
    fs.realpath('../../../fileadmin/' + themeName, function(err, resolvedPath){
        if(err) { console.log(err); }
        console.log("symlink from: ", resolvedPath);

        fs.realpath(imgPath, function(err2, resolvedImgPath){
            if(err2) { console.log(err2); }
            console.log("symlink to: ", resolvedImgPath);

            fs.symlink(resolvedImgPath, resolvedPath + '/themeResources', 'dir', function(err){
                if(err2) { console.log(err); }
            });
        });
    });

    done();
});

// SETUP - FULL SETUP
gulp.task('setup', gulp.series('install:onsave', 'setup:symlinks'));

// UPGRADE / SELF-UPDATER
gulp.task('upgrade', function(done){
  download([
    repoUrlRaw + 'package.json',
    repoUrlRaw + 'package-lock.json',
    repoUrlRaw + 'gulpfile.js'
  ])
  .pipe(gulp.dest("./"));

  exec('npm update', function(err, stdout, stderr){
    if(err == null){
        console.log("npm update.. Dependencies seem to be up to date.");
    } else {
        console.log("npm update.. ", err, stdout, stderr);
    }
  });

  done();
});

// SCSS / SASS COMPILER & MINIFIER
gulp.task('sass:uncompressed', function(done){
  gulp.src(scssPath + '/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(cssPath));
  done();
});

gulp.task('sass:compressed', function(done){
  gulp.src(scssPath + '/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({ suffix:".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(cssPath));
  done();
});

gulp.task('sass:watch', function(done){
    let watcher = gulp.watch(scssPath + '/**/*.scss');
    watcher.on('change', gulp.series('sass:uncompressed', 'sass:compressed'));
});

// JAVASCRIPT COMPRESSION
gulp.task('js:compressed', function(done){
  gulp.src([jsPath + '/**/*.js', '!'+ jsPath +'/**/*.min.js'])
    .pipe(minify())
    .pipe(rename({ suffix:".min" }))
    .pipe(gulp.dest(jsPath));
  done();
});

gulp.task('js:watch', function(done){
  let watcher = gulp.watch([jsPath + '/**/*.js', '!'+ jsPath +'/**/*.min.js']);
  watcher.on('change', gulp.series('js:compressed'));
});

// GLOBAL WATCHER / BUILD COMMANDS
gulp.task('build', gulp.parallel('sass:uncompressed', 'sass:compressed', 'js:compressed'));
gulp.task('watch', gulp.parallel('build', 'sass:watch', 'js:watch'));
