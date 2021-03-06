// pages/financial/saveInstitutions/direction/index.js
import { lookforsbmodule } from "../../../../module/lookforsb";
var lookforsb = new lookforsbmodule
Page({

  /**
   * 页面的初始数据
   */
  data: {
id:'-1',//缓存id
      havedData:[],//已经选中的
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onTapindustry(e){
      let  industryList = []
      console.log(e.detail)
      e.detail.forEach(item=>{
          industryList.push(item.id)
      })
      industryList=industryList.join(',')
      lookforsb.postsaveInstitutions(this.data.id,'1',{industryList}).then(res=>{
          wx.navigateBack()
      })
  },
  onLoad: function (options) {
      console.log(options.id);
      this.setData({
          id:options.id,
      })
      lookforsb.getinstitutionsDirection(options.id).then(res=>{
          console.log(res);
          this.setData({
              havedData:res.industryList,
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
