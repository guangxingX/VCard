var app=getApp()

Page({
  data: {
    currentPage:1,
    messageList:[],
  },

  makeCall:function (e) {
    app.makeCall(e)
  },

  // 去活动详情
  goActiveDetails:function (e) {
    console.log('去活动详情-e')
    console.log(e)
    console.log('去活动详情-e')
    var activityid = e.currentTarget.dataset.objectid;
    wx.navigateTo({
      url:'../activityDetails/activityDetails?activityId='+activityid
    })
  },
  //根据头像去名片详情
  goCardDetails:function (e) {
    var cardid = e.currentTarget.dataset.cardid;
    var cardisdel= e.currentTarget.dataset.cardisdel;
    console.log(cardisdel)
    if(cardisdel==1){
      wx.showToast({
        title: "该名片已被删除",
        image:'../../../assets/images/icon/error-fff.png',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url:'../../mine/cardDetails/cardDetails?mycardid='+cardid
      })
    }
  },
  // 去地图
  goAddressDes:function (e) {
    var address = e.currentTarget.dataset.address;
    wx.navigateTo({
      url:'../../mine/companyAddressMaps/companyAddressMaps?address='+address
    })

  },
  getdata:function () {
    var that=this;
    var userId = app.globalData.userId;
    wx.showLoading({
      title: '加载中',
      mask:true
    })

    wx.request({
      url: app.data.apiurl+'applets/ownMessageList',
      data: {
        userId:userId,
        // 活动
        type:'2',
        currentPage:that.data.currentPage
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();

        if(res.statusCode==200){
          if(res.data.success==0){
            that.setData({
              messageList:res.data.entity.messageList
            })
            console.log('活动报名情况是')
            console.log(that.data.messageList)
            console.log('活动报名情况是')

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
    });
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
    this.setData({currentPage:1,messageList:[]});
    this.getdata();
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
    var self=this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    self.setData({
      currentPage:1,
      messageList:[]
    })
    setTimeout(function () {
        self.getdata()
    },1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("触底事件")
    if(this.data.currentPage<this.data.totalPageSize){
      this.data.currentPage+=1;
        this.setData({
          currentPage:this.data.currentPage,
        });
      this.getdata();
    }else{
      wx.showToast({
        title: '没有更多数据了',
       icon: 'success',
        duration: 2000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})