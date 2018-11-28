// pages/mine/myResource/myResource.js
var app = getApp();
Page({
  data: {
    type: '',
    status: '',
    currentPage: 1,
    allcurrentPage:1,
    totalPageSize: '',
    sadList: [],
    // sadListLength:false,
    typeList:[],
    typeSelect:'',
    typeSelectId:'',
    statusSelect:'状态',
    statusSelectId:'',
    isShowNoResource:false,
    statusList:[{name:'全部',code:''},{name:'已上架',code:0},{name:'已下架',code:1}],
    loading:false
  },
  choiseType(e){
    console.log(e);
    this.setData({
      typeSelect:this.data.typeList[e.detail.value].name,
      typeSelectId:this.data.typeList[e.detail.value].id,
      currentPage:1,
      sadList:[]
    });
    this.getdata();
  },
  choiseStatus(e){
    console.log(e);
    this.setData({
      statusSelect:this.data.statusList[e.detail.value].name,
      statusSelectId:this.data.statusList[e.detail.value].code,
      currentPage:1,
      sadList:[]
    });
    this.getdata();
  },
  gettypeList(){
    var that=this;
    wx.request({
      url: app.data.apiurl+'applets/subjectList',
      data: {cocId:app.globalData.cocId},
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res);
        if(res.statusCode==200){
          if(res.data.success==0){
            console.log(that.data);
            that.setData({typeList:res.data.entity.supplySubjectList});
            that.data.typeList.unshift({id:'',name:"全部"});
            that.setData({typeList:that.data.typeList});
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
        })
      }
    })
  },
  addResource: function () {
    this.setData({loading:true});
    wx.navigateTo({
      url: '../addResource/addResource',
      success: res => {

      },
      fail: res => {

      },
      complete: res => {
        this.setData({loading:false});
      }
    })
  },
  toDetails: function (e) {
    wx.navigateTo({
      url: '../myResourceDetails/myResourceDetails?resourceId=' + e.currentTarget.dataset.resourceid,
      success: res => {

      },
      fail: res => {

      },
      complete: res => {

      }
    })
  },
  getdata() {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/myDemand',
      data: {
        userId: app.globalData.userId,
        type: that.data.typeSelectId,
        status: that.data.statusSelectId,
        sadType: 0,
        currentPage: that.data.currentPage
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();
        if (res.statusCode == 200) {

          if (res.data.success == 0) {
            console.log(res);
            var list=res.data.entity.demandList;
            list.forEach(function(item, index, arr){
              item.differTime=app.getTimeDifference(item.createTime)
            })
            that.setData({
              totalPageSize: res.data.entity.totalPageSize,
              sadList:that.data.sadList.concat(list)
            });


            console.log('================资源======================')
            console.log(that.data.sadList)
            console.log('=================资源======================')


            if(that.data.sadList.length>0){
              that.setData({
                isShowNoResource:false
              })
            }else{
              that.setData({
                isShowNoResource:true
              })
            }


            // if(that.data.sadList.length>=0){
            //   that.setData({
            //     sadListLength:true
            //   })
            // }else{
            //   that.setData({
            //     sadListLength:false
            //   })
            // }

            console.log(that.data.sadList);
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
          title: '加载中',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentPage: 1,
      sadList:[]
    });
    this.gettypeList();
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
    this.setData({
      currentPage: 1,
      sadList:[]
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
      setTimeout(function () {
          self.setData({
          currentPage1:1,
          currentPage:1,
          sadList:[]
        })
        self.getdata();
      }, 1000)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.currentPage < this.data.totalPageSize) {
      this.data.currentPage += 1;
      this.setData({
        currentPage: this.data.currentPage
      });
      this.getdata();
    }
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})