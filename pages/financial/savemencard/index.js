// pages/financial/savemencard/index.js
import {lookforsbmodule} from "../../../module/lookforsb";
const lookforsb = new lookforsbmodule

const app = getApp()
const userId = app.globalData.userId
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCanissue: false,

    id:'-1',//cardId缓存
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
//点击更换
  onChange(){
    wx.navigateTo({
      url: '/pages/mine/myCard/myCard?' +`type=change&&cardId=${this.data.id}`,
    })
  },
    //点击预览
    onPreView(){
        if (this.data.items[0].rate != '0%' && this.data.items[0].rate!='0'){
            wx.navigateTo({
              url: '/pages/financial/card/index?'+`status=preView&&type=2&&id=${this.data.id}`
            })
        }else {
            wx.showToast({
                title: '需要填写必填后才能预览',
                icon:'none'
            })
        }
    },
  onSaveToGoBack() {

    // if (this.data.isNew) {
    //   wx.showToast({
    //     title: '请先创建项目名称',
    //     icon: 'none'
    //   })
    //   return
    // }
    console.log(this.data.isCanissue)
    if (this.data.isCanissue) {
      wx.navigateBack()

    } else {
      wx.showModal({
        title: '提示',
        content: '未完善必填项，不可发布，是否要保存信息？',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateBack()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  },

  onBack(){
    console.log(this.data.items[0].rate)
    if (this.data.items[0].rate != '0%' && this.data.items[0].rate!='0'){
      lookforsb.putInvestmentOperation(userId, this.data.id, '0').then(res => {
        wx.navigateTo({
          url: '/pages/financial/investmentplan/index',
        })
        wx.showToast({
          title: '上架成功',
          icon: 'none'
        })
      })
    }else{
      wx.showToast({
        title: '需要填写必填后才能发布',
        icon:'none'
      })
    }
  },
  _rander(){
    lookforsb.getpeopleCard(this.data.id).then(res => {
      console.log(res);
      let items = this.data.items
      items[0].rate = res.demandProgress || '0'
      items[1].rate = res.ideaProgress || '0'
      items[2].rate = res.caseProgress || '0'
      this.setData({
        cardInfo: res.cardInfo,
        totalProgress: res.totalProgress,
        items: items,
      })

      if (this.data.items[0].rate != '0%' && this.data.items[0].rate != '0') {
        this.setData({
          isCanissue:true,
        })
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id
    })
    this._rander();
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
    this._rander();
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
