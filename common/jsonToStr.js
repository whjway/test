// 给 res 对象挂载一个 json 方法，方便在后面使用
module.exports = function(res) {
  res.jsonToStr = function(obj) {
    var jsonStr = JSON.stringify(obj)
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8'
    })
    res.end(jsonStr)
  }
}
