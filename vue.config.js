export default {
  publicPath: '/',
  transpileDependencies: [],
  devServer: {
    compress: true,
    port: 3005,
    allowedHosts: ['localhost'],
    open: true,
    historyApiFallback: true,
    hot: true,
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
  },
  configureWebpack: {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  },
}
