// pages/financial/saveInstitutions/stage/index.js
import { lookforsbmodule } from "../../../../module/lookforsb";

var lookforsb = new lookforsbmodule
Page({

  /**
   * 页面的初始数据
   */
  data: {
      checkboxItems:[
          {name: 'standard is dealt for u.', value: '0', checked: true},
          {name: 'standard is dealicient for u.', value: '1'},
          {name: 'standard is dealt for u.', value: '3', checked: true},
          {name: 'standard is dealicient for u.', value: '2'},
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onTapSave(e){
    console.log(e.detail);
      let stageName = []
      e.detail.checkboxItems.forEach(item=>{
          stageName.push( item.value)
      })
      stageName = stageName.join(',')
    lookforsb.setinstitutionsStage(this.data.id,stageName).then(res=>{
        console.log(res);
        wx.navigateBack()
    })
  },
  onTapSure(){

  },
  onLoad: function (options) {
    // TODO 没有数据结构
      console.log(options.id);
      this.setData({
          id:options.id,

      })
      // TODO 没有数据结构
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
          // TODO 未有数据
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
