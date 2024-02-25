const { defineConfig } = require('@vue/cli-service')
const fs = require('fs');



module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    /*
    https: {
      key: fs.readFileSync('/etc/letsencrypt/live/sniffle.lchappuis.fr/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/sniffle.lchappuis.fr/fullchain.pem'),
    },
    */
    compress: true,
    port: 3005,
    allowedHosts: [
      'localhost',
      'i-etix.lchappuis.fr',
      'front.lchappuis.fr',
      'lchappuis.fr',
      'sniffle.lchappuis.fr',
    ],
  },
})