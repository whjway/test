
//首页controllers
//调用model模块common模块及其他 完成router的判断

var Music = require('../model/music')
var render = require('../common/render')


module.exports.showIndex = function  (req, res) {
		return res.render('index',{
    	title: '首页222',
    	musicList: Music.getList()
    })
}
