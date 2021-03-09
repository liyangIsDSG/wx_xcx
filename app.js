App({
  onLaunch: function (options) {
    console.log('生命周期函数--监听小程序初始化' + JSON.stringify(options))

    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    
    wx.cloud.init();
    var db = wx.cloud.database();
    this.globalData.db = db;
    this.globalData.data = db.collection("buketList")

    this.globalData.userinfo = db.collection("userinfo")

    
    //  get userinfo
    wx.getUserInfo({
      success: function(res) {
        // console.log(res)
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      }
    })



  },
  onShow: function () {
    console.log('生命周期函数--监听小程序显示')
  },
  onHide: function () {
    console.log('生命周期函数--监听小程序隐藏')
  },
  globalData: {
    hasLogin: false
  }
})
