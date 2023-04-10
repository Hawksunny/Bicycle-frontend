const { defineConfig } = require("@vue/cli-service");
const proxyMiddleware = require('http-proxy-middleware');

// 配置别名相关的代码
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  transpileDependencies: true,

  // 传统修改 webpack 配置（最后会自动 merge）
  configureWebpack: {},

  // 解决跨域问题
  devServer: {
    port: 8080,
    proxy: {
      '/api': { // 需要代理的路径前缀
        target: 'http://127.0.0.1:8888/', // 目标服务器地址
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '' // 将路径前缀替换为空字符串
        }
      }
    }
  },

  // 链式修改 webpack 配置（高级）
  chainWebpack: (config) => {
    // 配置html插件：修改网页文档的标题
    config.plugin("html").tap((args) => {
      args[0].title = "Bicycle-demo";
      return args;
    });
    // 配置别名
    config.resolve.alias
      // .set('@', resolve('src')) // vueCLI已经帮我们配置了
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("network", resolve("src/network"))
      .set("views", resolve("src/views"));
  },
});
