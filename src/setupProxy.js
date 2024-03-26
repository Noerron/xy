const proxy = require("http-proxy-middleware"); //引入http-proxy-middleware，react脚手架已经安装

module.exports = function (app) {
  app.use(
    proxy.createProxyMiddleware("/weighing", {
      //遇见/api1前缀的请求，就会触发该代理配置
      target: "http://117.160.169.56:9990", //请求转发给谁
      //target: "http://192.168.0.115:8080",

      changeOrigin: true, //控制服务器收到的请求头中Host的值
      //pathRewrite:{'^/weighing':''} //重写请求路径，下面有示例解释
    }),
    proxy.createProxyMiddleware("/api", {
      //遇见/api1前缀的请求，就会触发该代理配置
      //target: "http://117.160.169.56:9990", //请求转发给谁
      target: "http://192.168.0.115:8080",
      //target:'http://152.136.130.166:82',
      changeOrigin: true, //控制服务器收到的请求头中Host的值
      pathRewrite: { "^/api": "" }, //重写请求路径，下面有示例解释
    })
  );
};
