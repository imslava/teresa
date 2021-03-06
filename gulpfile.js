// gulp
const { src, dest, parallel, series, watch } = require('gulp');

// модули
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const newer = require('gulp-newer');
const del = require('del');
const cryptoRandomString = require('crypto-random-string');
const replace = require('gulp-replace');
const fileinclude = require('gulp-file-include');

let randomVersion = cryptoRandomString({length: 12});

// функции
function browsersync() {
	browserSync.init({
		server: { baseDir: 'app/' },
		notify: false,
		online: true
	})
}

// подключение скриптов и объединение в один файл
function scripts() {
	return src([
		'node_modules/jquery/dist/jquery.min.js',
		'app/js/vendor/jquery.cookie.js',
		'app/js/common.js',
		])
	.pipe(concat('app.min.js'))
	// .pipe(uglify())
	.pipe(dest('app/js/'))
	.pipe(browserSync.stream())
}

// стили
function styles() {
	return src('app/sass/main.sass')
	.pipe(sass())
	.pipe(concat('app.min.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	// .pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } ))
	.pipe(dest('app/css/'))
	.pipe(browserSync.stream())
}

// автообновление
function startwatch() {
	watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
	watch('app/**/sass/**/*', styles);
	watch('app/pages/*.html', htmlInclude);
	watch('app/pages/**/*.html', htmlInclude);
	watch('app/*.html').on('change', browserSync.reload);
}

// сборка
function buildcopy() {
	return src([
		'app/css/app.min.css',
		'app/js/app.min.js',
		'app/js/plan-table.js',
		'app/img/**/*',
		'app/favicon/**/*',
		'app/fonts/**/*',
		'app/*.html',
		], { base: 'app' })
	.pipe(dest('dist'))
}

// кэширование
function versionFile(){
	return src('dist/*.html')
		.pipe(replace('?v=hash', '?v=' + randomVersion + ''))
	.pipe(dest('dist'))
}

function cleandist() {
	return del('dist/**/*', { force: true })
}

// сборка отдельных html файлов
function htmlInclude() {
  return src(['./app/pages/*.html'])
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('./app'))
    .pipe(browserSync.stream());
}

// таски
exports.fileinclude = htmlInclude;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;

exports.default = parallel(htmlInclude, styles, scripts, browsersync, startwatch);
exports.build = series(htmlInclude, cleandist, styles, scripts, buildcopy, versionFile);