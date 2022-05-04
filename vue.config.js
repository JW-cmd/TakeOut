const accountSid = '8aaf07087e3322ea017e61711d1a07fa'

module.exports = {
  publicPath: './' , // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)

	configureWebpack: {
		//警告 webpack 的性能提示
		performance: {
			hints:'warning',  // 枚举
			//入口起点的最大体积,整数类型（以字节为单位）
			maxEntrypointSize: 50000000,
			//生成文件的最大体积,整数类型（以字节为单位）
			maxAssetSize: 30000000,
			//只给出 js 文件的性能提示, 提供资源文件名的断言函数
			assetFilter: function(assetFilename) {
				return assetFilename.endsWith('.js') || assetFilename.endsWith('.css')
			}
		}
	},
    devServer:{
		proxy:{
			'/api':{	//匹配所有以'/api'开头（指除了协议、地址、端口号外的内容）的请求路径，并代理给目标服务器
				target:'http://192.168.38.1:4000',
				changeOrigin:true,	//是否自动将代理服务器的地址匹配到目标服务器，默认值为true
				pathRewrite:{'^/api':''}	//路径重写，通过正则表达式匹配所有以'^/api1'，并将其替换为空字符串
			},	
      //可以配置多个代理
            '/baidumap':{	
				target:'http://api.map.baidu.com',
				changeOrigin:true,	
				pathRewrite:{'^/baidumap':''}	
			},
		}
	}
}