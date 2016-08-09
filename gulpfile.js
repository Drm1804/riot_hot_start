var gulp = require('gulp');
var riot = require('gulp-riot');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var paths = {
    src: 'src',
    build: 'build',
    riotSrcPath: 'src/components/*.html',
    riotBuildPath: 'build/js',
    assetsSrcPath: 'src/assets/**/**',
    assetsBuildPath: 'build/assets',
    srcIndex: 'src/*.html'
};

gulp.task('riot', function () {
    gulp.src(paths.riotSrcPath)
        .pipe(riot())
        .pipe(gulp.dest(paths.riotBuildPath));
});

gulp.task('browser-sync', ['riot', 'copyAssets', 'copyIndex'], function () {
    browserSync.init({
        server: {
            baseDir: './build'
        },
        port: 9000,
        open: 'external'
    })
});

gulp.task('copyAssets', function () {
    gulp.src(paths.assetsSrcPath)
        .pipe(gulp.dest(paths.assetsBuildPath));
});

gulp.task('copyIndex', function () {
    gulp.src(paths.srcIndex)
        .pipe(gulp.dest(paths.build));
});


gulp.task('default', ['browser-sync'], function () {
    gulp.watch(paths.riotSrcPath, ['riot']);
    gulp.watch(paths.assetsSrcPath, ['copyAssets']);
    gulp.watch(paths.srcIndex, ['copyIndex']);
    gulp.watch(paths.build + '/**/**').on('change', reload);
});
