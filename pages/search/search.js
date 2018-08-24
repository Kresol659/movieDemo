// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    BackstageIP: 'http://192.168.43.138:3333',
    PreIP: 'http://192.168.43.138:659',
    movieData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


  },
  goBack: function() {
    var pages = getCurrentPages()
    var num = pages.length
    wx.navigateBack({
      delta: num
    })
  },
  searchNow(e) {
    if (e.detail.value !== '') {
      wx.request({
        url: this.data.BackstageIP + '/movieManage/find', //仅为示例，并非真实的接口地址
        data: {
          movie_name: e.detail.value
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res.data)
          let newData = res.data.map(item => {
            item.movie_imgAll = item.movie_imgAll.replace(/\\/g, '/')
            return item
          })
          this.setData({
            movieData: newData
          })
        }.bind(this)
      })
    }
  }
})