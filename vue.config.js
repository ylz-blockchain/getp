// vue.config.js
module.exports = {
    outputDir: 'dist',
    lintOnSave: false,
    devServer: {
        open: true,
        port: 9527,
        proxy: {
            '^/jeecg-boot': {
                target: 'http://192.168.0.102:8081',
                changeOrigin: true
            }
        }
    }
}