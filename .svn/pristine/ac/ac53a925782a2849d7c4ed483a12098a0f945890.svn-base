// pages/mine/acitvitySignUpList/acitvitySignUpList.js
var app=getApp();
Page({
  data: {
    companyList:[],
    activityId:'',
    joinCompany:0,
    joinPeople:0
  },
  getdata() {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/myActivityInfo',
      data: {
        userId:app.globalData.userId,
        activityId: that.data.activityId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.success == 0) {
            console.log(res);
            that.setData({
              companyList:res.data.entity.companyList,
              joinPeople:res.data.entity.joinPeople,
              joinCompany:res.data.entity.joinCompany
            })
            console.log(that.data.companyList);
          } else {
            wx.showLoading({
              title: res.data.message,
              image:'../../../assets/images/icon/error-fff.png',
              duration: 2000,
              mask:true
            })
          }
        } else {
          wx.showToast({
            title: '加载失败',
            image:'../../../assets/images/icon/error-fff.png',
            duration: 2000
          })
        }
      },
      fail() {
        wx.showToast({
          title: '加载失败',
          image:'../../../assets/images/icon/error-fff.png',
          duration: 2000
        })
      },
      complete() {
        wx.hideLoading({
          title: '加载中'
        })
      }
    })
  },
   //根据头像去名片详情
  goCardDetails:function (e) {
    var cardid = e.currentTarget.dataset.cardid;
    var cardisdel= e.currentTarget.dataset.cardisdel;
    console.log(cardisdel)
    if(cardisdel==1){
      wx.showToast({
        title: "该名片已被删除",
        image:'../../../assets/images/icon/error-fff.png',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url:'../../mine/cardDetails/cardDetails?mycardid='+cardid
      })
    }
  },
  makeCall:function (e) {
    console.log(e)
    app.makeCall(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({activityId:options.activityId});
    this.getdata();
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