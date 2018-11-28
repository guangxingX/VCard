var app=getApp();
Page({
  data: {
    array:["开始","开始","开始"],
    activitydetails:{},
    activityid:'',
    contactName:'',
    companyName:'',
    companyId:'',
    cardList:[],
    isonlyCard:false,
    iconList:{
      mapicon:"../../../assets/images/icon/icon-map-durk.png",
      timeicon:"../../../assets/images/icon/icon-clock.png",
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png"
    },
    companyList:{},
    choiseCompany:'选择公司',
    loading:false
  },
  bindPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    // this.setData({
    //   choiseCompany: this.data.companyList[e.detail.value].name
    // })

    wx.navigateTo({
      url:'../../mine/myCard/myCard'
    })
  },

  goAddressDes:function (e) {
    var address = e.currentTarget.dataset.address;
    wx.navigateTo({
      url:'../../mine/companyAddressMaps/companyAddressMaps?address='+address
    })
  },
  getdata(){
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    var that=this;
    wx.request({
      url: app.data.apiurl+'applets/messageInfo',
      data: {userId:app.globalData.userId},
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if(res.statusCode==200){
          if(res.data.success==0){
            console.log(res.data.entity)
            that.setData({companyList:res.data.entity.CocCompanyList});
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
  toEnter:function () {
      this.setData({loading:true});
      var that = this;
      if(!that.data.mycardId){
         wx.showToast({
            title:'请选择联系人',
            image:'../../../assets/images/icon/error-fff.png',
            mask:true
          })

         that.setData({
          loading:false
         })

          return;
      }

      wx.request({
        url: app.data.apiurl+'applets/applyActivity',
        data: {
          userId:app.globalData.userId,
          activityId:that.data.activityid,
          cardId:that.data.mycardId
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
           console.log(res);
            if(res.statusCode==200){
                if(res.data.success==0){
                  that.setData({loading:false});
                  wx.showToast({
                    title:'报名成功！',
                    icon:'success',
                    duration:2000
                  })
                  setTimeout(function () {
                    wx.navigateBack({
                      detail:1
                    })
                  },2000)
                }else if(res.data.success == 1){
                  that.setData({loading:false});
                   wx.showToast({
                    title:'您已报名！',
                    icon:'success',
                    duration:2000
                  })
                  setTimeout(function () {
                    wx.navigateBack({
                      detail:1
                    })
                  },2000)
                }else{
                  that.setData({loading:false});
                  wx.showToast({
                    title: res.data.message,
                    image:'../../../assets/images/icon/error-fff.png',
                    duration: 2000
                  })
                }
            }else{
              that.setData({loading:false});
              wx.showToast({
                title: res.data.message,
                image:'../../../assets/images/icon/error-fff.png',
                duration: 2000
              })
            }
         }
     })

  },
  getCardList(){
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/main',
      data: {
        userId:app.globalData.userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('cardList');
        console.log('cardList');
        console.log(res);
        that.setData({
          cardList: res.data.entity.cardInfo,
        });
        if(res.data.entity.cardInfo.length==1){
          that.setData({isonlyCard:true,companyName:res.data.entity.cardInfo[0].companyName,
          contactName:res.data.entity.cardInfo[0].name,mycardId:res.data.entity.cardInfo[0].id});
        }else{
          that.setData({isonlyCard:false});
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('on-load-enterActivity-options')
    console.log(options)
    console.log('on-load-enterActivity-options')

    var that=this;
    that.setData({
      activityid:options.activityid
    });
    wx.getStorage({
      key: 'activityDetailsInfo',
      success: function(res) {
        that.setData({
          activitydetails:res.data
        })
        console.log('onload-获取缓存成功')
        console.log(res.data)
        console.log(that.data.activitydetails)

        console.log('onload-获取缓存成功')
      },
      fail:function(res){
        console.log('onload-获取缓存失败')
        console.log(that.data.activitydetails)
        console.log('onload-获取缓存失败')
      }
    });
    that.getdata();
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
    this.getCardList();
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
    // 这里千万别请缓存，这个数据有用，在它的父页面销毁时会自动清除
    // wx.removeStorage({
    //   key: 'activityDetailsInfo',
    //   success: function(res) {
    //     console.log("清除缓存活动报名")
    //   }
    // })
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