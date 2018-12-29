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
      employeeList:[],
      options: {} // 缓存对象
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onSelect(e){
      console.log(e.currentTarget.dataset.iteminfo);
      let data = JSON.stringify(this.data.options)
      let info = JSON.stringify(e.currentTarget.dataset.iteminfo)
      wx.navigateTo({
        url: '../addmen/editmen/index?'+`data=${data}&&mold='show'&&info=${info}`
      })

  },
  onLoad: function (options) {
      console.log(options)
      options = JSON.parse(options.data)
      console.log(options)
      this.setData({
          options,
      })
      console.log(options.type)

      switch (options.type) {
          case '1':
              lookforsb.getcompanyEmployee(options.id).then(res => {
                  console.log(res)
                  this.setData({
                      employeeList:res.employeeList
                  })
                  let len = this.data.employeeList.length

                  wx.setNavigationBarTitle({
                      title: `选择成员（共${len}人）`,
                      icon:'none'
                  })
              })
              break;

      }


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
