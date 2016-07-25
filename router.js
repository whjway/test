//调用模块
var fs = require('fs')
var path = require('path')
var mime = require('mime')
var url = require('url')

var Music = require('./model/music')

var indexControllers = require("./controllers/index")
var musicControllers = require("./controllers/music")


module.exports = function(req, res) {
  //获取请求方式和路径
  var method = req.method.toLowerCase()

  // 注意：中文路径会编码，然后再发出请求
  // 所以一定要将url解码之后再使用
  var urlObj = url.parse(decodeURI(req.url),true)
  var pathname = urlObj.pathname

  // 给 req 对象挂在一个 query 属性，在后面就可以直接拿来即用了
  req.query = urlObj.query


  if (method === 'get' && pathname === '/') {
    // GET / 访问首页
    indexControllers.showIndex(req, res)

  } else if (method === 'get' && (pathname.startsWith('/node_modules') || pathname.startsWith('/uploads/'))) {
    // css img 请求
    //读取文件 拼接静态路径
    var staticPath = path.join(__dirname, pathname)

    fs.readFile(staticPath, function(err, data) {
      if (err) return res.end(err.message)
        //判断文件pathname content-type类型
      var contentType = mime.lookup(pathname)

      res.writeHead(200, {
          'Content-Type': contentType
        })
        //把访问到的buffer对象返回 附带content-type即可识别css img
        //注意 decodeURI(req.pathname) 转换
      res.end(data)
    })
  } else if (method === 'get' && pathname === '/favicon.ico') {
    res.end()
  } else if (method === 'get' && pathname === '/add') {
    // GET /add 访问添加
    musicControllers.showAdd(req, res)
  } else if (method === 'get' && pathname === '/edit') {
    // GET /edit 访问编辑
    musicControllers.showEdit(req, res)
  } else if (method === 'post' && pathname === '/add') {
    // POST /add 添加  不是去访问 只是作为判断依据 
    musicControllers.doAdd(req,res)
  } else if (method === 'post' && pathname === '/edit') {
    //POST /edit 编辑
    musicControllers.doEdit(req,res)
  } else if (method === 'get' && pathname === '/remove') {
    //POST /edit 编辑
    musicControllers.doRemove(req,res)
  }
}
