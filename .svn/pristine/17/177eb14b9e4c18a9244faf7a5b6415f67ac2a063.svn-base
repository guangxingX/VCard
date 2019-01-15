// pages/financial/savemencard/index.js
import {lookforsbmodule} from "../../../module/lookforsb";
const lookforsb = new lookforsbmodule
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'-1',//ID缓存
      totalProgress:0,
      items: [
          {
              name: '投资需求',
              tip: '请填写主要投资哪些需求？',
              rate: '0',
              must: true,
              fn: 'onTapItem_0'
          },
          {
              name: '投资理念',
              tip: '请阐述具体的投资理念？',
              rate: '0',
              fn: 'onTapItem_1',
              must: false,
          },
          {
              name: '客户案例',
              tip: '请填写主要投资哪些阶段？',
              rate: '0',
              fn: 'onTapItem_2',
              must: false,
          },
      ],
      cardinfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        id:options.id
    })
    lookforsb.getpeopleCard(options.id).then(res=>{
        // console.log(res);
         let items = this.data.items
        items[0].rate = res.demandProgress || '0'
        items[1].rate = res.ideaProgress || '0'
        items[2].rate = res.caseProgress || '0'
        this.setData({
            cardInfo:res.cardInfo,
            totalProgress:res.totalProgress,
            items:items,
        })
    })
  },
    //投资需求
    onTapItem_0(){
        wx.navigateTo({
            url: '/pages/financial/savemencard/require/index?'+`id=${this.data.id}`
        })
    },
    //投资理念
    onTapItem_1(){
        wx.navigateTo({
            url: '/pages/financial/savemencard/idea/index?'+`id=${this.data.id}`
        })
    },
    //客户案例
    onTapItem_2(){
        wx.navigateTo({
            url:'/pages/financial/saveInstitutions/case/index?'+`id=${this.data.id}&&type=2`
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
