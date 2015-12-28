import path from "path";
import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";

export default (DEBUG, PATH, PORT=3001) => ({
    entry: (DEBUG ? [
        `webpack-dev-server/client?http://localhost:${PORT}`,
    ] : []).concat([
        'mocha!./test/tests',
    ]),
    output: {
        path: path.resolve(__dirname, PATH, "generated"),
        filename: DEBUG ? "main.js" : "main-[hash].js",
        publicPath: "/generated/"
    },
    cache: DEBUG,
    debug: DEBUG,
    devtool: DEBUG && "eval",
    module: {
        loaders: [
            { test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "src"),
                    path.resolve(__dirname, "test"),
                ],
                loader: "babel-loader",
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015'],
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            { test: /\.jpg/, loader: "url-loader?limit=10000&mimetype=image/jpg" },
            { test: /\.gif/, loader: "url-loader?limit=10000&mimetype=image/gif" },
            { test: /\.png/, loader: "url-loader?limit=10000&mimetype=image/png" },
            { test: /\.svg/, loader: "url-loader?limit=10000&mimetype=image/svg" },
            { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
        ]
    },
    plugins: DEBUG
    ? []
    : [
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
        new ExtractTextPlugin("style.css", {allChunks: false}),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {screw_ie8: true, keep_fnames: true, warnings: false},
            mangle: {screw_ie8: true, keep_fnames: true}
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
    ],
    resolveLoader: {
        root: path.join(__dirname, "node_modules"),
    },
    resolve: {
        root: path.join(__dirname, "node_modules"),
        modulesDirectories: ['node_modules'],
        alias: {
            environment: DEBUG
            ? path.resolve(__dirname, 'config', 'environments', 'development.js')
            : path.resolve(__dirname, 'config', 'environments', 'production.js')
        },
        extensions: ["", ".js", ".jsx"],
    }
});
