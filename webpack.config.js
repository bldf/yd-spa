const HtmlWebpackPlugin = require('html-webpack-plugin') ;
// process 代表进程的意思
const argv = require('yargs-parser')(process.argv.slice(2));
console.log('得到的参数',argv) ;// { _: [], mode: 'development' }
const _mode =  argv.mode || 'development' ;
const _modeflag = _mode == 'production' ? true : false ;// _modeflag: true 上线环境， false: 生产环境
const merge = require('webpack-merge');
const _mergeConfig = require(`./config/webpack.${_mode}.js`) ;// 判断是开发环境还是生产环境，导入不同的js


// 配置提取css为一个文件，配合loader就可以插入到html中了，而且还能节省js的大小
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


// webpack 默认会去找 src下边的index.js . 如果是单页应用 。entry这个入口文件，就可以不用写了
// output： 默认也会去dist中，默认为main.js . 如果是单页引用也可以不用写了
// HtmlWebpackPlugin 主要作用就是插入js到制定的html
let webpackConfig = {//基本配置， 外边的配置， 在config里边。可以区分开发环境和上线环境
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    // options: {
                    //     // you can specify a publicPath here
                    //     // by default it use publicPath in webpackOptions.output
                    //     publicPath: '../'
                    // }
                },{
                        loader: 'css-loader',// 让我们可以使用import导入css文件
                        options: {
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }
                ]
            }]
    },
    plugins: [
        // 正常在我们开发的时候，会用到各种不同的组件， 一个单页项目就是不同的组件组成的
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: _modeflag ? "styles/[name].[hash:5].css":"styles/[name].css",
            chunkFilename:_modeflag ? "styles[id].[hash].css" :  "styles/[id].css"//chunk 就是插入的顺序
        }),
        new HtmlWebpackPlugin({// 会帮我们生成一个index.html,默认会存放到dist的目录下边
            filename: 'index.html',
            template: 'src/index.html',// html模板的地址
            minify:{
                removeComments:_modeflag,// 去除空格
                collapseWhitespace:_modeflag,// 去除注释
                // removeAttributeQuotes:_modeflag  // 是否去除引号
            }
        })
    ]
}
// 越往后优先级越低
module.exports = merge(_mergeConfig,webpackConfig);