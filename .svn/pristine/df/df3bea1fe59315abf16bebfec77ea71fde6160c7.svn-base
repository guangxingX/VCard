// pages/supply/supplyDetails/supplyDetails.js
var app=getApp();
Page({
  data: {
    isshowmore:false,
    supplydata:{},
    leaveResourcesId:'',
    supplyTitle:'',
    title:"",
    subjectName:"",
    viewCount:123,
    createdTime:"",
    content:'',
    publisherName:"",
    publisherMobile:"",
    launchCompany:{},
    iconList:{
      photo:"../../../assets/images/icon/icon-phone-gray.png",
      email:"../../../assets/images/icon/icon-email-gray.png",
      position:"../../../assets/images/icon/icon-map.png",
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png"
    },
    qualityEnterprise:{},
    loading:false,
    // 用来留言是做区分
    currenttab:0,
    showmore:false,
    hasownmess:0,
    //如果我给这条资源、需求留过言，就有有消息列表
    messageList:[],
    supply:'fromSupplyDetails',
    companyname:''
  },
  showmorefun() {
    this.setData({
      isshowmore: !this.data.isshowmore
    });
  },
  toleaveMessage(e){
    this.setData({loading:true});
    var leaveResourcesId=this.data.leaveResourcesId;
    app.data.toLeaveMessage=this.data.supplydata;
    console.log('进入留言');
    console.log(app.data.toLeaveMessage);
    wx.navigateTo({
      url: '../leaveMessage/leaveMessage?id='+leaveResourcesId+'&companyId='+this.data.supplydata.launchCompany.id+'&currenttab='+this.data.currenttab+'&companyname='+this.data.companyname,
      success: res => {

      },
      fail: res => {

      },
      complete: res => {
        this.setData({loading:false});
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("资源供需详情----onload-----------");
    console.log(options);
    console.log("资源供需详情----onload-----------");
    // console.log(app.data.supplyDetailsData);
    this.setData({
      leaveResourcesId: options.id,
      currenttab:options.currenttab,
      companyname:options.companyname
    });

    if(options.hasownmess===0 || options.hasownmess === 1 || options.hasownmess){
      this.setData({
        hasownmess:options.hasownmess
      })
    }
    if(options.currenttab=='0'){
      wx.setNavigationBarTitle({
        title:'资源详情'
      })
    }
      if(options.currenttab=='1'){
      wx.setNavigationBarTitle({
        title:'需求详情'
      })
    }
    if(options.currenttab){
      wx.setStorageSync('currentpage', {currenttab:options.currenttab,
          currentpage:'supplypage'});
    }else{
      wx.setStorageSync('currentpage', {currenttab:0,
          currentpage:'supplypage'});
    }
    if(app.data&&app.data.supplyDetailsData){
      this.setData({
        supplydata:app.data.supplyDetailsData,
        supplyTitle:app.data.supplyDetailsData.title,
      });
    }
    if(options.scene){
      var arr=[];
      var scene = decodeURIComponent(options.sceen)
      console.log(options.scene);
      console.log(scene);
      arr=options.scene.split(",");
      if(arr[1]==1){
        wx.setNavigationBarTitle({
          title:'需求详情'
        })
      }else{
        wx.setNavigationBarTitle({
          title:'资源详情'
        })
      }
      if(arr[1]==1){
        wx.setStorageSync('currentpage', {currenttab:1,
          currentpage:'supplypage'});
      }else{
        wx.setStorageSync('currentpage', {currenttab:0,
            currentpage:'supplypage'});
      }
      console.log("++++++++++++++++++++++++++");
      console.log(arr)
      this.setData({
        leaveResourcesId: arr[0]
      });
      console.log(this.data.leaveResourcesId)
    }
  },
  makeCall(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone //仅为示例，并非真实的电话号码
    })
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
  goCardDetails:function (e) {
    var cardId = e.currentTarget.dataset.cardid;
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
        url:'../../mine/cardDetails/cardDetails?mycardid='+cardId
      })
    }
  },
  getdata(){
    var that=this;
    wx.request({
      url: app.data.apiurl+'applets/sadInfo',
      // 改接口已修改，只传递需求活资源id
      data: {
        userId:app.globalData.userId,
        id:that.data.leaveResourcesId,
        hasOwnMess:that.data.hasownmess
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if(res.statusCode==200){
          if(res.data.success==0){
            var tempEntity = res.data.entity;

            that.setData({
              supplydata:res.data.entity,
              messageList:res.data.entity.messageList
            });

            if(tempEntity.method==0||tempEntity.method==1){
                if(tempEntity.launchCompany.logo){
                   if(tempEntity.launchCompany.logo.indexOf('http') == -1){
                      tempEntity.launchCompany.logo='https://static.upedu.cc/'+tempEntity.launchCompany.logo;
                    }
                }

              if(tempEntity.launchCompany&&tempEntity.launchCompany.logo&&tempEntity.launchCompany.logo.indexOf('http') == -1){
                tempEntity.launchCompany.logo='https://static.upedu.cc/'+tempEntity.launchCompany.logo;
              }

              if(tempEntity.launchCompany&&tempEntity.launchCompany.name){
                tempEntity.launchCompany.textlogo=tempEntity.launchCompany.name.substring(0,2);
                tempEntity.launchCompany.fontsize='font34';
                if(tempEntity.launchCompany.name.length>30){
                  tempEntity.launchCompany.fontsize='font'+Math.floor(544*2/(tempEntity.launchCompany.name.length+1));
                }
              }
            }

            that.setData({
              supplydata:tempEntity,
            });
            if(that.data.supplydata&&that.data.supplydata.content&&that.data.supplydata.content.length>2){
              that.setData({showmore:true});
            }
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
      }
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
    console.log("页面隐藏");
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
    console.log("页面卸载");
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
  onShareAppMessage: function () {

  }
})
