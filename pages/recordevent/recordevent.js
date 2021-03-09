// pages/recordevent/recordevent.js
var that = this

Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventId: "",
    date: '',
    latitude: "",
    longitude: "",
    address: "",
    files: [{
      url: '../../images/comments/star',
    }, {
      loading: true
    }, {
      error: true
    }],
    tempImg:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const eventChannel = this.getOpenerEventChannel()
    // eventChannel.emit('acceptDataFromOpenedPage', { data: 'test' });
    // eventChannel.emit('someEvent', { data: 'test' });
    eventChannel.on('acceptDataFromOpenerPage',(data)=> {
      console.log(data)
      this.setData({
        list:data.data
      })
    })

    this.setData({
      eventId: options.eventId
    })
    this.getDate()
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
    this.getLocation()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  //  获取当前日期
  getDate() {

    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var today = Y + "-" + M + "-" + D
    //  console.log("当前时间：" + Y + '年' + M + '月' + D + '日');
    this.setData({

      date: today
    })
  },
  // bindDateChange
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  //  获取 地点
  getLocation(chooseLocation) {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        this.setData({
          latitude,
          longitude,
        })
        chooseLocation && chooseLocation(latitude, longitude)
      }
    })
  },
  //  选择地点
  // latitude: 30.64242
  // longitude: 104.04311
  chooseLocation(latitude, longitude) {
    wx.chooseLocation({
      success: (res) => {
        // console.log(res)
        let address = res.address
        this.setData({
          address
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //  获取本地图片
  selectFile() {

  },
  chooseImage(){
    wx.chooseImage({
      count: 1,
      sizeType: ["original"],
      sourceType: ["album","original"],
      success: (res)=> {
        console.log(res.tempFilePaths)
       let tempImg=res.tempFilePaths
       this.setData({
         tempImg
       })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
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