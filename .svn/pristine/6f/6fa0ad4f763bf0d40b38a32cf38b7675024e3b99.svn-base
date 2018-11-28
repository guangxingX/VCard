      // pages/supply/supplyDetails/supplyDetails.js
var app=getApp()
Page({
  data: {
    title:"",
    supplytype:"",
    browseTimes:123,
    resourceId:'',
    resourceils:[],
    messageList:[],
    demandContent:[],
    showmore:false,
    supply:'fromSupplyDetails',
    iconList:{
      photo:"../../../assets/images/icon/icon-phone-gray.png",
      email:"../../../assets/images/icon/icon-email-gray.png",
      position:"../../../assets/images/icon/icon-map.png",
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png"
    },
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
  showmorefun() {
    this.setData({
      isshowmore: !this.data.isshowmore
    });
  },
  makeCall:function (e) {
    app.makeCall(e)
  },
  toaddressMaps:function (e) {
    var address = e.currentTarget.dataset.address;
    wx.navigateTo({
      url:'../companyAddressMaps/companyAddressMaps?address='+address
    })
  },
  getdata(){
    wx.showLoading({
      title:'加载中',
      mask:true
    })
    var that=this;
    wx.request({
      url:app.data.apiurl+'applets/myDemandInfo',
      data:{
        userId: app.globalData.userId,
        demandId:that.data.resourceId
      },
      header:{
        'content-type': 'application/json'
      },
      success:function(res){
        if(res.statusCode==200){
          if(res.data.success==0){

            var tempEntity = res.data.entity;

            that.setData({
              resourceils:res.data.entity.demandInfo,
              messageList:res.data.entity.messageList
            })


             if(tempEntity.demandInfo.method==0||tempEntity.demandInfo.method==1){

              if(tempEntity.launchCompany&&tempEntity.launchCompany.logo&&tempEntity.launchCompany.logo.indexOf('http') == -1){
                tempEntity.launchCompany.logo='https://static.upedu.cc/'+tempEntity.launchCompany.logo;
              }

              if(that.data.resourceils.launchCompany&&that.data.resourceils.launchCompany.name){

                console.log('text-logo')
                console.log(that.data.resourceils.launchCompany)
                console.log(that.data.resourceils.launchCompany.name)
                console.log('text-logo')


                that.data.resourceils.launchCompany.textlogo=that.data.resourceils.launchCompany.name.substring(0,2);
                that.data.resourceils.launchCompany.fontsize='font34';
                if(that.data.resourceils.launchCompany.name.length>30){
                  that.data.resourceils.launchCompany.fontsize='font'+Math.floor(544*2/(that.data.resourceils.launchCompany.name.length+1));
                }

              }
            }

            that.setData({
              resourceils:that.data.resourceils,
            });

            console.log('我的-我的资源详情')
            console.log(that.data.resourceils)
            console.log('我的-我的资源详情')


            if(that.data.resourceils&&that.data.resourceils.demandContent&&that.data.resourceils.demandContent.length>2){
              that.setData({showmore:true});
            }


          }else{
            wx.showToast({
              title:res.data.message,
              image:'../../../assets/images/icon/error-fff.png',
              duration:2000
            })
          }
        }else{
          wx.showToast({
            title:'加载中',
            image:'../../../assets/images/icon/error-fff.png',
            duration:2000
          })
        }
      },
      fail(){
        wx.showToast({
          title:'加载中',
          image:'../../../assets/images/icon/error-fff.png',
          duration:2000
        })
      },
      complete(){
        wx.hideLoading({
          title:'加载中'
        })
      }
    })
  },
  delDemand(e) {
    console.log(e.currentTarget.dataset.type)
    var type=e.currentTarget.dataset.type;
    var that = this;

    if(type == 0){
      wx.showModal({
      title: '警告',
      content: '删除后不可恢复!',
      success: function(res) {
        if (res.confirm) {
         wx.request({
            url: app.data.apiurl+'applets/updateDemand',
            data: {
              demandId: that.data.resourceId,
              type: e.currentTarget.dataset.type
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(that.data.resourceId)
              console.log(res)
              if (res.statusCode == 200) {
                if (res.data.success == 0) {
                  if(type==0){
                    wx.showToast({
                      title:'删除成功',
                      icon:'success',
                      duration:2000
                    });
                    var pages = getCurrentPages();
                    var prevPage = pages[pages.length - 2]
                    prevPage.setData({currentPage:1,sadList:[]});
                    // prevPage.getdata();
                    wx.navigateBack({
                      delta: 1
                    });
                  }else{
                    that.getdata();
                  }
                }
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    }else{//上下架
       wx.request({
            url: app.data.apiurl+'applets/updateDemand',
            data: {
              demandId: that.data.resourceId,
              type: e.currentTarget.dataset.type
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(that.data.resourceId)
              console.log(res)
              if (res.statusCode == 200) {
                if (res.data.success == 0) {
                  if(type==0){
                    wx.showToast({
                      title:'删除成功',
                      icon:'success',
                      duration:2000
                    });
                    var pages = getCurrentPages();
                    var prevPage = pages[pages.length - 2]
                    prevPage.setData({currentPage:1,sadList:[]});
                    // prevPage.getdata();
                    wx.navigateBack({
                      delta: 1
                    });
                  }else{
                    that.getdata();
                  }
                }
              }
            }
          })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    this.setData({
      resourceId:options.resourceId
    })
    console.log(that.data.resourceId)
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