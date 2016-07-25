//数据
// var musicList = [
//   { id: 1, title: '富士山下', singer: '陈奕迅', music: '陈奕迅 - 富士山下.mp3', poster: '陈奕迅.jpg' },
//   { id: 2, title: '石头记', singer: '达明一派', music: '达明一派 - 石头记.mp3', poster: '达明一派.jpg' },
//   { id: 3, title: '青城山下白素贞', singer: '好妹妹乐队', music: '好妹妹乐队 - 青城山下白素贞.mp3', poster: '好妹妹乐队.jpg' },
//   { id: 4, title: '友情岁月', singer: '黄耀明', music: '黄耀明 - 友情岁月.mp3', poster: '黄耀明.jpg' },
//   { id: 5, title: '梦里水乡', singer: '江珊', music: '江珊 - 梦里水乡.mp3', poster: '江珊.jpg' },
//   { id: 6, title: 'Blowing In The Wind', singer: '南方二重唱', music: '南方二重唱 - Blowing In The Wind.mp3', poster: '南方二重唱.jpg' },
//   { id: 7, title: '女儿情', singer: '万晓利', music: '万晓利 - 女儿情.mp3', poster: '万晓利.jpg' },
//   { id: 8, title: '王馨平', singer: '别问我是谁', music: '王馨平 - 别问我是谁.mp3', poster: '王馨平.jpg' },
//   { id: 9, title: '五环之歌', singer: '岳云鹏', music: '岳云鹏,MC Hotdog - 五环之歌.mp3', poster: '岳云鹏.jpg' }
// ]
var musicList = [
 
  { id: 1, title: '五环之歌', singer: '岳云鹏', music: '岳云鹏,MC Hotdog - 五环之歌.mp3', poster: '岳云鹏.jpg' }
]
//音乐相关
module.exports = Music

function Music(music) {
  this.id = music.id
  this.title = music.title
  this.singer = music.singer
  this.music = music.music
  this.poster = music.poster
}

//音乐列表
Music.getList = function() {
  return musicList
}

//保存添加的音乐到音乐列表
Music.prototype.save = function() {
  //找到最后一个id号
  var newId = 0
  Music.getList().forEach(function(music) {
      if (music.id > newId) {
        newId = music.id
      }
    })
    //将添加的歌曲放到列表
  Music.getList().push({
    id: newId + 1,
    title: this.title,
    singer: this.singer,
    music: this.music,
    poster: this.poster
  })
}

//该音乐id是否存在
Music.getById = function(id) {
  var editMusicObj = null
  Music.getList().forEach(function(music, index) {
    if (music.id === id) {
      editMusicObj = music
      return false
    }
  })
  return editMusicObj
}

//更新
Music.updateByObj = function(editMusicObj, fields, files) {
    editMusicObj.title = fields.title
    editMusicObj.singer = fields.singer
    files.music.name === '' ? null : editMusicObj.music = files.music.name
    files.poster.name === '' ? null : editMusicObj.poster = files.poster.name
  }
  
//删除
Music.removeById = function(id) {
  Music.getList().splice(id, 1)
}
