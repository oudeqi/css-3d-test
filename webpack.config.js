const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack'); //访问内置的插件
const path = require('path');
module.exports = {
    // context: path.resolve(__dirname, 'src'), //基本目录，一个绝对路径，用于从配置中解析入口点和装载器。
    devtool: "inline-source-map",//生成 source map（源映射）.
    entry: {
        muma: './src/demo-muma/index.js',
        zhengfangti: './src/demo-zhengfangti/index.js',
        'zhengfangti-ani': './src/demo-zhengfangti-ani/index.js',
        img3d: './src/demo-img3d/index.js',
    },
    output: {
        filename: '[name].bundle.js',//输出文件.
        path: path.resolve(__dirname, 'dist'), //输出路径
        // publicPath: '/'//HMR 知道在哪里加载，这是热更新模块所必需的
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader']//?modules
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]',
                    publicPath: './images/'
                }
            },
            // {
            //     test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            //     loader: 'file-loader'
            // }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({template: './src/demo-muma/index.html'}),
        new ExtractTextPlugin('[name].styles.css')
    ],
    devServer: {
        compress: true,//如果要对资产启用 gzip 压缩，请设置此值
        // contentBase: path.join(__dirname, "dist"), //匹配输出路径，也可以是一个数组，或者 contentBase: "http://localhost/
        // publicPath: '/', //捆绑的文件将在此路径下的浏览器中可用
        headers: {
            "X-Custom-Foo": "bar"
        },
        inline: true,
        host: "192.168.0.12",
        port: 9000
    },
};