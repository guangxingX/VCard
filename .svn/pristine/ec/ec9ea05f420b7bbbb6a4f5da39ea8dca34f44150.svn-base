// pages/mine/reviseCardBg/reviseCardBg.js
var app = getApp();
Page({
  data: {
    businessCard: {},
    bgarr:[],
    currId:'',
    bgarrRemainder:'',
    bgarrCol:'',
    iconList:{
      photoWhite:"../../../assets/images/icon/icon-phone.png",
      emailWhite:"../../../assets/images/icon/icon-email.png",
      addressWhite:"../../../assets/images/icon/icon-address.png",
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png",
      mapSmall:'../../../assets/images/icon/map-small.png'
    },
    pageFrom:'reviseCardBg',
    bgUrl:'',
    // 默认头像
    userAvatar:'../../../assets/images/icon/photobg.png',
  },
  getbgList(){
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/backgroundList',
      data:{type:2},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.success == 0) {
              var bgarr=res.data.entity.bgList;
              console.log(that.data.currId);
              bgarr.forEach(function(item,index,arr){
                if(item.id==that.data.currId){
                  item.checked=true;
                }else{
                  item.checked=false;
                }
              });
              that.setData({bgarr:bgarr});
              that.setData({bgarrCol:Math.ceil(bgarr.length/3)});
              that.setData({bgarrRemainder:bgarr.length%3});
              console.log(that.data.bgarrCol);
              console.log(that.data.bgarrRemainder);
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
      }
    })
  },
  choisebg(e){
    this.setData({currId:e.currentTarget.dataset.id});
    var that=this;
    this.data.bgarr.forEach(function(item, index, arr){
      if(item.id==e.currentTarget.dataset.id){
        item.checked=true;
        that.data.businessCard.bgUrl=item.url
      }else{
        item.checked=false;
      }
    });
    this.setData({bgarr:this.data.bgarr,businessCard:this.data.businessCard});

    console.log('选择的背景id')
    console.log(this.data.currId)
    console.log(this.data.bgarr)
    console.log(this.data.businessCard)
    console.log('选择的背景id')
  },
  saveSet(){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];

    // prevPage.setData({bgUrl:this.data.businessCard.bgUrl,cardbgId:this.data.currId});

    prevPage.setData({cardbg:this.data.businessCard.bgUrl,cardbgId:this.data.currId});

    console.log('选择的背景')
    console.log(this.data.businessCard.bgUrl)
    console.log(this.data.currId)
    console.log('选择的背景')

    //罗。这里掉一下保存接口，直接保存到服务器

     wx.showLoading({
      title: '提交中',
      mask:true
    })
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/addCard',
      // data:{id:that.data.businessCard.id,bgId:that.data.businessCard.cardbgId,userId:app.globalData.userId},
      data:{id:that.data.businessCard.id,bgId:that.data.currId},
      header: {
        'content-type': 'application/x-www-form-urlencoded' // post
      },
      success: function (res) {

        console.log("更换名片成功");
        console.log(res);
        console.log("更换名片成功");
        if (res.statusCode == 200) {
          if (res.data.success == 0) {
            that.setData({
              loading:false
            })
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            });

            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            },1000)

            // var pages = getCurrentPages();
            // if(pages.length>=3){
            //   var prevPage = pages[pages.length - 3];
            //   wx.navigateBack({
            //     delta: 2
            //   })
            // }else{
            //   console.log("跳转到首页");
            //   wx.switchTab({
            //     url:'../../index/index'
            //   });
            // }

          } else {
            wx.showToast({
              title: res.data.message,
              image:'../../../assets/images/icon/error-fff.png',
              duration: 2000
            })
          }
        } else {
          wx.showToast({
            title: '提交失败',
            image:'../../../assets/images/icon/error-fff.png',
            duration: 2000
          })
        }
      },
      fail() {
        wx.showToast({
          title: '提交失败',
          image:'../../../assets/images/icon/error-fff.png',
          duration: 2000
        })
      },
      complete() {

      }
    })
    /////////////////////////////////////////////////


    // wx.navigateBack({
    //   delta: 1
    // })

  },
  // 打电话
  makeCall:function (e) {
    app.makeCall(e)
  },
  // 去地图页面
  goAddressDes:function (e) {
    var address = e.currentTarget.dataset.address;
    console.log(e)
    console.log(address)
    wx.navigateTo({
      url:'../companyAddressMaps/companyAddressMaps?address='+address
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;

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
    var that=this;
    that.setData({
      businessCard: app.businessInfoStorage,
      currId:app.businessInfoStorage.cardbgId
    })
    that.getbgList();
    if(this.data.businessCard.avatar==''||!this.data.businessCard.avatar){
      this.data.businessCard.avatar='../../../assets/images/icon/mycard-avatar-default.png';
      that.setData({
        businessCard: this.data.businessCard
      })
    }


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