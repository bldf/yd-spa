const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩 css 使用的，还可以去除无用的ｃｓｓ类
module.exports ={
    output:{
        filename: "scripts/[name].[contenthash:5].bundles.js",
        publicPath: ""// 配置公司的cdn
    },
    plugins: [
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        })
    ]
    // optimmization:{
    //     minimizer:[
    //
    //     ]
    // }
}