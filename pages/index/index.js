//index.js
//获取应用实例
var app=getApp();
Page({
  data: {
    btnarr:[{
      icon:"../../assets/images/icon/icon-otherbtn1.png",
      name:"商会中心",
      url:"../maillist/maillistIndex/maillist",
      currenttab:2,
      page:'maillistpage'
    },{
      icon:"../../assets/images/icon/icon-otherbtn2.png",
      name:"企业广场",
      url:"../maillist/maillistIndex/maillist",
      currenttab:1,
      page:'maillistpage'
    },{
      icon:"../../assets/images/icon/icon-otherbtn3.png",
      name:"发现资源",
      url:"../supply/supplyIndex/supply",
      currenttab:0,
      page:'supplypage'
    },{
      icon:"../../assets/images/icon/icon-otherbtn4.png",
      name:"发现需求",
      url:"../supply/supplyIndex/supply",
      currenttab:1,
      page:'supplypage'
    }],
    businessCard: [],
    companyCard:[],
    userAvatar:'../../assets/images/icon/mycard-avatar-default.png',
    swiperCurrent:0,
    companyCardInfo:{},
    companyCardInfoshow:false,
    noCardImage:"../../assets/images/index/no-card.jpg",
    iconList:{
      photoWhite:"../../assets/images/icon/icon-phone.png",
      emailWhite:"../../assets/images/icon/icon-email.png",
      addressWhite:"../../assets/images/icon/icon-address.png",
      authentication:'../../assets/images/icon/icon-authentication-yellow.png',
      share:'../../assets/images/icon/icon-share.png',
      bluetag:'../../assets/images/icon/icon-tag.png',
      mapSmall:'../../assets/images/icon/map-small.png'
    },
    isshare:true,
    isedit:false,
    pageFrom:'index',
    // 默认头像
    userAvatar:'../../../assets/images/icon/photobg.png',
    autoplay:false
  },
  jumpTo(e){

    wx.setStorageSync('currentpage',{
        currenttab:e.currentTarget.dataset.currenttab,
        currentpage:e.currentTarget.dataset.page
     });

    // console.log('存的啥')
    // console.log(e.currentTarget.dataset.currenttab)
    // console.log(e.currentTarget.dataset.page)
    // console.log('存的啥')

    wx.switchTab({
      url: e.currentTarget.dataset.url,
      success: res => {
        var pages = getCurrentPages().pop();
        // console.log('pages')
        // console.log(pages)
        // console.log('pages')

        if (pages == undefined || pages == null) return;
          pages.onLoad();
      },
      fail: res => {
        console.log(res);
      },
      complete: res => {
        console.log(res);
      }
    })
  },
  getPhoneNumberfun(e){
    console.log(e);
     console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
  },
  toMycardDetails(e){
    console.log('去名片详情')
    wx.navigateTo({
      url: '../mine/cardDetails/cardDetails?mycardid='+e.currentTarget.dataset.mycardid+'&from='+true
    })
  },
  addBusinessCard:function(){
    wx.navigateTo({
      url: '../homePage/addBusinessCard/addBusinessCard'
    })
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
      url:'../mine/companyAddressMaps/companyAddressMaps?address='+address
    })
  },
  // 点击了card上的分享
  shareCard:function (e) {
    console.log(e)
    var item = e.currentTarget.dataset.item;
    wx.setStorage({
      key:"shareCardCardKey",
      data:item,
      success: function(res) {
        wx.navigateTo({
          url:'../mine/shareCard/shareCard'
        })
      },
      fail: function(res) {

      },
      complete: function(res) {

      }
    })
  },
  // 点击了公司名片分享
  shareCompanyCard:function (e) {
      console.log(e)
      var item = e.currentTarget.dataset.item;
      console.log(item)
      wx.setStorage({
        key:"shareCompanyCardKey",
        data:item,
        success: function(res) {
          wx.navigateTo({
            url:'../mine/shareCompanyCard/shareCompanyCard'
          })
        },
        fail: function(res) {

        },
        complete: function(res) {

        }
      })
  },
  // 去公司详情
  goCompanyDes:function (e) {
    var id=e.currentTarget.dataset.id;
    var canChangeTemp = e.currentTarget.dataset.can;
    var isuthentication = e.currentTarget.dataset.isuthentication;
    console.log('首页进入公司详情')
    console.log(e)
    console.log('首页进入公司详情')
    wx.navigateTo({
      url: '../mine/myCompanyDes/myCompanyDes?id='+id+'&can='+canChangeTemp+'&isuthentication='+isuthentication
    })
  },
  //渲染
  getdata(){
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    var that=this;
    wx.request({
      url: app.data.apiurl+'applets/main',
      data: {userId:app.globalData.userId},
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        // console.log(res);
        if(res.statusCode==200){
          // console.log(res.data)
          if(res.data.success==0){
            that.setData({
              businessCard:res.data.entity.cardInfo,
              companyCard:res.data.entity.companyInfo
            });
            // console.log('businessCard')
            // console.log(that.data.businessCard)
            // console.log('businessCard')
            that.data.companyCard.forEach(function(item,index,arr){
                if (item) {
                    item.textlogo = item.name.substring(0, 2);
                    item.fontsize='font32';
                    if(item.name.length>30){
                        item.fontsize='font'+Math.floor(544*2/(item.name.length));
                    }
                }

            });
            that.setData({
              companyCard:that.data.companyCard
            });
            // console.log("swiperCurrent=====")
            // console.log(that.data.swiperCurrent)
            if(!that.data.swiperCurrent||(that.data.businessCard&&that.data.businessCard.length&&
              that.data.swiperCurrent>that.data.businessCard.length-1)){
              that.setData({swiperCurrent:0})
            }
            // console.log(that.data.swiperCurrent)
            that.setData({autoplay:true});
            if(that.data.companyCard.length>0&&that.data.companyCard[0]&&that.data.businessCard.length>0){
              console.log("进入了循环");
              for(var i=0;i<that.data.companyCard.length;i++){
                if(that.data.businessCard[that.data.swiperCurrent]&&that.data.businessCard[that.data.swiperCurrent].companyId==that.data.companyCard[i].id){
                  console.log("jinruif");
                  that.setData({companyCardInfo:that.data.companyCard[i],companyCardInfoshow:true});
                  return false;
                }else{
                  console.log("else");
                  that.setData({companyCardInfo:{},companyCardInfoshow:false});
                }
              }
            }else{
              that.setData({companyCardInfo:{},companyCardInfoshow:false});
            }
          }else{
            wx.showToast({
              title: res.data.message,
              image:'../../assets/images/icon/error-fff.png',
              duration: 2000
            })
          }
        }else{
          wx.showToast({
            title: '加载失败',
            image:'../../assets/images/icon/error-fff.png',
            duration: 2000
          })
        }
      },
      fail(){
        wx.showToast({
          title: '加载失败',
          image:'../../assets/images/icon/error-fff.png',
          duration: 2000
        })
      },
      complete(){
        wx.hideLoading({
          title: '加载中',
        });
        wx.hideNavigationBarLoading();
      }
    })
  },
  swiperChange(e){
    console.log("swiperChange");
    console.log(e);
    var that=this;
    if(e.detail.current){
      that.setData({swiperCurrent:e.detail.current});
    }else{
      that.setData({swiperCurrent:0});
    }
    if(that.data.companyCard.length>0&&that.data.companyCard[0]&&that.data.businessCard.length>0){
      for(var i=0;i<that.data.companyCard.length;i++){
        if(that.data.businessCard[that.data.swiperCurrent]&&that.data.businessCard[that.data.swiperCurrent].companyId==that.data.companyCard[i].id){
          // console.log("manzutioajian")
          that.setData({companyCardInfo:that.data.companyCard[i],companyCardInfoshow:true});
          return false;
        }else{
          that.setData({companyCardInfo:{},companyCardInfoshow:false});
        }
      }
    }
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
    console.log(app.globalData.userInfo.avatarUrl);
    if(app.globalData.userInfo.avatarUrl){
      this.setData({userAvatar:app.globalData.userInfo.avatarUrl});
    }
  // this.getdata();

  let that = this;
    //身份校验
    // console.log(app.globalData.userId);
    // console.log(app.globalData.userId==-1);
    // console.log(app.globalData.userId=='-1');
    setTimeout(function(){
      if(!app.globalData.userId||app.globalData.userId==-1){
        wx.navigateTo({
          url: "../logIn/phone/phone"
        });
      }else{
        that.getdata();
      }
    },2000)

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({autoplay:false});
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({autoplay:false});
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
    // wx.setNavigationBarTitle({
    //   title: '加载中'
    // });
    if(this.data.currentPage<this.data.totalPageSize){
      this.setData({currentPage:this.data.currentPage});
      wx.showNavigationBarLoading()
      this.getdata();
    }
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function (e) {
  //   console.log(e);
  //   console.log(e.target.dataset.id);
  //   if(e.target.dataset.id==1){
  //

  //     wx.navigateTo({
  //       url:'../mine/shareCard/shareCard?carid='+
  //     })
  //   }else{
  //     return {
  //       title: '公司吗，名片',
  //       desc: '最具人气的小程序开发联盟!',
  //       path: "pages/index/index",
  //       imageUrl:'../../assets/images/activity/activitylogo.png'
  //     }
  //   }

  // }
})
