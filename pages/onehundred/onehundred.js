// pages/onehundred/onehundred.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buketList:[],
    userinfo:[]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //  云数据库
    wx.cloud.init();
    var db = wx.cloud.database();
    this.data.db = db;
    this.data.db = db.collection("list")

    //  测试 
    this.data.userinfo = db.collection('userinfo')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // this.getData()
   
},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getData()
    this.getTest()
    this.getID()
  },
  //  获取 当前展示页 items
  getData() {
    let that = this
    app.globalData.data.get().then(res => {
      console.log(res)
      // console.log(res.data[0].List)
      this.setData({
        buketList: res.data[0].List
      })
    })
  },

  //  test
  getTest() {
    app.globalData.userinfo.get().then(res => {
      console.log(res,'这是我想看到的Test')
    })
    
    app.globalData.userinfo.add({
      data: {
        username:'testname'
      }
    })
  },
  //   获取用户 唯一标志 openid 
  getID() {
   
  },
  //  gowrite 跳转编写页面编写
  gorecord(e) {
    // .target.dataset.type
    let goId = (e.target.dataset.type - 0) + 1
    wx.navigateTo({
      url: '/pages/recordevent/recordevent?eventId=' + goId,
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
      },
      success: (res) =>{
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: this.data.buketList
        })
      },

      fail: function(res) {
        // res
      },
      complete: function(res) {},
    })
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