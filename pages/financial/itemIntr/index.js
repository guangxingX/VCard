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
              name:'增加联系人',
              tip:'至少增加一个联系人',
              rate:'0',
              fn:'onTapintrmen'
          },
          {
              name: '核心团队',
              tip: '请介绍您的团队成员',
              rate: '0',
              fn:'onTapTeam'
          },
          {
              name: '适用客户',
              tip: '请描述产品或服务适合的客户',
              rate: '0',
              fn:'onTapCustom'
          },
          {
              name: '产品价值',
              tip: '请描述能够给客户带来的好处',
              rate: '0',
              fn:'onTapValue'
          },
          {
              name: '客户案例',
              tip: '请增加相关客户案例',
              rate: '0',
              fn:'onTapCase'
          },
      ],
      pid:`-1`,//缓存pid
      logo:'',//logo
      title:'',//公司名字
      Intro:'',//公司介绍
  },
    //点击了公司名称
    onTapLogo(){
        wx.navigateTo({
            url: '/pages/mine/myCompany/myCompany?type=edit&&'+`pid=${this.data.pid}`
        })
    },
    //点击联系人
    onTapintrmen(e){
      console.log( e.currentTarget.dataset.handle)
        if()
    },
    onTapTeam(e){

        console.log( e.currentTarget.dataset.handle)
    },
    onTapCustom(e){

        console.log( e.currentTarget.dataset.handle)
    },
    onTapValue(e){

        console.log( e.currentTarget.dataset.handle)
    },
    onTapCase(e){

        console.log( e.currentTarget.dataset.handle)
    },
    onTapintr111(e){

        console.log( e.currentTarget.dataset.handle)
    },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
        //保存pid跳转传参
      this.setData({
          pid:options.pid
      })
      programe.getprojectintroduction_introEditProgress(options.pid).then(res=>{
          console.log(res);
          let introEdit = res.introEdit
          console.log(introEdit);
          console.log(introEdit.Intro);
          let items= this.data.items
          items[0].rate = introEdit.companyIntro||'0'
          items[1].rate = introEdit.coreTeam||'0'
          items[2].rate = introEdit.applyClient||'0'
          items[3].rate = introEdit.value||'0'
          items[4].rate = introEdit.case||'0'
          this.setData({
              logo:introEdit.logo,
              Intro:introEdit.Intro,
              title:introEdit.title,
            items,
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
