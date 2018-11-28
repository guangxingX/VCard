// pages/mine/myCard/myCard.js
var app=getApp();
Page({
  data: {
    businessCard: [],
     iconList:{
      photoWhite:"../../../assets/images/icon/icon-phone.png",
      emailWhite:"../../../assets/images/icon/icon-email.png",
      addressWhite:"../../../assets/images/icon/icon-address.png",
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png",
      mapSmall:'../../../assets/images/icon/map-small.png'
    },
    // 默认头像
    userAvatar:'../../../assets/images/icon/photobg.png',
    pageFrom:'myCard',
  },
  getdata(){
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/myCardList',
      data: {userId:app.globalData.userId,currentPage:1},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          businessCard: res.data.entity.cardList
        });
      },fail:function(){
        console.log(res.data);
      }
    })
  },
  checkedfun:function(e){
    console.log(e)
    var index=e.currentTarget.dataset.index;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]
    prevPage.setData({
      companyName:this.data.businessCard[index].companyName,
      contactName:this.data.businessCard[index].name,
      mycardId:this.data.businessCard[index].id
    });
    wx.navigateBack({
      delta: 1
    });
  },
   addBusinessCard:function () {
      wx.navigateTo({
        url:'../../homePage/addBusinessCard/addBusinessCard'
      })
  },
  goAddressDes:function () {

  },
  makeCall:function (e) {
    app.makeCall(e)
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
    this.getdata();
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