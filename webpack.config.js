const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV;
const PUBLIC_PATH = process.env.NODE_ENV === 'production' ? './' : '/';

const minify = NODE_ENV === 'production' ? {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true
} : false;

let plugins = [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(NODE_ENV),
            'PUBLIC_PATH': JSON.stringify(PUBLIC_PATH)
        }
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }),
    new HtmlWebpackPlugin({
        filename: 'muma.html',
        template: './src/demo-muma/index.html',
        chunks: ['muma'],
        minify: minify
    }),
    new ExtractTextPlugin({
        filename: 'styles/[name].css',
        allChunks: false
    }),
    // ------------------------
    new HtmlWebpackPlugin({
        filename: 'zhengfangti.html',
        template: './src/demo-zhengfangti/index.html',
        chunks: ['zhengfangti'],
        minify: minify
    }),
    new HtmlWebpackPlugin({
        filename: 'zhengfangti-ani.html',
        template: './src/demo-zhengfangti-ani/index.html',
        chunks: ['zhengfangti-ani'],
        minify: minify
    }),
    new HtmlWebpackPlugin({
        filename: 'css3-3d-demo.html',
        template: './src/css3-3d-demo/index.html',
        chunks: ['css3-3d-demo'],
        minify: minify
    }),
    new HtmlWebpackPlugin({
        filename: 'baidu-reg-demo.html',
        template: './src/baidu-reg-demo/index.html',
        chunks: ['baidu-reg-demo'],
        minify: minify
    }),
    new HtmlWebpackPlugin({
        filename: 'input-demo.html',
        template: './src/input-demo/index.html',
        chunks: ['input-demo'],
        minify: minify
    }),
    new HtmlWebpackPlugin({
        filename: 'mobile-swiper-demo.html',
        template: './src/mobile-swiper-demo/index.html',
        chunks: ['mobile-swiper-demo'],
        minify: minify
    })
];

NODE_ENV === 'production' ? plugins.push(new UglifyJSPlugin({
    sourceMap: true
})) : null;

module.exports = {
    // context: path.resolve(__dirname, 'src'), //基本目录，一个绝对路径，用于从配置中解析入口点和装载器。
    devtool: 'source-map',
    entry: {
        'muma': './src/demo-muma/index.js',
        'zhengfangti': './src/demo-zhengfangti/index.js',
        'zhengfangti-ani': './src/demo-zhengfangti-ani/index.js',
        'css3-3d-demo': './src/css3-3d-demo/index.js',
        'baidu-reg-demo': './src/baidu-reg-demo/index.js',
        'input-demo': './src/input-demo/index.js',
        'mobile-swiper-demo': './src/mobile-swiper-demo/index.js'
    },
    output: {
        filename: 'scripts/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: PUBLIC_PATH
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    publicPath: '../',
                    use: ["css-loader", {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: 'postcss.config.js',
                                ctx: {
                                    autoprefixer: {browsers: ['> 1%']}
                                }
                            }
                        }
                    }]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]',
                    // publicPath: PUBLIC_PATH
                    // 单独设置图片资源的publicPath，其他文件保留output配置里的publicPath
                    // 会覆盖 css里面的 图片的对外路径
                    // 会影响 html里面 img标签的src属性
                    // 会覆盖 output配置里的 publicPath
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-withimg-loader",
                        options: {
                            // exclude: /image/,//排除image目录
                            min: false,//默认会去除html中的换行符，配置min=false可不去除
                            deep: false,//将关闭include语法嵌套子页面的功能
                        }
                    },
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ['img:data-src'],
                            interpolate: true,//为 ES6 模板字符串启用插值语法
                            minimize: false,
                            removeComments: false,
                            collapseWhitespace: false
                        }
                    }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/fonts/[name].[hash:8].[ext]',
                    publicPath: '../',
                    // 会覆盖css里面的字体的对外路径，所以不设置
                    // 或者和css里字体的对外路径设置成一样
                }
            }
        ]
    },
    plugins: plugins,
    devServer: {
        compress: true,
        contentBase: path.join(__dirname, "dist"),
        publicPath: '/',
        inline: true,
        host: "192.168.0.12",
        port: 9000
    },
};