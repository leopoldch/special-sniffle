const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: [
      'localhost',
      'i-etix.lchappuis.fr',
      'front.lchappuis.fr',
      'lchappuis.fr'
    ],
  },
})
