    // pages/mine/myActiveDetails/myActiveDetails.js
var app=getApp();
Page({
  data: {
    isshowmore:false,
    status: '',
    activityId:'',
    companyList:[],
    joinPeople:'',
    joinCompany:'',
    iconList: {
      photo: "../../../assets/images/icon/icon-phone-gray.png",
      email: "../../../assets/images/icon/icon-email-gray.png",
      position: "../../../assets/images/icon/icon-address-gray.png",
      authentication: "../../../assets/images/icon/icon-authentication-yellow.png"
    },
    activityInfo: {},
    btnshow:false,
    showmore:false
  },
  // 打电话
  makeCall:function (e) {
    app.makeCall(e)
  },

   // 去地图页面
  goAddressDes:function (e) {
    var address = e.currentTarget.dataset.address;

    wx.navigateTo({
      url:'../companyAddressMaps/companyAddressMaps?address='+address
    })
  },
  toDelActive(){
    var that = this;
    wx.showModal({
      title: '警告',
      content: '删除后不可恢复!',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: app.data.apiurl+'applets/updateDemand',
            data: {
              demandId: that.data.activityId,
              type: 0
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if (res.statusCode == 200) {
                if (res.data.success == 0) {
                  wx.showToast({
                    title:'删除成功',
                    icon:'success',
                    duration:2000
                  });
                  var pages = getCurrentPages();
                  var prevPage = pages[pages.length - 2]
                  prevPage.setData({currentPage:1,currentPage1:1,activityList1:[]});
                  wx.navigateBack({
                    delta: 1
                  });
                }
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  showmorefun() {
    this.setData({
      isshowmore: !this.data.isshowmore
    });
  },
  getdata() {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/myActivityInfo',
      data: {
        userId:app.globalData.userId,
        activityId: that.data.activityId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.success == 0) {
            console.log(res);
            that.setData({
              activityInfo:res.data.entity.activityInfo,
              companyList:res.data.entity.companyList,
              joinPeople:res.data.entity.joinPeople,
              joinCompany:res.data.entity.joinCompany
            })
            if(that.data.activityInfo&&that.data.activityInfo.imageTextItem&&that.data.activityInfo.imageTextItem.length>2){
              that.setData({showmore:true});
            }
          } else {
            wx.showLoading({
              title: res.data.message,
              image:'../../../assets/images/icon/error-fff.png',
              duration: 2000,
              mask:true
            })
          }
        } else {
          wx.showToast({
            title: '加载失败',
            image:'../../../assets/images/icon/error-fff.png',
            duration: 2000
          })
        }
      },
      fail() {
        wx.showToast({
          title: '加载失败',
          image:'../../../assets/images/icon/error-fff.png',
          duration: 2000
        })
      },
      complete() {
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
    this.setData({activitydetails:app.currClickActive});

    // wx.getStorage({
    //   key: 'myCompanyActivityKey',
    //   success: function(res) {
    //       console.log('getStorage')
    //       console.log(res.data)
    //       console.log('getStorage')
    //   }
    // });

    // console.log('活动详情的onload')
    // console.log(this.data.activitydetails)
    // console.log('活动详情的onload')
    if(options.ismine==1){
      this.setData({btnshow:true});
    }
    this.setData({
      activityId:options.activityId
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
     var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    prevPage.onLoad()
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