import {HTTP} from '../../utils/http.js'
var http = new HTTP
import {DATAMODULE} from '../../module/data.js'
// var dataModule = new DATAMODULE;
var Store = require('../../store')
// pages/test/test.js
Page({

  /**
   * Page initial data
   *
   */
  data: {
    ImageTextItem: []
  },
  /***
   *
   * _do
   * ***/
  _init(){
    Store.ImageTextItem=[]
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
      this._init()

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {
    console.log(this.ImageTextItem)
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {
      // dataModule.getIndustryList().then(res=>{
      //     console.log(res);
      // })
    console.log(Store.ImageTextItem)
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
    this._init()
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
  onPostcommit:function(){
    console.log()
  },
  onTapTest: function() {
    console.log(this.ImageTextItem)
  },
  onToTest:function(){
    wx.navigateTo({
      url: '/component/image-text/index',
      success: res => {
        Store.ImageTextItem.push({name:'1'})
      },
      fail: res => {
      },
      complete: res => {
      }
    })
  }
})
