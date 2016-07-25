var Music = require('../model/music')
var render = require('../common/render')
var jsonToStr = require('../common/jsonToStr')
var config = require('../config')
var queryString = require('querystring')
var formidable = require('formidable')

// get add
exports.showAdd = function(req, res) {
  return res.render('add', {
    title: '添加音乐'
  })
}

// post add
exports.doAdd = function(req, res) {
  // 普通表单（没有文件上传）
  // 1 接收上传数据
  // var data = ''
  // req.on('data', function(chunk) {
  //   data += chunk
  // })

  // req.on('end', function() {
  //   var queryObj = {}
  //   data.split('&').forEach(function(query) {
  //     queryObj[query.split('=')[0]] = query.split('=')[1]
  //   })

  //   // 使用核心模块 querystring 的 parse 方法将一个查询字符串转换为一个对象
  //   var queryObj = queryString.parse(data)
  //   res.jsonToStr(queryObj)
  // })

  // 处理有文件的表单上传
  // 有一个第三方包：formidable ，可以专门用来帮我们处理表单文件上传
  // 这个包接收到该文件的时候，会给文件取一个随机不重复的名字
  var form = new formidable.IncomingForm()
  // 指定本次文件上传的路径（默认保存到操作系统的临时目录了）
  form.uploadDir = config.uploadDir

  // 指定本次上传的文件保持扩展名（默认是false，没有扩展名）
  form.keepExtensions = true

  form.parse(req, function(err, fields, files) {

    // 当接收到用户提交的数据的时候，一定要将数据校验，类似于前端中的表单校验
    // 表单提交之前在前台必须要做校验，在后台也一定要做校验
    // 原因在于 浏览器中的 js 可以被禁用
    var music = new Music({
      title: fields.title,
      singer: fields.singer,
      music: files.music.name,
      poster: files.poster.name
    })

    // 对象的核心就在于 自制（自己管理自己）
    music.save()
    // 添加歌曲成功，让浏览器跳转到首页
    // 302 状态码 表示，重定向（重新定位到一个请求路径）
    // 在请求头中通过 Location 属性指定要重定向的地址
    // 原理：当浏览器接收到本次的响应报文后，发现状态码是302，
    // 然后浏览器将报文中的 Location 拿过来，主动对Location指定的地址发起请求
    res.writeHead(302, {
      'Location': 'http://127.0.0.1:3000/'
    })

    res.end()
  })
}

//get edit
exports.showEdit = function(req, res) {

  //提取需要编辑的editId
  // var editId = parseInt(req.url.slice(6))
  var editId = parseInt(req.query.id)
    //判断editId是否存在
  var editMusicObj = Music.getById(editId)
  if (!editMusicObj) {
    return res.end('music not exists')
  }
  res.render('edit', editMusicObj)
}

//post edit
exports.doEdit = function(req, res) {
  // 处理有文件的表单上传
  // 有一个第三方包：formidable 
  var form = new formidable.IncomingForm()

  //改路径
  form.uploadDir = config.uploadDir
    //文件拓展名
  form.keepExtensions = true
    //fields 不是文件的数据
    //files 文件数据
  form.parse(req, function(err, fields, files) {

    // 当接收到用户提交的数据的时候，一定要将数据校验，类似于前端中的表单校验
    // 表单提交之前在前台必须要做校验，在后台也一定要做校验
    // 原因在于 浏览器中的 js 可以被禁用
    var editId = parseInt(req.query.id)
      //判断editId是否存在
    var editMusicObj = Music.getById(editId)
    if (!editMusicObj) {
      return res.end('music not exists')
    }
    //修改数据
    Music.updateByObj(editMusicObj, fields, files)
      //网页重定向
    res.writeHead(302, {
      'Location': 'http://127.0.0.1:3000/'
    })
    res.end()

  })
}

//get remove
exports.doRemove = function(req, res) {
  var id = parseInt(req.query.id)
  var isExists = false
  var music_index = -1
    // 先判定一下该记录是否存在
  Music.getList().forEach(function(music, index) {
    if (music.id === id) {
      isExists = true
      music_index = index
    }
  })

  if (!isExists) {
    return res.end('music not exists')
  }
  //判断editId是否存在
  Music.removeById(music_index)

  res.writeHead(302, {
    'Location': 'http://127.0.0.1:3000/'
  })
  res.end()
}
