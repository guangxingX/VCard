// pages/financial/selectmen/index.js
import { lookforsbmodule } from "../../../module/lookforsb";
import {programemodule} from "../../../module/programe";

const lookforsb = new lookforsbmodule
const programe = new programemodule
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mock:{
      id:1,
        avatar:'',
        name:'陈道明',
        position:'(中国)首席执行官/总裁)',
        mobile:'15801076209',
        email:'wanglu@hopechina.cc'
    },
      employeeList:[],
      options: {} // 缓存对象
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onSelect(e){

      console.log(e.currentTarget.dataset.iteminfo);
      let cardId = e.currentTarget.dataset.iteminfo.cardId||this.data.options.id
      let info = JSON.stringify(e.currentTarget.dataset.iteminfo)
      // console.log('cardId:'+cardId);
      switch (this.data.options.type) {
          case '1':
              //投机构
              console.log(e.currentTarget.dataset.iteminfo);
              let data = JSON.stringify(this.data.options)

              console.log(e.currentTarget.dataset.iteminfo)
              wx.navigateTo({
                  url: '../addmen/editmen/index?'+`data=${info}&&type=1&&isnew=1&&cardId=${cardId}`
              })
              break;
          case '2':
              //联系人
              console.log(2);
              cardId = e.currentTarget.dataset.iteminfo.id
              programe.setprojectintroduction_introEditProgress_callmen(this.data.options.pid,cardId).then(res=>{
                //返回上一页，并显示成功
                  programe.saveSucceed()
              })
              break;
          case '3':
              console.log(info);
              console.log(this.data.options.pid);
              wx.navigateTo({
                  url: '../addmen/editmen/index?'+`data=${info}&&type=3&&isnew=1&&cardId=${this.data.options.pid}`
              })
              break;
      }


  },
  onLoad: function (options) {
      console.log(options)
      this.setData({
          options,
      })


      console.log(options.type)

      //type 1 投资
      //type 2 项目介绍 联系人
      //type 3 项目介绍 核心团队
      switch (options.type) {
          case '1':
              console.log(options)
              options = JSON.parse(options.data)
              console.log(options)
              this.setData({
                  options,
              })
              lookforsb.getcompanyEmployee(options.id).then(res => {
                  console.log(res)
                  this.setData({
                      employeeList:res.teamList||[]
                  })
                  let len = this.data.employeeList.length
                  wx.setNavigationBarTitle({
                      title: `选择成员（共${len}人）`,
                      icon:'none'
                  })
              })
              break;
          case '2':
          case '3':
              console.log(2)
              programe.getCompanyTeam(options.pid).then(res=>{
                  console.log(res)
                  this.setData({
                      employeeList:res.teamList||[]
                  })
                  let len = this.data.employeeList.length
                  wx.setNavigationBarTitle({
                      title: `选择成员（共${len}人）`,
                      icon:'none'
                  })
              })
              break;

      }


  }
  ,

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
