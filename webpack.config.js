
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var devPath = path.join(__dirname + '/dev/js');

var ENV = process.env.npm_lifecycle_event;
var isBuild = ENV === 'build';
var isDev = ENV === 'dev';

module.exports = function cfg () {

    var cfg = {};

    cfg.entry = {
        app: path.join(devPath, 'index.js')
    };

    if (isBuild) {
        cfg.entry.vendor = ['jquery', 'lodash', 'angular', 'angular-sanitize', 'angular-route'];
    }

    cfg.output = {
        path: __dirname + '/static',

        publicPath: isBuild ? '/' : 'http://0.0.0.0:8080/',

        filename: isBuild ? 'js/[name].[hash:8].js' : '[name].bundle.js',

        chunkFilename: isBuild ? 'js/[name].[hash:8].js' : '[name].bundle.js'
    };

    if (isBuild) {
        cfg.devtool = 'source-map';
    } else {
        cfg.devtool = 'eval-source-map';
    }

    cfg.module = {
        preLoaders: [],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'stage-2']
                },
                exclude: /node_modules/
            },
            {
                test: /angular/i,
                loader: 'imports?$=jquery'
            },
            {
                test: /\/jquery\.js$/,
                loader: "expose?jQuery"
            },
            {
                test: /\.css$/,
                // loader: "style!css?sourceMap!postcss"
                //样式外部加载
                loader: ExtractTextPlugin.extract('style', 'css!postcss')
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                loader: 'file?name=font/[name].[ext]'
            },
            {
                test: /\.(html|htm)$/,
                loader: 'raw'
            }
        ]
    };

    cfg.postcss = [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ];

    cfg.plugins = [
        new HtmlWebpackPlugin({
            template: 'dev/index.html',
            inject: 'body'
        }),
        new webpack.DefinePlugin({
           __DEV__: isDev,
           __DEV_IP_ADDRESS__: '"' + ip()[0] + '"'
        }),
        new ExtractTextPlugin('css/[name].[hash:8].css', {disable: isDev}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            '_': 'lodash'
        })
    ];

    if (isBuild) {
        cfg.plugins.push(
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: 'js/vendor.[hash:8].js'
            }),
            new CopyWebpackPlugin([
                {
                    from: __dirname + 'dev'
                }
            ])
        )
    }

    cfg.devServer = {
        contentBase: 'dev',
        stats: 'minimal'
    };

    return cfg;
}();

function ip() {
    var addresses = [],
        os = require('os'),
        interfaces = os.networkInterfaces();

    for (var ifaces in interfaces) {
        var iface = interfaces[ifaces].filter(function(detail) {
            return detail.family === 'IPv4' && detail.internal === false;
        });

        addresses = addresses.concat(iface);
    }

    return addresses.map(function(detail) {
        return detail.address;
    })
}
