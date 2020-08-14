const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const path = require('path');
module.exports = {
    devServer: {
        disableHostCheck: true,
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                   
                },
                javascriptEnabled: true
            }
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default']
            })
        ]
    },
    productionSourceMap:false,
    publicPath: '/',
    chainWebpack: config => {
        // 解决ie11兼容ES6
        config.entry('main').add('babel-polyfill');
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));
        // 开启图片压缩
        config.module.rule('images')
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({ bypassOnDebug: true });
        // 开启js、css压缩
        if (process.env.NODE_ENV === 'production') {
            config.plugin('compressionPlugin')
                .use(new CompressionPlugin({
                    test:/\.js$|\.html$|.\css/, // 匹配文件名
                    threshold: 10240, // 对超过10k的数据压缩
                    deleteOriginalAssets: false // 不删除源文件
                }))
        }
    },
    transpileDependencies: [
        'biyi-admin', // 指定对第三方依赖包进行babel-polyfill处理
    ]
};

function addStyleResource (rule) {
    rule
        .use('style-resource')
        .loader('style-resources-loader')
        .options({
        patterns: [
            // 需要全局导入的less
            path.resolve(__dirname, './src/assets/less/base.less')
        ]
        })
}