const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    compress: true,
    port: 3005,
    allowedHosts: ['localhost'],
  },
  configureWebpack: {
    mode: 'production',
    optimization: {
      minimize: true,
    },
    performance: {
      hints: false,
    },
  },
})
