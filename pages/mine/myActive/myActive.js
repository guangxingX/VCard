// pages/mine/myActive/myActive.js
var app=getApp();
Page({
  data: {
    type: '',
    status: '',
    currentPage: 1,
    currentPage2:1,
    currentPage1:1,
    totalPageSize1:1,
    totalPageSize2:1,
    currenttab: 1,
    isShowNoActive:false,
    iconList: {
      mapicon: "../../../assets/images/icon/icon-map.png",
      timeicon: "../../../assets/images/icon/icon-clock.png",
      authentication: "../../../assets/images/icon/icon-authentication-yellow.png"
    },
    activityList1: [],
    activityList2:[],
    currClickActive:''
  },
  getdata() {
    // wx.showLoading({
    //   title: '加载中',
    //   mask:true
    // })
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/myActivityList',
      data: {
        userId:app.globalData.userId,
        type: that.data.currenttab,
        currentPage: that.data.currentPage,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();
        if (res.statusCode == 200) {
          if (res.data.success == 0) {
            var list=res.data.entity.activityList;
              list.forEach(function (item, index, arr) {
                item.activityState = app.setState(item.createTime, item.endTime);
              });
            if(that.data.currenttab==1){
              console.log("我组织的");
              that.setData({
                activityList1: that.data.activityList1.concat(list),
                totalPageSize:res.data.entity.totalPageSize,
                totalPageSize1:res.data.entity.totalPageSize
              });

              if(that.data.activityList1.length>0){
                that.setData({
                  isShowNoActive:false
                })
              }else{
                that.setData({
                  isShowNoActive:true
                })
              }

            }else{
              console.log("我参加的")
              that.setData({
                activityList2: that.data.activityList2.concat(list),
                totalPageSize:res.data.entity.totalPageSize,
                totalPageSize2:res.data.entity.totalPageSize
              });

              if(that.data.activityList2.length>0){
                that.setData({
                  isShowNoActive:false
                })
              }else{
                that.setData({
                  isShowNoActive:true
                })
              }
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
            title: '加载失败',
            image:'../../../assets/images/icon/error-fff.png',
            duration: 2000
          })
        }
      },
      fail() {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();
        wx.showToast({
          title: '加载失败',
          image:'../../../assets/images/icon/error-fff.png',
          duration: 2000
        })
      },
      complete() {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();
        wx.hideLoading({
          title: '加载中'
        })
      }
    })
  },
  toAddActive() {
    wx.navigateTo({
      url: '../addMyActive/addMyActive',
      success: res => {

      },
      fail: res => {

      },
      complete: res => {

      }
    })
  },
  goAddressDes:function (e) {
    var address = e.currentTarget.dataset.address;
    wx.navigateTo({
      url:'../companyAddressMaps/companyAddressMaps?address='+address
    })
  },
  getActivityDetails(e) {
    console.log(e);
    var ismine='';
    if(e.currentTarget.dataset.currenttab&&e.currentTarget.dataset.currenttab==1){
      ismine=1;
      this.setData({currClickActive:this.data.activityList1[e.currentTarget.dataset.index]});
      app.currClickActive=this.data.currClickActive;
      wx.navigateTo({
        url: '../myActiveDetails/myActiveDetails?activityId='+e.currentTarget.dataset.activityid+'&ismine='+ismine
      })
    }else{
      this.setData({currClickActive:this.data.activityList2[e.currentTarget.dataset.index]});
      app.currClickActive=this.data.currClickActive;
      wx.navigateTo({
        url: '../myActiveDetails/myActiveDetails?activityId='+e.currentTarget.dataset.activityid
      })
    }

  },
  changetab: function (e) {
    var that= this;

    that.setData({
      currenttab: e.currentTarget.dataset.tab
    });

    if(that.data.currenttab == 1){
     if(that.data.activityList1.length>0){
          that.setData({
            isShowNoActive:false
          })
        }else{
          that.setData({
            isShowNoActive:true
          })
      }

      if(that.data.activityList1.length){
        return;
      }else{
        that.getdata();
      }
    }else{
        if(that.data.activityList2.length>0){
          that.setData({
            isShowNoActive:false
          })
        }else{
          that.setData({
            isShowNoActive:true
          })
        }

      if(that.data.activityList2.length){
          return;
        }else{
          that.getdata();
        }
    }
  },
  onLoad: function (options) {
    console.log("onload");
    // this.setData({
    //   currentPage: 1,
    //   currentPage1:1,
    //   currentPage2:1,
    //   currenttab:1,activityList1:[],activityList2:[]
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("初次渲染");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("监听页面显示");
    // 添加成功，回到这，相当于刷新页面
    this.setData({
      activityList1:[],
      activityList2:[]
    })
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

      console.log('我的活动刷新时，currtab=')
      console.log(self.data.currenttab)
      console.log('我的活动刷新时，currtab=')


      if(self.data.currenttab == 2){//我参加的 右边
        self.setData({
          currentPage:1,
          currentPage2:1,
          activityList2:[]
        })
        setTimeout(function () {
          console.log('我参加的刷新---------')
          self.getdata();
        }, 1000)
      }else{//1 我组织的，左边
         self.setData({
          currentPage:1,
          currentPage1:1,
          activityList1:[]
        })
        setTimeout(function () {
          console.log('我组织的刷新---------')
          self.getdata();
        }, 1000)
      }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var self = this;
    console.log("页面上拉触底事件的处理函数");
    if(self.data.currenttab==0){
      if(self.data.currentPage1<self.data.totalPageSize1){
        self.data.currentPage1+=1;
        self.setData({
          currentPage1:self.data.currentPage1,
          currentPage:self.data.currentPage1,
        });
        wx.showLoading({
          title: '加载中...',
          mask:true
        })
        setTimeout(function(){
          wx.hideLoading();
          self.getdata();
        }, 1000)
      }else{
         wx.showToast({
            title: '没有更多数据',
            icon: 'success',
            duration: 1000
          })
      }
    }else{
      console.log("当前页组织"+self.data.currentPage2);
      console.log("总页数组织"+self.data.totalPageSize2);
      if(self.data.currentPage2<self.data.totalPageSize2){
        self.data.currentPage2+=1;
        self.setData({    //公司
          currentPage2:self.data.currentPage2,
          currentPage:self.data.currentPage2
        });
         wx.showLoading({
          title: '加载中...',
          mask:true
        })
        setTimeout(function(){
          wx.hideLoading();
          self.getdata();
        }, 1000)
      }else{
         wx.showToast({
            title: '没有更多数据',
            icon: 'success',
            duration: 1000
          })
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})