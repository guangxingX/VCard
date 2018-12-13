// pages/financial/edit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo:'',
    avatar:'',
    items: [
    {
        name:'项目介绍',
        tip:'请详细的介绍您的项目？',
        rate:'0',
        must:true,
        fn:'onTapintr'
    },
      {
        name: '融资计划',
        tip: '让投资者更加了解融资计划？',
        rate: '0',
        must: true,
        fn:'onTapPlan'
      },
      {
        name: '路演视频',
        tip: '请上传路演视频，直观阐述项目优势？',
        rate: '0',
        fn:'onTapVideo'
      },
      {
        name: '资源储备',
        tip: '请描述项目的资源储备情况？',
        rate: '0',
        fn:'onTapReso'
      },
      {
        name: '商业模式',
        tip: '请详细的介绍您的项目？',
        rate: '0',
        fn:'onTapBusiness'
      },
    ]
  },
  onTapintr(){
    console.log('onTapintr')
  },
  onTapPlan(){
    console.log('onTapPlan')
  },
  onTapVideo(){
    console.log('onTapVideo')
  },
  onTapReso(){
    console.log('onTapReso')
  },
  onTapBusiness(){
    console.log('onTapBusiness')
  },
  onTapPreShow(){
    console.log('onTapPreShow')
  },
  onTapLogo(){
    wx.navigateTo({
      url: '/pages/financial/projectinfo/index',
    })
    console.log('onTapLogo')
  },
  showTopTips(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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