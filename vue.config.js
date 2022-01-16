module.exports = {
    devServer:{
		proxy:{
			'/api':{	//匹配所有以'/api'开头（指除了协议、地址、端口号外的内容）的请求路径，并代理给目标服务器
				target:'http://localhost:4000',
				changeOrigin:true,	//是否自动将代理服务器的地址匹配到目标服务器，默认值为true
				pathRewrite:{'^/api':''}	//路径重写，通过正则表达式匹配所有以'^/api1'，并将其替换为空字符串
			},	//可以配置多个代理
            '/baidumap':{	//匹配所有以'/api'开头（指除了协议、地址、端口号外的内容）的请求路径，并代理给目标服务器
				target:'http://api.map.baidu.com',
				changeOrigin:true,	//是否自动将代理服务器的地址匹配到目标服务器，默认值为true
				pathRewrite:{'^/baidumap':''}	//路径重写，通过正则表达式匹配所有以'^/api1'，并将其替换为空字符串
			},
		}
	}
}