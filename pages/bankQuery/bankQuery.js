// pages/bankQuery/bankQuery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    bankID:''
  },
  //  获取银行卡号码
  bankID(e){
    this.setData({
      bankID: e.detail.value
    })
   
  },
  //  查询银行卡具体信息
  getdata(e){

    // wx.showLoading({
    //   title: '加载中',
    // });
    var bankID = this.data.bankID
    console.log(bankID)
        //6217996880000565353
    //  校验输入表单
    if (!bankID) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        image: '../../images/error.png',
        duration: 1000,
        mask: true
      })
      return false
    }
    //  请求数据
    wx.request({
      url: "https://www.zhaotool.com/v1/api/lt/e10adc3949ba59abbe56e057f20f883e/" +bankID,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res)=> {
        console.log(res)
        if (res.statusCode===200){
          console.log("输入正确查询成功")
         this.setData({
           show:true,
           detail:res.data.data
         })
       
        }
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})