// import { lookforsbmodule } from "../../../../module/lookforsb";
// var lookforsb = new lookforsbmodule
import {programemodule } from "../../../../module/programe";
const programe = new programemodule
Page({

  /**
   * 页面的初始数据
   */
  data: {
      ImageTextItem:[],//图文的信息 必须有
      pid:'-1', //缓存projectId
      options:{},//缓存options参数
      type:`-1`,//缓存type值

  },
    onTapSave(e){
        console.log(e.detail.ImageTextItem);
        // console.log(this.data.ImageTextItem);
        console.log(1)
        this.setData({
            ImageTextItem:e.detail.ImageTextItem,
        })
        programe.postsaveImageTextDatta(this.data.pid,this.data.type,this.data.ImageTextItem).then(res=>{
            programe.saveSucceed()
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
      //设置标题
      if(options.name){
          wx.setNavigationBarTitle({
              title: `${options.name}`,
              icon:'none'
          })
      }

      this.setData({
          options,
          pid:options.pid,
          type:options.type,
      })

      programe.getImageTextDatta(this.data.pid,this.data.type).then(res=>{
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
