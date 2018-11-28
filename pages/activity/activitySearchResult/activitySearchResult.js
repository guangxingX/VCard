// pages/activity/activitySearchResult/activitySearchResult.js
var app = getApp();
Page({
  data: {
    searchName:'',
    currentPage:1,
    totalPageSize:1,
    isShowNoSearchResult:false,
    iconList:{
      photo:"../../../assets/images/icon/icon-phone-gray.png",
      email:"../../../assets/images/icon/icon-email-gray.png",
      position:"../../../assets/images/icon/icon-address-gray.png",
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png",
      timeicon:'../../../assets/images/icon/icon-clock.png'
    },
    activityList:[],
    type:0,
    isHighQuality:false
  },
  // 去活动详情
  getActivityDetails(e){
    console.log('e去活动详情的')
    console.log(e)
    console.log('e去活动详情的')
    // wx.setStorageSync('activityDetailsInfo', this.data.activityList[e.currentTarget.dataset.index])
    wx.navigateTo({
      url: '../activityDetails/activityDetails?activityId='+e.currentTarget.dataset.activityid+"&status="+e.currentTarget.dataset.status,
    })
  },
  tomaillist(){
    wx.navigateBack({
         delta: 1
    })
  },
  onfocus:function () {
    wx.navigateBack({
         delta: 1
    })
  },

  toCommerceDetails(e){
    wx.navigateTo({
      url: "../commerceDetails/commerceDetails?cocid="+e.currentTarget.dataset.cocid,
      success: res => {

      },
      fail: res => {

      },
      complete: res => {

      }
    })
  },
  getdata(){
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    var that=this;
    wx.request({
      url: app.data.apiurl+'applets/activityList',
      data: {userId:app.globalData.userId,cocId:app.globalData.cocId,name:that.data.searchName,currentPage:that.data.currentPage},
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(that.data.currentPage);
        if(res.statusCode==200){
          console.log(res.data)
          if(res.data.success==0){
            var activityList=res.data.entity.activityList;
            activityList.forEach(function(item, index, arr){
              item.activityState=app.setState(item.createTime,item.endTime);
            })
            that.setData({
              activityList:that.data.activityList.concat(activityList),
              totalPageSize:res.data.entity.totalPageSize
            });

            if(that.data.activityList.length){
              that.setData({
                isShowNoSearchResult:false
              })
            }else{
              that.setData({
                isShowNoSearchResult:true
              })
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
      },
      complete(){
        wx.hideLoading({
          title: '加载中',
        });
        wx.hideNavigationBarLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("页面加载");
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]
    prevPage.setData({historyclick:true});
    this.setData({currentPage:1,searchName:options.searchname,type:options.type});
    this.getdata()
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
    if(this.data.currentPage<this.data.totalPageSize){
      this.data.currentPage+=1;
      this.setData({
        currentPage:this.data.currentPage
      });
      this.getdata();
    }else{
      wx.showToast({
        title: '没有更多数据了',
        image:'../../../assets/images/icon/error-fff.png',
        duration: 2000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})