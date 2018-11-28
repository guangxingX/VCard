// pages/logIn/code/code.js
var app = getApp();
Page({
  data: {
    errorshow:false,
    failuretip:'',
    phoneNumber:'',
    seconds:120,
    secondstext:'发送验证码',
    canLogin:false,
    codeNumber:'',
    secondsStart:false,
    timer:''
  },
  mobileInputChange(e){
    this.setData({
      phoneNumber:e.detail.value,
      secondstext:'发送验证码',
      seconds:120,
    });
    clearInterval(this.data.timer)
    if(app.isValidPhoneNumber(this.data.phoneNumber)){
      this.setData({
        secondsStart:true
      });
    }else{
      this.setData({
        secondsStart:false
      });
    }
  },
  codeChange:function (e) {
    this.setData({
      codeNumber:e.detail.value
    })

    if(this.data.codeNumber.length>=1){
        this.setData({
          canLogin:true
        })
    }else{
      this.setData({
        canLogin:false
      })
    }
  },
  getPhoneCodeFun(){
    if(this.data.secondsStart){
      this.getPhoneCode();
    }
  },
  getPhoneCode:function () {
    this.setData({
      secondsStart:false
    })
    var that = this;
    //每次都需要验证码吗？？
    wx.request({
      url: app.data.apiurl+'applets/getPhoneCode',
      data: {
        phone:that.data.phoneNumber
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          if (res.data.success == 0) {
            that.data.timer=setInterval(function () {
              if(that.data.seconds<=0){
                that.setData({
                  secondstext:'发送验证码',
                  secondsStart:true,
                  seconds:120
                })
                console.log("发送验证码000"+that.data.secondsStart);
                clearInterval(that.data.timer)
                return;
              }else{
                that.setData({
                  secondsStart:false
                })
              }
              that.data.seconds--;
              that.setData({
                seconds:that.data.seconds,
                secondstext:that.data.seconds+'S'
              })
            },1000)
          }
        }
      },
      fail(){
        wx.showToast({
          title: '发送失败',
          image:'../../../assets/images/icon/error-fff.png',
          duration: 2000
        })
      }
    })
  },
  login:function () {
    var that = this;
    setTimeout(function(){
      that.setData({errorshow:false})
    },1000)
    console.log(that.data.phoneNumber);
    if(that.data.phoneNumber==''||!that.data.phoneNumber){
      that.setData({errorshow:true,failuretip:'请输入手机号'});
    }else if(!app.isValidPhoneNumber(that.data.phoneNumber)){
      that.setData({errorshow:true,failuretip:'请输入合法手机号'});
    }else if(that.data.codeNumber==''||!that.data.codeNumber){
      that.setData({errorshow:true,failuretip:'请输入验证码'});
    }else{
      if(!app.data.openId){
        setTimeout(function(){
          if(!app.data.openId){
            setTimeout(function(){
              that.loginfun();
            },800);
          }
        },800);
      }else{
        that.loginfun();
      }
      console.log('开始登录-成功')
    }
  },
  loginfun(){
    var that=this;
    wx.request({
        url: app.data.apiurl+'applets/register',
        data: {
          mobile:that.data.phoneNumber,
          openid:app.data.openId,
          wxName:app.globalData.userInfo.nickName,
          code:that.data.codeNumber
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          if (res.statusCode == 200) {
            if (res.data.success == 0) {
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 2000
              })
              app.globalData.userId=res.data.entity.userId;

              console.log('登录成功后的userid')
              console.log(app.globalData.userId)
              console.log('登录成功后的userid')

              if(res.data.entity.cocId!=''){
                app.globalData.cocId=res.data.entity.cocId.join(",");
              }
              var pages = getCurrentPages();
              console.log(pages);
              if(pages.length>0&&(pages[0].route=="pages/activity/activityDetails/activityDetails")){
                wx.redirectTo({
                  url:'../../activity/enterActivity/enterActivity'
                });
              }else if(pages.length>0&&(pages[0].route=="pages/supply/supplyDetails/supplyDetails")){
                wx.redirectTo({
                  url:'../../supply/leaveMessage/leaveMessage'
                });
              }else{
                if(res.data.haveCard=="N"){
                  wx.redirectTo({
                    url:'../../homePage/addBusinessCard/addBusinessCard'
                  });
                }else{
                  wx.switchTab({
                    url:'../../index/index'
                  });
                }
              }
            }else{
              wx.showToast({
                title: '验证码错误',
                image:'../../../assets/images/icon/error-fff.png',
                duration: 2000
              })
              that.setData({
                secondsStart:true,
                secondstext:'发送验证码',
                seconds:120
              });
              clearInterval(that.data.timer)
            }
          }
        },fail(){
          wx.showToast({
            title: '网络请求超时',
            image:'../../../assets/images/icon/error-fff.png',
            duration: 2000
          })
          that.setData({
            secondsStart:true,
            secondstext:'发送验证码',
            seconds:120
          });
          clearInterval(that.data.timer)
        }
      })
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