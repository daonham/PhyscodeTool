/**
 * Nhamdv - Code in Physcode
 */

var projectURL = 'http://localhost/...'; // Thay URL site local vao day.

const gulp = require( 'gulp' );
const autoprefixer = require( 'autoprefixer' );
const browserSync = require( 'browser-sync' ).create();
const lineec = require( 'gulp-line-ending-corrector' );
const notify = require( 'gulp-notify' );
const sass = require( 'gulp-sass' )( require( 'sass' ) );
const cache = require( 'gulp-cache' );
const plumber = require( 'gulp-plumber' );
const sourcemaps = require( 'gulp-sourcemaps' );

const errorHandler = r => notify.onError( '\n\n❌  ==> ERROR: <%= error.message %>\n' )( r );

gulp.task( 'clear', function( done ) {
	return cache.clearAll( done );
} );

gulp.task( 'browser-sync', function( done ) {
	browserSync.init( {
		proxy: projectURL,
		open: true,
		injectChanges: true,
	} );
	done();
} );

gulp.task( 'styles', () => {
	return gulp
		.src( ['./assets/sass/style.scss'] )
		.pipe( plumber( errorHandler ) )
		.pipe( sourcemaps.init() )
		.pipe( sass.sync().on( 'error', sass.logError ) )
		.on( 'error', sass.logError )
		.pipe( postcss( [ autoprefixer() ] ) )
		.pipe( sourcemaps.write( './' ) )
		.pipe( lineec() )
		.pipe( gulp.dest( './' ) )
		.pipe( browserSync.stream() );
} );

gulp.task( 'watch', gulp.series( 'clear', 'browser-sync', () => {
	gulp.watch( ['./assets/sass/**/*.scss','inc/shortcodes/**/**/assets/css/*.scss'], gulp.parallel( 'styles' ) );
} ) );