var app = getApp();
Page({
  data: {
    name:'',
    mobile:'',
    address:'',
    email:'',
  },

  toaddressMaps(e){
    console.log(e.currentTarget.dataset.adress);
    wx.navigateTo({
      url: "../../mine/companyAddressMaps/companyAddressMaps?address="+e.currentTarget.dataset.address,
      success: res => {

      },
      fail: res => {

      },
      complete: res => {

      }
    })
  },
  makeCall:function (e) {
    app.makeCall(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      if(options.name == 'undefined' || !options.name){
        this.setData({
          name:''
        })
      }else{
        this.setData({
          name:options.name
        })
      }


      if(options.mobile == 'undefined' || !options.mobile){
        this.setData({
          mobile:''
        })
      }else{
        this.setData({
          mobile:options.mobile
        })
      }
      if(options.address == 'undefined' || !options.address){
        this.setData({
          address:''
        })
      }else{
        this.setData({
          address:options.address
        })
      }
      if(options.email == 'undefined' || !options.email){
        this.setData({
          email:''
        })
      }else{
        this.setData({
          email:options.email
        })
      }

    // this.setData({name:options.name,mobile:options.mobile,address:options.address,email:options.email});
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