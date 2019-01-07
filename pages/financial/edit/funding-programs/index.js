// pages/financial/edit/funding-programs/index.js
import {programemodule} from "../../../../module/programe";
const programe = new programemodule
Page({

  /**
   * 页面的初始数据
   */
  data: {
      radioItems:
          [
              { name: '债权', value: '0', checked: true },
              { name: '股权', value: '1', }
          ],
      options:{},//缓存参数
      his:[],//
      phase:'',

  },
    onTapChangeChoice(e){
        console.log(e.detail);
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onTapUsePlan(){
    //需要隐藏
  },
    onTabStage(){

    },
    onHis(){
      wx.navigateTo({
        url: 'his/index?type=new'
      })
    },
  onLoad: function (options) {
    this.setData({
        options,
    })
      programe.getfinancingInfo(this.data.options.pid).then(res=>{
          console.log(res);
          let data = res.financingInfo

          //渲染融资阶段
          // 投资模式
          if(data.model=='股权'){
            let radioItems = this.data.radioItems
              radioItems[0].checked=false
              radioItems[1].checked=true
              this.setData({
                  radioItems
              })
          }
          this.setData({
              his:data.investment,
              phase:data.phase,

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
