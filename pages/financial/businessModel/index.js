// pages/financial/itemIntr/index.js
import {programemodule} from "../../../module/programe";
const programe = new programemodule
Page({

  /**
   * 页面的初始数据
   */
  data: {
      items: [
          {
              name:'产品定位',
              tip:'请描述公司锁定是什么产业？',
              rate:'0',
              fn:'onProductPositioning'
          },
          {
              name: '空间趋势',
              tip: '请分析产业的发展趋势',
              rate: '0',
              fn:'onTendency'
          },
          {
              name: '产品优势',
              tip: '请描述企业的产品都有那些？',
              rate: '0',
              fn:'onProductSuperiority'
          },
          {
              name: '目标客户',
              tip: '请描述企业所服务的目标客户？',
              rate: '0',
              fn:'onTargetCustomer'
          },
          {
              name: '价值主张',
              tip: '请描述企业的价值主张',
              rate: '0',
              fn:'onValueProposition'
          },
          {
              name: '渠道通路',
              tip: '请描述产品营销的策略是什么？',
              rate: '0',
              fn:'onChannels'
          },
          {
              name: '竞争优势',
              tip: '请描述公司的竞争优势是什么？',
              rate: '0',
              fn:'onCompetitiveEdge'
          },
          {
              name: '收入模式',
              tip: '请描述公司的收入模式是什么？',
              rate: '0',
              fn:'onIncomeMode'
          },
          {
              name: '成本构成',
              tip: '请描述公司运营的成本构成',
              rate: '0',
              fn:'onCostStructure'
          },
      ],
      pid:`-1`,//缓存pid
      logo:'',//logo
      title:'',//公司名字
      Intro:'',//公司介绍
  },

    //产品定位
    //type 1
    onProductPositioning(){
        wx.navigateTo({
            url: '/pages/financial/mixture/ImageText/index?'+`pid=${this.data.pid}&&type=1&&name=产品定位`
        })
    },
    //空间趋势
    // type 2
    onTendency(){
        wx.navigateTo({
            url: '/pages/financial/mixture/ImageText/index?'+`pid=${this.data.pid}&&type=2&&name=空间趋势`
        })
    },
    //产品优势
    // type 3
    onProductSuperiority(){
        wx.navigateTo({
            url: '/pages/financial/mixture/ImageText/index?'+`pid=${this.data.pid}&&type=3&&name=产品优势`
        })
    },
    //目标客户
    // type 4
    onTargetCustomer(){
        wx.navigateTo({
            url: '/pages/financial/mixture/ImageText/index?'+`pid=${this.data.pid}&&type=4&&name=目标客户`
        })
    },

    //价值主张
    //type 5
    onValueProposition(){
        wx.navigateTo({
            url: '/pages/financial/mixture/ImageText/index?'+`pid=${this.data.pid}&&type=5&&name=价值主张`
        })
    },
    //渠道通路
    //type 6
    onChannels(){
        wx.navigateTo({
            url: '/pages/financial/mixture/ImageText/index?'+`pid=${this.data.pid}&&type=6&&name=渠道通路`
        })
    },
    //竞争优势
    //type 7
    onCompetitiveEdge(){
        wx.navigateTo({
            url: '/pages/financial/mixture/ImageText/index?'+`pid=${this.data.pid}&&type=7&&name=竞争优势`
        })
    },
    //收入模式
    //type 8
    onIncomeMode(){
        wx.navigateTo({
            url: '/pages/financial/mixture/ImageText/index?'+`pid=${this.data.pid}&&type=8&&name=收入模式`
        })
    },
    //成本构成
    //type 9
    onCostStructure(){
        wx.navigateTo({
            url: '/pages/financial/mixture/ImageText/index?'+`pid=${this.data.pid}&&type=9&&name=成本构成`
        })
    },


  /**
   * 生命周期函数--监听页面加载
   */
  _rander(){
      programe.getBusinessEditProgress(this.data.pid).then(res=>{
          // console.log(res);
          let businessEdit = res.businessEdit
          console.log(businessEdit);
          // console.log(introEdit.companyLabel);
          // let Intro
          // if(introEdit.companyLabel){
          //      Intro = introEdit.companyLabel.join(',')
          // }
          let items= this.data.items
          items[0].rate = businessEdit.positioningProgress||'0'
          items[1].rate = businessEdit.trendProgress||'0'
          items[2].rate = businessEdit.productsAdvantageProgress||'0'
          items[3].rate = businessEdit.targetCustomerProgress||'0'
          items[4].rate = businessEdit.valuePropositionProgress||'0'
          items[5].rate = businessEdit.channelProgress||'0'
          items[6].rate = businessEdit.competitionAdvantageProgress||'0'
          items[7].rate = businessEdit.revenueModelProgress||'0'
          items[8].rate = businessEdit.costStructure||'0'
          this.setData({
              items,
          })
      })
  },
  onLoad: function (options) {
      console.log(options)
        //保存pid跳转传参
      this.setData({
          pid:options.pid
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
      this._rander()
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
