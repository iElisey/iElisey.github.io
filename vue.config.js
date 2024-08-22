const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: `/hamsterkeysweb/`,

  transpileDependencies: [
    'vuetify'
  ]
})
