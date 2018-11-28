// pages/mine/myDemandDetails/myDemandDetails.js
var app=getApp();
Page({
  data: {
    isshowmore:false,
    title: "中和黄埔2017年内训计划开始时间",
    supplytype: "商机需求",
    browseTimes: 123,
    demandId: '',
    messageList: [],
    demandInfo: [],
    messageCount: '',
    showmore:false,
    supply:'fromSupplyDetails',
    iconList:{
      photo:"../../../assets/images/icon/icon-phone-gray.png",
      email:"../../../assets/images/icon/icon-email-gray.png",
      position:"../../../assets/images/icon/icon-map.png",
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png"
    },
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
  showmorefun() {
    this.setData({
      isshowmore: !this.data.isshowmore
    });
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
  getdata() {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/myDemandInfo',
      data: {
        userId: app.globalData.userId,
        demandId: that.data.demandId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data.success == 0) {
            console.log('需求详情数据');
            console.log(res);
            console.log('需求详情数据');

            var tempEntity = res.data.entity;

            that.setData({
              demandInfo: res.data.entity.demandInfo,
              messageList: res.data.entity.messageList,
              messageCount: res.data.entity.messageCount,
              demandContent: res.data.entity.demandInfo.demandContent
            })

             if(tempEntity.demandInfo.method==0||tempEntity.demandInfo.method==1){

              if(tempEntity.launchCompany&&tempEntity.launchCompany.logo&&tempEntity.launchCompany.logo.indexOf('http') == -1){
                tempEntity.launchCompany.logo='https://static.upedu.cc/'+tempEntity.launchCompany.logo;
              }

              if(that.data.demandInfo.launchCompany&&that.data.demandInfo.launchCompany.name){
                that.data.demandInfo.launchCompany.textlogo=that.data.demandInfo.launchCompany.name.substring(0,2);
                that.data.demandInfo.launchCompany.fontsize='font34';
                if(that.data.demandInfo.launchCompany.name.length>30){
                  that.data.demandInfo.launchCompany.fontsize='font'+Math.floor(544*2/(that.data.demandInfo.launchCompany.name.length+1));
                }
              }

            }
            that.setData({
              demandInfo:that.data.demandInfo,
            });



            if(that.data.demandInfo&&that.data.demandInfo.demandContent&&that.data.demandInfo.demandContent.length>2){
              that.setData({showmore:true});
            }
          } else {
            wx.showToast({
              title: res.data.message,
              image:'../../../assets/images/icon/error-fff.png',
              duration: 2000
            })

          }
        } else {
          wx.showToast({
            title: '加载中',
            image:'../../../assets/images/icon/error-fff.png',
            duration: 2000
          })
        }
      },
      fail() {
        wx.showToast({
          title: '加载中',
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
  delDemand(e) {
    console.log(e.currentTarget.dataset.type)
    var that = this;
    var type=e.currentTarget.dataset.type;

   if(type == 0){
      wx.showModal({
      title: '警告',
      content: '删除后不可恢复!',
      success: function(res) {
        if (res.confirm) {
           wx.request({
              url: app.data.apiurl+'applets/updateDemand',
              data: {
                demandId: that.data.demandId,
                type: e.currentTarget.dataset.type
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
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
                      prevPage.setData({currentPage:1,demandList:[]});
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
    }else{
      wx.request({
        url: app.data.apiurl+'applets/updateDemand',
        data: {
          demandId: that.data.demandId,
          type: e.currentTarget.dataset.type
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log('上架-下架')
          console.log(res)
          console.log('上架-下架')
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
                prevPage.setData({currentPage:1,demandList:[]});
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
    var that = this;

    console.log('进来后公司的需求id是')
    console.log(options.demandId)
    console.log('进来后公司的需求id是')

    this.setData({
      demandId: options.demandId
    })
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