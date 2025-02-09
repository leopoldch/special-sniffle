export default {
    publicPath: process.env.NODE_ENV === 'production' ? '/my-app/' : '/',
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
      optimization: {
        minimize: process.env.NODE_ENV === 'production',
        splitChunks: {
          chunks: 'all',
        },
      },
      performance: {
        hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
      },
    },
  };
  