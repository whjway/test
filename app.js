//调用模块
var http = require('http')
var config = require('./config')
var render = require('./common/render.js')
var router = require('./router.js')
var jsonToStr = require('./common/jsonToStr.js')


// 创建一个服务器
var server = http.createServer()
  //监听请求
server.on('request', function(req, res) {
  // 给 res 对象挂载一个 json 方法，方便在后面使用
	jsonToStr(res)
	//调用函数 render给res绑定函数
	render(res)
	//调用路由分配函数
  router(req, res)
})

//设置端口号
server.listen(config.port, config.host, function() {
  console.log('listening...')
})
