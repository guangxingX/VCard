// pages/financial/savemencard/require/stage/index.js
import {lookforsbmodule} from "../../../../../module/lookforsb";
const lookforsb = new lookforsbmodule
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxItems: [
      
    ],

      id:'0',


  },
  onTapSave(e){
      console.log(e.detail);
      let stagedata = e.detail
      var pages = getCurrentPages();
      var prevPage = pages[pages.length-2];
      let stageName = []
     const nameList = e.detail.checkboxItems
        e.detail.checkboxValue.forEach(_i=>{
          stageName.push(nameList[_i].name) 
        })
          
      
      stageName = stageName.join(',')
    console.log(stageName)
      prevPage.setData({
          stageData:stagedata,
          stageName,
      })

      wx.navigateBack()

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options.id);
      this.setData({
        id:options.id,

      })

    lookforsb.getinstitutionsStage(options.id).then(res => {
      // console.log(res)
        let checkboxItems = []
        let stage = res.stage
        res.stageList.forEach(item=>{
          let obj = {}
          obj.name = item.stage_name
          obj.value = item.id
            stage.forEach(_i=>{
                if(_i == item.id){
                    obj.checked = true
                }
            })

            checkboxItems.push(obj)
        })

        this.setData({
            checkboxItems,
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
