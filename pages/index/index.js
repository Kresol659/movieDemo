var app = getApp()
const chinese = ['', '一', '二', '三', '四', '五', '六', '日']
Page({
  data: {
    navbar: ['热映', '待映'],
    currentTab: 0,
    BackstageIP:'http://192.168.43.138:3333',
    PreIP: 'http://192.168.43.138:659',
    hotData:[],
    commingData:[],
    time:'',
    tempData:[],
    num:0,
    long:0

  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  onLoad:function(){
    // ··················热映····················//
    wx.request({
      url: this.data.BackstageIP + '/hotShowing/find', //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let newData=res.data.map(item=>{
          item.movie_imgAll=item.movie_imgAll.replace(/\\/g, '/')
          item.movie_actor=item.movie_actor.split(',').map(o => o.substring(0, o.indexOf('.'))).join(',')
          let preTime = new Date(item.movie_show)
          let pre=preTime.getTime()
          let nowTime = new Date()
          let now=nowTime.getTime()
          pre - now > 0 ? item.showThis = true : item.showThis = false;
          //计算时间差
          let year = preTime.getFullYear() - nowTime.getFullYear();
          let month = preTime.getMonth() - nowTime.getMonth();
          let day = preTime.getDate() - nowTime.getDate();
          if (year===0&&month===0&&day<=7){
            let week = preTime.getDay() + nowTime.getDay()+1;
            if(week>=7){
                
              item.week = '下周' + chinese[week%7];
                item.showHotWeek=true;
            }else{
              item.week = '本周' + chinese[week];
              item.showHotWeek = true;
            }
          }else{
            item.showHotWeek = false;
          }
         return item
        })
        let temp=[...newData];
        temp.length=4;
        this.setData({
          tempData: newData.splice(4, newData.length-4),
          long: newData.length,
          hotData: temp,
        })
      }.bind(this)
    })

    // ··················待映····················//
    wx.request({
      url: this.data.BackstageIP + '/comingSoon/find', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let newData = res.data.map(item => {
          item.movie_imgAll = item.movie_imgAll.replace(/\\/g, '/')
          item.movie_actor = item.movie_actor.split(',').map(o => o.substring(0, o.indexOf('.'))).join(',')
          let preTime = new Date(item.movie_show)
          let pre = preTime.getTime()
          let nowTime = new Date()
          let now = nowTime.getTime()
          pre - now > 0 ? item.showThis = true : item.showThis = false;
          //计算时间差
          let year = preTime.getFullYear() - nowTime.getFullYear();
          let month = preTime.getMonth() - nowTime.getMonth();
          let day = preTime.getDate() - nowTime.getDate();
          if (year === 0 && month === 0 && day <= 7) {
            let week = preTime.getDay() + nowTime.getDay()+1;
            if (week >= 7) {
              item.week = '下周' + chinese[week % 7];
              item.showWeek=true;
            } else {
              item.week = '本周' + chinese[week];
              item.showWeek = true;
            }
          }else{
            item.showWeek = false;
          }
          
          return item
        })
        this.setData({
          commingData: newData
        })
      }.bind(this)
    })
    let nowDate=new Date()
    let nowYear = nowDate.getFullYear()
    let nowMonth = nowDate.getMonth()+1
    let nowDay = nowDate.getDate()
    let nowWeek = nowDate.getDay()
    this.setData({
      time: nowYear + '-' + nowMonth + '-' + nowDay+' ' + '星期' + chinese[nowWeek]
    })
  },
  toSearch:function(){

    wx.navigateTo({
      url: '../search/search'
    })
  },
  toDetails:function(e){
    wx.navigateTo({
      url: `../details/details?id=${e.currentTarget.dataset.id}&&type=${e.currentTarget.dataset.type}`
    })
  },
  golazy:function(){
    wx.navigateTo({
      url: '../demo/demo'
    })
  },
  onReachBottom:function(){
    console.log(this.data.long)
    if(this.data.num>this.data.long){
      return;
    }else{
      this.setData({
        hotData: [...this.data.hotData, this.data.tempData[this.data.num]],
        num: this.data.num + 1
      })
    }

  }
  
})