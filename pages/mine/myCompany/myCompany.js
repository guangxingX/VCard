// pages/mine/myCompany/myCompany.js
var app=getApp();
Page({
  data: {
      currentPage:1,
      pageSize:10,
      companyList:[],
  },
  goXiangqing:function(){
    wx.navigateTo({
      url: '../myCompanyDes/myCompanyDes',
      success: res => {
      },
      fail: res => {
      },
      complete: res => {
      }
    })
  },
  goAddCompany:function () {
    wx.navigateTo({
      url: '../addCompany/addCompany'
    })
  },
   getdata:function () {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    var that=this;
    var app = getApp();
    var id = app.globalData.userId;
    wx.request({
      url: app.data.apiurl+'applets/myCompanyList',
      data: {userId:id,currentPage:that.data.currentPage,pageSize:that.data.pageSize},
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if(res.statusCode==200){
          if(res.data.success==0){
            console.log('请求的数据是--------')
            console.log(res);
            console.log('请求的数据是--------')
            that.setData({
              companyList:res.data.entity.companyList
          });
          }else{
            wx.showToast({
              title: res.data.message,
              image:'../../../assets/images/icon/error-fff.png',
              duration: 2000
            })
          }
        }else{
          wx.showToast({
            title: '加载失败',
            image:'../../../assets/images/icon/error-fff.png',
            duration: 2000
          })
        }
      },
      fail(){
        wx.showToast({
          title: '加载失败',
          image:'../../../assets/images/icon/error-fff.png',
          duration: 2000
        })
      },
      complete(){
        wx.hideLoading({
          title: '加载中'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getdata();
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