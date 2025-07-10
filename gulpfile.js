const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const imagemin = require('gulp-imagemin')
const uglify = require('gulp-uglify')

function scripts(){
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
}

function styles(){
    return gulp.src('./src/styles/*.scss') //Quais arquivos o gulop vai selecionar
        .pipe(sass({ outputStyle: 'compressed' })) //Pega os arquivos selecionados na linha acima e os comprime
        .pipe(gulp.dest('./dist/css')) //Joga o arquivo comprimido na pasta de destino
}

function images(){
    return gulp.src('./src/images/**/*') //Quais arquivos o gulp vai selecionar
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images')) //Joga o arquivo comprimido na pasta de destino
}

exports.default = gulp.parallel(styles, images, scripts)

exports.watch = function(){
    gulp.watch('./src/styles/*.scss', gulp.parallel(styles))
    gulp.watch('./src/js/*.js', gulp.parallel(scripts))
}