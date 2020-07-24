const CompressionWebpackPlugin = require('compression-webpack-plugin')

// vue.config.js
module.exports = {
    outputDir: 'dist',
    lintOnSave: false,
    devServer: {
        open: true,
        port: 9527,
        proxy: {
            '^/jeecg-boot': {
                target: 'http://192.168.0.132:8080',
                changeOrigin: true
            }
        }
    },
    configureWebpack: config => {
        let plugins = [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp(
                    '\\.(' +
                    ['js', 'css'].join('|') +
                    ')$',
                ),
                threshold: 10240,
                minRatio: 0.8,
            }),
        ]
        if (process.env.NODE_ENV !== 'development') {
            config.plugins = [...config.plugins, ...plugins]
        }
    }
}