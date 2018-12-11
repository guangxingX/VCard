// pages/financial/contactme/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    length: 0,
    value: '',
  },
  bindFormSubmit(e) {
    console.log(this.data.value)
  },
  bindTextAreaBlur(e) {
    console.log(e.detail.value)

    this.setData({
      length: e.detail.value.length,
      value: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.info)
    var info = JSON.parse(options.info)
    console.log(info)
    this.setData({
      info,
    })
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