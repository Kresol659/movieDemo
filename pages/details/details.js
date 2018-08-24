// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head: [],
    starCount: [1, 1, 1, 1, 1],
    BackstageIP: 'http://192.168.43.138:3333',
    PreIP: 'http://192.168.43.138:659',
    movieData: [],
    showMore:'intro_hidden',
    changeArrow:'changeArrowDown'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //---------------------随机头像------------------//
    let arr = [];
    for (let i = 0; i <= 10; i++) {
      arr.push(`../../images/header (${this.getHead()}).jpg`)
    }
    //---------------------请求数据------------------//
    let inface = '';
    if (options.type === 'hot') {
      inface = '/hotShowing/find'
    } else if (options.type === 'comming') {
      inface = '/comingSoon/find'
    }
    wx.request({
      url: this.data.BackstageIP + inface, //仅为示例，并非真实的接口地址
      data: {
        _id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        let newData = [];
        newData.push(res.data)
        newData = newData.map(item => {
          item.movie_imgAll = item.movie_imgAll.replace(/\\/g, '/')
          item.movie_director_img = item.movie_director_img.replace(/\\/g, '/')
          item.actor_name = item.movie_actor.split(',').map(o => o.substring(0, o.indexOf('.')))
          item.actor_act = item.movie_actor.split(',').map(o => o.substring(o.indexOf('.')+1, o.length))
          item.movie_actor_img = item.movie_actor_img.split(',').map(o => o.replace(/\\/g, '/'))
          item.movie_img = item.movie_img.split(',').map(o => o.replace(/\\/g, '/'))
          item.movie_userComment = item.movie_userComment.split('/')
          return item
        })
        console.log(newData)
        this.setData({
          movieData: newData[0]
        })
      }.bind(this)
    })




    this.setData({
      head: arr
    })
  },
  getHead() {
    let arr = ['.jpg', '.png']
    return Math.ceil(Math.random() * 46)
  },
  changeHeight:function(){
    if (this.data.showMore ==='intro_hidden'){
      this.setData({
        showMore:'intro',
        changeArrow:'changeArrowUp'
      })
    }else{
      this.setData({
        showMore: 'intro_hidden',
        changeArrow: 'changeArrowDown'
      })
    }
    
  }

})