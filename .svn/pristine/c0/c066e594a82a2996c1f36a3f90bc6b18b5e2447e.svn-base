// pages/mine/shareCompanyCard/shareCompanyCard.js
Page({
  data: {
    companyInfo:{},
    iconList:{authentication:'../../../assets/images/icon/icon-authentication-yellow.png',
    share:'../../../assets/images/icon/icon-share.png'},
    isshare:false,
    isedit:false
  },
  // 去地图页面
  goAddressDes:function (e) {
    var address = e.currentTarget.dataset.address;
    console.log(e)
    console.log(address)
    wx.navigateTo({
      url:'../companyAddressMaps/companyAddressMaps?address='+address
    })
  },
  onLoad: function (options) {
    var self = this;
     wx.setNavigationBarTitle({
        title: '分享名片'
      });
      wx.getStorage({
        key: 'shareCompanyCardKey',
        success: function(res) {
          var data = res.data;
          console.log('c从缓存获取到的公司信息是')
          console.log(data)
          console.log('c从缓存获取到的公司信息是')
          self.setData({
            companyInfo:data
          })
        },
        fail: function(res) {

        },
        complete: function(res) {

        }
      });
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
    wx.removeStorage({
      key: 'shareCompanyCardKey',
      success: function(res) {

      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    });
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
    var id = this.data.companyInfo.id;
     return {
        title: '分享给您的名片,请惠存',
        path: 'pages/mine/myCompanyDes/myCompanyDes?id='+id
      }
  }
})