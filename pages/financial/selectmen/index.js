// pages/financial/selectmen/index.js
import { lookforsbmodule } from "../../../module/lookforsb";

var lookforsb = new lookforsbmodule
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mock:{
      id:1,
        avatar:'',
        name:'陈道明',
        position:'(中国)首席执行官/总裁)',
        mobile:'15801076209',
        email:'wanglu@hopechina.cc'
    },
      employeeList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      lookforsb.getcompanyEmployee(options.id).then(res => {

          this.setData({
              employeeList:res.employeeList
          })
          let len = this.data.employeeList.length

          wx.setNavigationBarTitle({
              title: `选择成员（共${len}人）`
          })
      })

  }
  ,

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
