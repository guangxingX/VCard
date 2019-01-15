// pages/financial/saveInstitutions/idea/index.js
// TODO 未有接口
import { lookforsbmodule } from "../../../../module/lookforsb";
var lookforsb = new lookforsbmodule
Page({

  /**
   * 页面的初始数据
   */
  data: {
      ImageTextItem:[],//图文的信息
      id:'-1'
  },
    onTapSave(e){
        console.log(e.detail.ImageTextItem);
        // console.log(this.data.ImageTextItem);
        console.log(1)
        this.setData({
            ImageTextItem:e.detail.ImageTextItem,
        })
        lookforsb.setmenidea(this.data.id,this.data.ImageTextItem).then(res=>{
            wx.navigateBack({})
            wx.showToast({
              title: '保存成功'
            })
        })
    },
    onTapView(){
        console.log(2)
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      this.setData({
          id:options.id
      })
      lookforsb.getmenidea(options.id).then(res=>{
          console.log(res);
          this.setData({
              ImageTextItem:res.imageText
          })
      })
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
