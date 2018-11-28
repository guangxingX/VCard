// pages/activity/activityDetails/activityDetails.js
var app = getApp();
Page({
  data: {
    activityId: '',
    isshowmore: false,
    iconList: {
      photo: "../../../assets/images/icon/icon-phone-gray.png",
      email: "../../../assets/images/icon/icon-email-gray.png",
      position: "../../../assets/images/icon/icon-map.png",
      authentication: "../../../assets/images/icon/icon-authentication-yellow.png"

    },
    activityInfo: {},
    activityCompanyInfo: {},
    activitydetails: {},
    loading:false,
    activityState:'',
    ore:false,
    noSecondsStartTime:'',
    noSecondsEndTime:''
  },
  toEnter: function () {
    if(this.data.activityInfo.method==1){
      this.data.activityInfo.companyName=this.data.activityCompanyInfo.name;
      this.data.activityInfo.isAuthentication=this.data.activityCompanyInfo.isAuthentication;
    }else if(this.data.activityInfo.method===0){
      this.data.activityInfo.companyName=this.data.activityCompanyInfo.name;
    }else{
      this.data.activityInfo.companyName=this.data.activityCompanyInfo;
    }
    console.log(this.data.activityInfo);
    this.setData({loading:true});
    wx.setStorageSync('activityDetailsInfo', this.data.activityInfo)
    wx.navigateTo({
      url: '../enterActivity/enterActivity?activityid=' + this.data.activityId,
      success: res => {
        this.setData({loading:false});
      },
      fail: res => {

      },
      complete: res => {

      }
    })
  },
  toaddressMaps:function (e) {
    var address = e.currentTarget.dataset.address;
    wx.navigateTo({
      url:'../../mine/companyAddressMaps/companyAddressMaps?address='+address
    })
  },
  makeCall:function (e) {
      app.makeCall(e)
  },
  showmorefun() {
    this.setData({
      isshowmore: !this.data.isshowmore
    });
    console.log(this.data.isshowmore);
  },
  getdata() {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/activityInfo',
      data: {
        activityId: that.data.activityId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(that.data.activityId)
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.success == 0) {
            console.log('活动详情')
            console.log(res.data.entity);
            console.log('活动详情')
            that.setData({
              activityInfo: res.data.entity.activityInfo,
              activityCompanyInfo: res.data.entity.launchCompany,
            });

            console.log('activityCompanyInfo')
            console.log(that.data.activityCompanyInfo)
            console.log('activityCompanyInfo')

            if(that.data.activityInfo.method==0||that.data.activityInfo.method==1){
              if(that.data.activityCompanyInfo&&that.data.activityCompanyInfo.name){
                that.data.activityCompanyInfo.textlogo=that.data.activityCompanyInfo.name.substring(0,2);
                that.data.activityCompanyInfo.fontsize='font34';
                if(that.data.activityCompanyInfo.name.length>30){
                  that.data.activityCompanyInfo.fontsize='font'+Math.floor(544*2/(that.data.activityCompanyInfo.name.length+1));
                }
              }
            }


            console.log('that.data.activityInfo.startTime')
            console.log(that.data.activityInfo.startTime)
            console.log(that.data.activityInfo.endTime)
            console.log('that.data.activityInfo.endTime')

            if(that.data.activityInfo.startTime.length>=3){
              var str = that.data.activityInfo.startTime;
              str = str.substring(0,str.length-3);
              that.data.activityInfo.startTime = str;
            }
            if(that.data.activityInfo.endTime.length>=3){
              var str = that.data.activityInfo.endTime;
              str = str.substring(0,str.length-3);
              that.data.activityInfo.endTime = str;
            }



            if(that.data.activityInfo.startTime&&that.data.activityInfo.endTime){
              // that.data.activityInfo.activityState=app.setState(that.data.activityInfo.startTime,that.data.activityInfo.endTime);
              var activityState=app.setState(that.data.activityInfo.startTime,that.data.activityInfo.endTime);
              that.setData({
                activityState:activityState
              });
            }


            that.setData({
              activityInfo: that.data.activityInfo,
              activityCompanyInfo:that.data.activityCompanyInfo,
            });
            if(that.data.activityInfo&&that.data.activityInfo.content&&that.data.activityInfo.content.length>2){
              that.setData({showmore:true});
            }
            console.log('that.data.activityInfo')
            console.log(that.data.activityInfo)
            console.log('that.data.activityInfo')
            console.log(that.data.activityCompanyInfo);
          } else {
            wx.showToast({
              title: res.data.message,
              image:'../../../assets/images/icon/error-fff.png',
              duration: 2000
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
    var that = this;
    console.log('活动详情options')
    console.log(options)
    console.log('活动详情options')
    if(options.status==='已结束'){
      console.log('已结束')
      that.setData({
        isOver:true
      })
    }else{
      that.setData({
        isOver:false
      })
    }
    that.setData({
      activityId: options.activityId,
    });
    if(options.scene){
      var scene = decodeURIComponent(options.scene)
      console.log(options.scene);
      console.log(scene);
      that.setData({
        activityId: options.scene
      });
    }
    console.log(that.data.sctivityId);
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
    this.getdata()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if(!app.globalData.userId||app.globalData.userId==-1){
      wx.redirectTo({
        url: "../../logIn/phone/phone"
      });
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("活动详情页面卸载onUnload");
    if(!app.globalData.userId||app.globalData.userId==-1){
      wx.redirectTo({
        url: "../../logIn/phone/phone"
      });
    }
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
  // onShareAppMessage: function () {

  // }
})
