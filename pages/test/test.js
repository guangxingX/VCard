// pages/test/test.js
Page({

  /**
   * Page initial data
   */
  data: {
    ImageTextItem: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {
    console.log(this.ImageTextItem)
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  },
  onTapTest: function() {
    console.log(this.ImageTextItem)
  },
  onToTest:function(){
    wx.navigateTo({
      url: '../test2/test',
      success: res => {
      },
      fail: res => {
      },
      complete: res => {
      }
    })

    wx.navigateTo({
      url: '../productInsertText/productInsertText?page=addResource',
      success: res => {
      },
      fail: res => {
      },
      complete: res => {
      }
    })
  }
})