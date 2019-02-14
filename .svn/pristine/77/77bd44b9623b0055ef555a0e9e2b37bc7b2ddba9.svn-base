// pages/financial/mixture/searchResult/index.js
import {lookforsbmodule} from "../../../../module/lookforsb";
const lookforsb = new lookforsbmodule
Page({

  /**
   * 页面的初始数据
   */
  data: {
      options:{},
      lookforList:[],
      projectList:[],
      activeIndex:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
      this.setData({
          options
      })
      if(this.data.options.storageKey=='investmentSearch'){
        this.setData({
            activeIndex:0
        })
          lookforsb.getSearchResult(this.data.options.searchname,'1','1').then(res=>{
              console.log(res);
              this.setData({
                  lookforList:res.list
              })
          })
      }else if(this.data.options.storageKey=='projectSearch'){
          this.setData({
              activeIndex:1
          })
          lookforsb.getSearchResult(this.data.options.searchname,'2','1').then(res=>{
              console.log(res);
              this.setData({
                  projectList:res.projectList
              })
          })
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
  onShareAppMessage: function () {

  }
})
