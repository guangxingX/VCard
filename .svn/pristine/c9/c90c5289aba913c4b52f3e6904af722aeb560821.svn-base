// pages/homePage/choiseAdress/choiseAdress.js
var app=getApp();
Page({
  data: {
    errorshow:false,
    region:[],
    regionstr:'',
    detailsAddress:'',
    failuretip:'请选择城市',
    prevPage:''
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
      regionstr:e.detail.value[0]+' '+e.detail.value[1]+' '+e.detail.value[2],
      errorshow:false
    })
  },
  getInputContent(e){
    this.setData({
      detailsAddress:e.detail.value,errorshow:false
    });
  },
  saveaddress(){
    var that = this;
     setTimeout(function(){
        that.setData({errorshow:false})
      },1000)

    if(that.data.regionstr==''){
      that.setData({errorshow:true,failuretip:'请选择城市'});
    }else if(that.data.detailsAddress==''){
      that.setData({errorshow:true,failuretip:'请填写详细地址'});
    }else{
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]
      prevPage.setData({address:that.data.regionstr+that.data.detailsAddress,adress1:that.data.regionstr,address2:that.data.detailsAddress});
      wx.navigateBack({
        delta: 1
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.page=="addactive"){
      this.setData({prevPage:options.page});
    }else{
      this.setData({regionstr:options.address1,detailsAddress:options.address2});
    }
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
  // onShareAppMessage: function () {

  // }
})