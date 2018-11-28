// pages/activity/activity.js
var app = getApp();
Page({
  data: {
    currentPage:1,
    searchName:"",
    totalPageSize:1,
    isRead:0,
    iconList:{
      mapicon:"../../../assets/images/icon/icon-map.png",
      timeicon:"../../../assets/images/icon/icon-clock.png",
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png",
      mapSmall:'../../../assets/images/icon/map-small.png'
    },
    activityList:[]
  },
  addNew(){
    wx.navigateTo({
      url: "../../mine/addMyActive/addMyActive",
      success: res => {
      },
      fail: res => {
      },
      complete: res => {
      }
    })
  },
  toSearch(e){
    wx.navigateTo({
      url: "../../commenPage/searchPage/searchPage?storageKey="+e.currentTarget.dataset.storagekey+"&title=活动搜索",
    })
  },
  toLeaveMessage:function () {
    wx.navigateTo({
      url:'../leaveMessageForMyActive/leaveMessageForMyActive'
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
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();
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
              isRead:res.data.entity.isRead,
              totalPageSize:res.data.entity.totalPageSize
            });
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
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();

        wx.showToast({
          title: '加载失败',
          image:'../../../assets/images/icon/error-fff.png',
          duration: 2000
        })
      },
      complete(){
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();
        wx.hideLoading({
          title: '加载中',
        });
      }
    })
  },
  clearSearch(){
    this.setData({
      searchName:''
    });
    this.getdata();
  },
  bindKeyInput(e){
    this.setData({
      searchName:e.detail.value
    });
  },
  goAddressDes:function (e) {
    var address = e.currentTarget.dataset.address;
    wx.navigateTo({
      url:'../../mine/companyAddressMaps/companyAddressMaps?address='+address
    })

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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({currentPage:1,activityList:[]});
    //  this.getdata();
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
    this.setData({currentPage:1,activityList:[]});
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var self=this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    self.setData({
      currentPage:1,
      activityList:[]
    })
    setTimeout(function () {
        self.getdata()
    },1000)

  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("触底时间")
    if(this.data.currentPage<this.data.totalPageSize){
      this.data.currentPage+=1;
        this.setData({
          currentPage:this.data.currentPage,
        });
      this.getdata();
    }else{
      wx.showToast({
        title: '没有更多数据了',
       icon: 'success',
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