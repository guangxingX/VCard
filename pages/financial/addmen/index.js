// pages/financial/addmen/index.js
import { lookforsbmodule } from "../../../module/lookforsb";
const lookforsb = new lookforsbmodule
import {programemodule} from "../../../module/programe";
const programe = new programemodule
Page({

  /**
   * 页面的初始数据
   */
  data: {
      coreTeam:[{
        name:'---',
          gender:'--',
          position:'-----',
          intro:'-----'

      }],
      options:{} ,//缓存options
      isCanEdit:true, //是否可以去编辑
  },
  onTapAdd(e){
      switch (this.data.options.type) {
          //机构
          case '1':
              let data = JSON.stringify(this.data.options)
              wx.navigateTo({
                  url: '../selectmen/index?'+`data=${data}&&type=${this.options.type}`
              })
              break;
          case '2':
              wx.navigateTo({
                  url: '../selectmen/index?'+`pid=${this.options.pid}&&type=${this.options.type}`
              })
              break;
          case '3':
              wx.navigateTo({
                  url: '../selectmen/index?'+`pid=${this.options.pid}&&type=${this.options.type}`
              })
              break;
      }


  },
    onEdit(e){
        switch (this.data.options.type) {
            //机构
            case '1':
                console.log(e.detail)
                var data= JSON.stringify(e.detail)
                wx.navigateTo({
                    url: 'editmen/index'+'?' +'data='+ data +`&&mold=edit&&type=${this.options.type}`,
                })
                break;
            case '3':
                console.log(e.detail)
                var data= JSON.stringify(e.detail)
                wx.navigateTo({
                    url: 'editmen/index'+'?' +'data='+ data +`&&mold=edit&&type=${this.options.type}`,
                })
                break;
        }

    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
        options:options
    })

      //type 1 投资机构

      //type 2 项目介绍 联系人

      //type 3 项目介绍 核心团队
    switch (options.type) {
        //机构
        case '1':
            lookforsb.getinstitutionsCoreTeam(options.id).then(res => {
                console.log(res);
                this.setData({
                  coreTeam:res.coreTeam
                })
            })
            break;
        case '2':
            //项目
            console.log(2);
            this.setData({
                isCanEdit:false,
            })
            programe.getPersionmen(options.pid).then(res=>{
                console.log(res)
                this.setData({
                    coreTeam:res.teamList
                })
            })
            break;
        case '3':
            console.log(3);
            this.setData({
                isCanEdit:true,
            })
            programe.getUserIntroTeam(options.pid).then(res=>{
                console.log(res)
                this.setData({
                    coreTeam:res.teamList
                })
            })

    }
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
