const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,

  configureWebpack: {
    devtool: "source-map",
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        path.join(__dirname, "./src/assets/styles/variables.less"),
        path.join(__dirname, "./src/assets/styles/mixins.less"),
      ],
    },
  },
  // chainWebpack: (config) => {
  //   config.devServer.disableHostCheck(true);
  // },
});
