// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top: [{
        title: '我的订单',
        hasBorder: true,
        class: 'outside'
      },
      {
        title: '优惠券',
        hasBorder: true,
        class: 'outside'
      },
      {
        title: '会员卡',
        hasBorder: false,
        class: 'outside_noborder'
      }
    ],
    bottom: [{
        title: '想看的电影',
        hasBorder: true,
        class: 'outside'
      },
      {
        title: '看过的电影',
        hasBorder: false,
        class: 'outside_noborder'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})