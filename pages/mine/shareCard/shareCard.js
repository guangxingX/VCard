// pages/mine/shareCard/shareCard.js
var app=getApp();
Page({
  data: {
    cardInfo:'',
    cardid:'',
    logo:'',
    iconList:{
      bluetag:'../../../assets/images/icon/icon-tag.png',
      photoWhite:"../../../assets/images/icon/icon-phone.png",
      emailWhite:"../../../assets/images/icon/icon-email.png",
      addressWhite:"../../../assets/images/icon/icon-address.png",
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png",
      mapSmall:'../../../assets/images/icon/map-small.png'
    },
    pageFrom:'shareCard',
    // 默认头像
    userAvatar:'../../../assets/images/icon/photobg.png',
  },
  // 打电话
  makeCall:function (e) {
    app.makeCall(e)
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
      key: 'shareCardCardKey',
      success: function(res) {
         self.setData({
            cardInfo:res.data
          })

         if(res.data.avatar){
          self.setData({
            logo:res.data.avatar
          })
         }else{
          self.setData({
            logo:'../../../assets/images/icon/mycard-avatar-default.png'
          })
         }

        console.log('从缓存获取到的名片数据是')
        console.log(self.data.cardInfo)
        console.log('从缓存获取到的名片数据是')
      },
      fail: function(res) {

      },
      complete: function(res) {

      }
    });

    var item = options.item;


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
        key: 'shareCardCardKey',
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
    var cardid = this.data.cardInfo.id;
     return {
        title: '分享给您的名片,请惠存',
        path: "pages/mine/cardDetails/cardDetails?from="+'share'+'&mycardid='+cardid
      }
  }
})