const HtmlWebpackPlugin = require('html-webpack-plugin') ;
// process 代表进程的意思
const argv = require('yargs-parser')(process.argv.slice(2));
console.log('得到的参数',argv) ;// { _: [], mode: 'development' }
const _mode =  argv.mode || 'development' ;
const _modeflag = _mode == 'production' ? true : false ;// _modeflag: true 上线环境， false: 生产环境
const merge = require('webpack-merge');
const _mergeConfig = require(`./config/webpack.${_mode}.js`) ;// 判断是开发环境还是生产环境，导入不同的js
const WebpackBuildNotifierPlugin = require('webpack-build-notifier'); // 配置 webpack 编译成功后的提示效果
const {resolve} = require('path') ;
// 配置提取css为一个文件，配合loader就可以插入到html中了，而且还能节省js的大小
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // webpack 打包的时候使用进度条

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); // 打印 chunk 的时间 。（第一步）
const smp = new SpeedMeasurePlugin();// 打印 chunk 的时间 。（第二部）

const CleanWebpackPlugin = require('clean-webpack-plugin'); //帮助我们自动删除打包生成的dist的目录
const fs = require("fs");
const loading = {
    // html:resolve('./loading.html')
    html: fs.readFileSync('./loading.html','utf-8')
};
if(!_modeflag){//如果是生产环境 
    loading.linkElementUi = '<link href="/node_modules/element-ui/lib/theme-chalk/index.css" rel="stylesheet">' ;
    loading.ElementJs = '<script src="/node_modules/element-ui/lib/index.js"></script>' ;
}else{
    loading.linkElementUi = '<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">'; 
    loading.ElementJs = '<script src="https://unpkg.com/element-ui/lib/index.js"></script>' ;
}

const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
// webpack 默认会去找 src下边的index.js . 如果是单页应用 。entry这个入口文件，就可以不用写了
// output： 默认也会去dist中，默认为main.js . 如果是单页引用也可以不用写了
// HtmlWebpackPlugin 主要作用就是插入js到制定的html

const VueLoaderPlugin = require('vue-loader/lib/plugin'); //配置加载ｖｕｅ 的 loader

// const ExtractTextPlugin = require("extract-text-webpack-plugin") ; // 提取vue文件中的css


let webpackConfig;
webpackConfig = {//基本配置， 外边的配置， 在config里边。可以区分开发环境和上线环境
    module: {
        rules: [
            { // 配置ｖｕｅ的 loader
            test: /\.vue$/,
            loader: 'vue-loader',
            options:{
                // css :MiniCssExtractPlugin.loader
                extractCSS: true
            }
             },
            {//配置图片压缩的loader
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
                'file-loader',
                {
                    loader: 'image-webpack-loader',
                    options: {
                        bypassOnDebug: true, // webpack@1.x
                        disable: true, // webpack@2.x and newer
                    },
                },
            ],
        },{//配置，图片小于多少转换为base64
            test: /\.(png|jpg|gif|ttf|otf|svg)$/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024  // 如果页面中的图片的大小小于10kb， 直接转换为base64到页面中
                    }
                }
            ]
        },{
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                // options: {
                //     // you can specify a publicPath here
                //     // by default it use publicPath in webpackOptions.output
                //     publicPath: '../'
                // }
            }, {
                loader: 'css-loader',// 让我们可以使用import导入css文件
                options: {
                    importLoaders: 1 // 设置css-loader的优先级最高
                    // modules: true,
                    // localIdentName: '[path][name]__[local]--[hash:base64:5]'
                }
            },'postcss-loader'
            ]
        }]
    },
    devServer: {//配置测试的假数据
        before(app) {
            app.get('/api/test', (req, res) => {
                res.json({
                    code: '200',
                    message: {aa: "23中的   "}
                });
            });
        }
    },
    //watch:_modeflag,//是否不死掉进程，监听代码修改自动部署， 如果使用了dev:server， 这个就没什么用
    optimization: {
        noEmitOnErrors: true,//如果报错，不打包
        splitChunks:{// 配置公共包, 当一个js文件多次被引入的时候， 提取出来
            cacheGroups:{
                commons:{
                    chunks:'initial',
                    name:'common',
                    minChunks:2,// 一般都是2
                    //minChunks:2, webpack考虑到性能优化的问题， 如果一个公共js的大小没有30kb就不拿出来作为一个请求
                    //minChunks:1, 强制性的提取公共的包
                    maxInitialRequests:5,
                    minSize:0// 文件最小是0
                }
            }
        },
        // splitChunks:{ // 配置提取公共的包
        //     cacheGroups:{
        //         chunks:'initial',
        //         name:"common",
        //         minChunks:2,// 只要有一个地方引入就开始打包
        //         maxInitialRequests:5,//
        //         minSize:0
        //     }
        // },
        runtimeChunk: {   // webpack 把webpack运行时的代码抽取出来，这样我们的业务逻辑代码就会非常的简洁　
// 但是这样会多了一个请求，如果是单页应用的话就会多发一次请求，这样就可以使用一个插件把这个插件给包裹起来
            name: 'runtime'
        }
    },
    plugins: [
        // 正常在我们开发的时候，会用到各种不同的组件， 一个单页项目就是不同的组件组成的
        new MiniCssExtractPlugin({//配置把webpack打包的css提取出来，不要都放在js里边
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: _modeflag ? "styles/[name].[contenthash:5].css" : "styles/[name].css",
            chunkFilename: _modeflag ? "styles[id].[contenthash].css" : "styles/[id].css"//chunk 就是插入的顺序
        }),
        new HtmlWebpackPlugin({// 会帮我们生成一个index.html,默认会存放到dist的目录下边
            filename: 'index.html',
            template: 'src/index.html',// html模板的地址
            loading,
            minify: {
                removeComments: _modeflag,// 去除空格
                collapseWhitespace: _modeflag,// 去除注释
                // removeAttributeQuotes:_modeflag  // 是否去除引号
            }
        }),
        new InlineManifestWebpackPlugin('runtime'),
        new WebpackBuildNotifierPlugin({//配置webpack打包完成后，提示信息
            title: "webpack 配置结果",
            logo: resolve("./img/favicon.png"),
            suppressSuccess: true
        }),
        new ProgressBarPlugin(),//webpack打包的时候使用的进度条
        new CleanWebpackPlugin(['dist']),
        new VueLoaderPlugin() // 配置ｖｕｅ的 loader
        // new ExtractTextPlugin("style.css")

    ]
};
// 越往后优先级越低
module.exports = merge(_mergeConfig,webpackConfig);
// module.exports = smp.wrap(merge(_mergeConfig,webpackConfig));