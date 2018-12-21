// pages/financial/addmen/index.js
import { lookforsbmodule } from "../../../module/lookforsb";
var lookforsb = new lookforsbmodule
Page({

  /**
   * 页面的初始数据
   */
  data: {
      coreTeam:[{
        name:'王清文',
          gender:'nv',
          position:'核心投资经纪人',
          intro:'跨国企业寻合作，资方齐抛橄榄枝（投第317\n' +
              '期VIP投资发展沙龙成功举功举功举功举...',
      }]
  },
  onTapAdd(e){
      console.log(e.detail);
  },
    onEdit(e){
        console.log(e.detail)
       let data= JSON.stringify(e.detail)
        wx.navigateTo({
          url: 'editmen/index'+'?' +'data='+ data ,
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.type)
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
