// pages/supply/messageList/messageList.js
var app=getApp();
Page({
  data: {
    currentPage: 1,
    currentPage2:1,
    currentPage1:1,
    totalPageSize1:1,
    totalPageSize2:1,

    isShowNoMessage:false,
    messageList:[],
    //上一页面点击的标签序号 0是资源，1是需求
    fromCurrenttab:0,
    // 当前页面标签切换序号
    currenttab:0,
    // 别人给我留的言
    youToMeMessageList:[],
    // 我给别人留的言
    meToYouMessageList:[],
    // 我给别人留言的请求数据字段
    meToOtherCurrenttab:3
  },
  changetab: function (e) {
    var that= this;
    that.setData({
      currenttab: e.currentTarget.dataset.tab
    });


    if(that.data.currenttab == 0){
      if(that.data.youToMeMessageList.length){
        return;
      }else{
        that.getdata();
      }
    }else{
      if(that.data.meToYouMessageList.length){
          return;
        }else{
          that.getMeToOtherLeaveMessageData();
        }
    }
  },

  // 获取别人给我留言
  getdata(){
    var that=this;
    wx.showLoading({
      title: '加载中',
      mask:true
    })

    wx.request({
      url: app.data.apiurl+'applets/ownMessageList',
      data: {
        userId:app.globalData.userId,
        type: that.data.fromCurrenttab,
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

            wx.hideLoading()
            var list=res.data.entity.messageList;
              // list.forEach(function (item, index, arr) {
              //   item.activityState = app.setState(item.createTime, item.endTime);
              // });

            console.log('别人给我留言列表返回值res')
            console.log(res)
            console.log('别人给我留言列表返回值res')
            that.setData({
              youToMeMessageList: that.data.youToMeMessageList.concat(list),
              totalPageSize:res.data.entity.totalPageSize,
              totalPageSize1:res.data.entity.totalPageSize
            });
            that.data.youToMeMessageList.forEach(function (item,index,arr) {
                var tempArr = [];
                var oneContentStr = ''
                if(item.objectContent.length){
                  item.objectContent.forEach(function (item1,index1,arr1) {
                      if(item1.text){
                        tempArr.push(item1.text)
                      }
                  })
                  oneContentStr = tempArr[0];
                  item.oneContentStr = oneContentStr;
                }
            })
            that.setData({
              youToMeMessageList:that.data.youToMeMessageList
            })

          } else {
            wx.hideLoading()
            wx.showToast({
              title: res.data.message,
              image:'../../../assets/images/icon/error-fff.png',
              duration: 2000
            })
          }
        } else {
          wx.hideLoading()
          wx.showToast({
            title: '加载失败',
            image:'../../../assets/images/icon/error-fff.png',
            duration: 2000
          })
        }
      },
      fail() {
        wx.hideLoading()
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
  // 获取我给别人留言数据
  getMeToOtherLeaveMessageData:function () {
    var that=this;
    wx.request({
      url: app.data.apiurl+'applets/ownMessageList',
      data: {
        userId:app.globalData.userId,
        type: that.data.meToOtherCurrenttab,
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
            var list=res.data.entity.messageList;
              // list.forEach(function (item, index, arr) {
              //   item.activityState = app.setState(item.createTime, item.endTime);
              // });

            console.log('我给别人留言列表返回值res')
            console.log(res)
            console.log('我给别人留言列表返回值res')
            that.setData({
              meToYouMessageList: that.data.meToYouMessageList.concat(list),
              totalPageSize:res.data.entity.totalPageSize,
              totalPageSize2:res.data.entity.totalPageSize
            });

            that.data.meToYouMessageList.forEach(function (item,index,arr) {
                var tempArr = [];
                var oneContentStr = ''
                if(item.objectContent.length){
                  item.objectContent.forEach(function (item1,index1,arr1) {
                      if(item1.text){
                        tempArr.push(item1.text)
                      }
                  })
                  oneContentStr = tempArr[0];
                  item.oneContentStr = oneContentStr;
                }
            })
            that.setData({
              meToYouMessageList:that.data.meToYouMessageList
            })

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
  // 打电话
  makeCall:function (e) {
    app.makeCall(e)
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
  // 进入资源、需求
  todetails(e){
  //用来区分是资源还是需求
   var currenttab = this.data.fromCurrenttab;
   var objectid = e.currentTarget.dataset.item.objectId;
    if(this.data.currenttab == 0){
      wx.navigateTo({
        url:'../supplyDetails/supplyDetails?id='+objectid+'&hasownmess=0'+'&currenttab='+currenttab
      })
    }else{
       wx.navigateTo({
        url:'../supplyDetails/supplyDetails?id='+objectid+'&hasownmess=1'+'&currenttab='+currenttab
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentPage:1,
      youToMeMessageList:[],
      meToYouMessageList:[],
      fromCurrenttab:options.currenttab
    });

    if(this.data.fromCurrenttab == '0'){
      //资源。设置请求我给别人资源的留言字段为3
      this.setData({
        meToOtherCurrenttab:3
      })
    }else{
      //需求。设置请求我给别人需求的留言字段为4
      this.setData({
        meToOtherCurrenttab:4
      })
    }
    console.log('消息列表options-fromCurrenttab')
    console.log(this.data.fromCurrenttab)
    console.log(this.data.meToOtherCurrenttab)
    console.log(options)
    console.log('消息列表options-fromCurrenttab')

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
    this.setData({currentPage:1,currentPage1:1,currentPage2:1, youToMeMessageList:[],meToYouMessageList:[]});
    this.getdata();
    this.getMeToOtherLeaveMessageData();
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


      if(self.data.currenttab == 0){//别人给我留言 左边
        self.setData({
          currentPage:1,
          currentPage1:1,
          youToMeMessageList:[]
        })
        setTimeout(function () {
          console.log('别人给我留言---------')
          self.getdata();
        }, 1000)
      }else{//1 我给别人留言，右边
         self.setData({
          currentPage:1,
          currentPage2:1,
          meToYouMessageList:[]
        })
        setTimeout(function () {
          console.log('我给别人留言---------')
          self.getMeToOtherLeaveMessageData();
        }, 1000)
      }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var self = this;
    console.log("页面上拉触底事件的处理函数");
    if(self.data.currenttab==0){//别人给我留言
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
          self.getMeToOtherLeaveMessageData();
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
  onShareAppMessage: function () {

  }
})