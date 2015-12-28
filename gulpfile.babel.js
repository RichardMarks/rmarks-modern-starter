// transforms input name string to camel casing
// eg 'gulp-sequence' to 'gulpSequence'
function camel(name) {
    return name.replace(/-[a-z]/g,
        match => match[1].toUpperCase());
}

// import gulp modules into global namespace as convenient shorter names
// 'gulpSequence' shall be 'sequence'
require('matchdep')
    .filterDev(['gulp*'])
        .forEach(module => {
            global[camel(module.replace(/^gulp-/, ''))] = require(module);
        });

// import es6 friendly gulp functions
import {task, src, dest, watch} from 'gulp-es-next';
import rimraf from 'rimraf';
import del from 'del';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import webpackTestConfig from './webpack.testing.config';
import WebpackDevServer from 'webpack-dev-server';
import packageJson from "./package.json";

// constants for configuring the tasks
const log = util.log;
const env = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;
const TEST_PORT = process.env.TEST_PORT || 3001;
const DIST_DIR = 'dist';
const DIST_INTERMEDIATE_DIR = 'dist-intermediate';
const GEN_DIR = `${DIST_INTERMEDIATE_DIR}/generated`;
const BUILD_DIR = 'build';
const TEST_DIR = 'build_tests';
const SRC_STATIC_DIR = 'src/static';
const TEST_STATIC_DIR = 'test/static';
const INDEX_HTML = 'src/index.html';
const INDEX_JS_IN = '<!-- inject:app:js -->';
const INDEX_EXT = '<!-- inject:app:{{ext}} -->';
const INDEX_JS_OUT = '<script src="generated/main.js"></script>';
const TEST_INDEX_HTML = 'test/index.html';

// copies static files from one directory to another
function copyStatic(sourceDir, destDir) {
    return src(sourceDir).pipe(changed(destDir)).pipe(dest(destDir)).pipe(size({title: 'static'}));
}

// injects payload into index at token position and writes to destDir
function injectIndex(indexPath, injectToken, injectPayload, destDir) {
    return src(indexPath).pipe(injectString.after(injectToken, injectPayload)).pipe(dest(destDir));
}

// fires up a development server
function devServer(serveDir, config, port) {
    let server = new WebpackDevServer(webpack(config), {
        contentBase: serveDir,
        publicPath: config.output.publicPath,
        watchOptions: {
            aggregateTimeout: 100
        }
    });
    return server.listen(port, '0.0.0.0', err => {
        if (err) {
            throw new PluginError('webpack-dev-server', err);
        }
        log(`[${packageJson.name} serve]`, `Listening at 0.0.0.0:${port}`);
    });
}

task('default', () => log('you want gulp serve, gulp test, gulp dist, or gulp clean'));

// main tasks
task('serve', sequence('serve:clean', 'serve:index', 'serve:start'));
task('test', sequence('test:clean', 'test:index', 'test:start'));
task('dist', sequence('dist:clean', 'dist:build', 'dist:index'));
task('clean', sequence('serve:clean', 'dist:clean', 'test:clean'));

// sub-tasks for development
task('serve:clean', cb => rimraf(BUILD_DIR, cb));
task('serve:static', () => copyStatic([`${SRC_STATIC_DIR}/**`], BUILD_DIR));
task('serve:index', () => injectIndex(INDEX_HTML, INDEX_JS_IN, INDEX_JS_OUT, BUILD_DIR));
task('serve:start', ['serve:static'], () => devServer(BUILD_DIR, webpackConfig(true, BUILD_DIR, PORT), PORT));

// sub-tasks for testing
task('test:clean', cb => rimraf(TEST_DIR, cb));
task('test:static', () => copyStatic([`${TEST_STATIC_DIR}/**`], TEST_DIR));
task('test:index', () => injectIndex(TEST_INDEX_HTML, INDEX_JS_IN, INDEX_JS_OUT, TEST_DIR));
task('test:start', ['test:static'], () => devServer(TEST_DIR, webpackTestConfig(true, TEST_DIR, TEST_PORT), TEST_PORT));

// sub-tasks for distribution
task('dist:clean', cb => del([DIST_DIR, DIST_INTERMEDIATE_DIR], {dot: true}, cb));
task('dist:static', () => copyStatic([`${SRC_STATIC_DIR}/**`], DIST_DIR));
task('dist:index', () => {
    const app = src(["*.{css,js}"], {cwd: GEN_DIR}).pipe(dest(DIST_DIR));
    return src(INDEX_HTML)
        .pipe(inject(app, { ignorePath: DIST_DIR, starttag: INDEX_EXT }))
        .on("error", log).pipe(dest(DIST_DIR));
});
task('dist:build', ['dist:static'], cb => {
    const config = webpackConfig(false, DIST_INTERMEDIATE_DIR);
    webpack(config, (err, stats) => {
        if (err) {
            throw new PluginError('dist', err);
        }
        log(`[${packageJson.name} dist]`, stats.toString({colors: true}));
        cb();
    });
});
