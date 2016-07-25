//调用模块
var config = require('../config')
var fs = require('fs')
var path = require('path')
var template = require('art-template')

module.exports = function fn(res) {
	 // 约定：把所有的静态模板文件都放到 views 目录中
  res.render = function(templateName, contextObj) {
    //静态模板
    fs.readFile(path.join(config.templatePath, templateName + config.templateExtName), 'utf8', function(err, data) {
      //报错提示
      if (err) return res.end(err.message)
      //拼接模板
      var render = template.compile(data)
      var strTemplate = render(contextObj)
      //设置相应
      res.writeHead(200, {
        'Content-Type': 'text/html; charset: utf-8'
      })
      res.end(strTemplate)
    })
  }
}


