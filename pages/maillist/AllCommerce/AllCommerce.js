// pages/maillist/AllCommerce/AllCommerce.js
var app=getApp();
Page({
  data: {
    searchcoc:'',
    currentPage:1,
    totalPageSize:1,
    iconList:{
      photo:"../../../assets/images/icon/icon-phone-gray.png",
      email:"../../../assets/images/icon/icon-email-gray.png",
      position:"../../../assets/images/icon/icon-address-gray.png",
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png"
    },
    qualityCC:[]
  },
  makeCall:function (e) {
    app.makeCall(e)
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
  toSearch(e){
    wx.navigateTo({
      url: "../../commenPage/searchPage/searchPage?storageKey="+e.currentTarget.dataset.storagekey,
      success: res => {
      },
      fail: res => {
      },
      complete: res => {

      }
    })
  },
  tomaillist(){
    wx.navigateBack({
         delta: 1
    })
  },
  toCommerceDetails(e){
    wx.navigateTo({
      url: "../commerceDetails/commerceDetails?cocid="+e.currentTarget.dataset.cocid,
      success: res => {

      },
      fail: res => {

      },
      complete: res => {

      }
    })
  },
  getdata(){
    wx.showLoading({
      title: '加载中',
      mask:true
    })

    console.log('名称')

    console.log('名称')

    var that=this;
    wx.request({
      url: app.data.apiurl+'applets/allCocList',
      data: {name:that.data.searchcoc,currentPage:that.data.currentPage},
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(that.data.currentPage)
        console.log(res);
        if(res.statusCode==200){
          if(res.data.success==0){
            that.setData({
              qualityCC:that.data.qualityCC.concat(res.data.entity.cocList),
              totalPageSize:res.data.entity.totalPageSize
            });
            that.data.qualityCC.forEach(function(item,index,arr){
              item.textlogo=item.name.substring(0,2);
               // 有http前缀
                if(item.logo&&item.logo.indexOf('http') == -1){
                  item.logo='https://static.upedu.cc/'+item.logo;
                }
            });
             that.setData({
              qualityCC:that.data.qualityCC
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
    this.setData({currentPage:1});
    this.getdata()
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
    if(this.data.currentPage<this.data.totalPageSize){
      this.data.currentPage+=1;
      this.setData({
        currentPage:this.data.currentPage
      });
      this.getdata();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})