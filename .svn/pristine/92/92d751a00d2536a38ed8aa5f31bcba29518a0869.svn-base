// pages/mine/myDemand/myDemand.js
var app=getApp();
Page({
  data: {
    type: '',
    status: '',
    currentPage: 1,
    allcurrentPage: '',
    demandList: [],
    isNoShowDemand:false,
    // demandListLength:false,
    typeList:[],
    typeSelect:'',
    typeSelectId:'',
    statusSelect:'状态',
    statusSelectId:'',
    statusList:[{name:'全部状态',code:''},{name:'已上架',code:0},{name:'已下架',code:1}],
    loading:false
  },
  choiseType(e){
    console.log(e);
    this.setData({
      typeSelect:this.data.typeList[e.detail.value].name,
      typeSelectId:this.data.typeList[e.detail.value].id,
      currentPage:1,
      demandList:[]
    });
    console.log('---------------choisetype-getdata--------------')
    this.getdata();
  },
  choiseStatus(e){
    console.log(e);
    this.setData({
      statusSelect:this.data.statusList[e.detail.value].name,
      statusSelectId:this.data.statusList[e.detail.value].code,
      currentPage:1,
      demandList:[]
    });
    console.log('---------------choiseStatus-getdata--------------')
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
            that.setData({typeList:res.data.entity.needSubjectList});
            that.data.typeList.unshift({id:'',name:"全部需求"});
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
      url: '../addDemand/addDemand',
      success: res => {
        this.setData({loading:false});
      },
      fail: res => {
        this.setData({loading:false});
      },
      complete: res => {
        this.setData({loading:false});
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
        sadType: 1,
        currentPage: that.data.currentPage
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();
        if (res.statusCode = 200) {
          if (res.data.success == 0) {
            console.log("需求列表");
            console.log(res);
            console.log("需求列表");


            var list = res.data.entity.demandList;
            list.forEach(function (item,index,arr) {
              item.differTime = app.getTimeDifference(item.createTime)
            })

            that.setData({
              allcurrentPage: res.data.entity.totalPageSize,
              demandList: that.data.demandList.concat(list)
            });

            console.log('=================需求======================')
            console.log(that.data.demandList)
            console.log('=================需求======================')

            if(that.data.demandList.length>0){
              that.setData({
                isNoShowDemand:false
              })
            }else{
              that.setData({
                isNoShowDemand:true
              })
            }

            // if(that.data.demandList.length>=0){
            //   that.setData({
            //     demandListLength:true
            //   })
            // }else{
            //   demandListLength:false
            // }

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
  toDetails(e) {
    wx.setStorageSync('demanddetails',
          this.data.demandList[e.currentTarget.dataset.index])
    console.log(e.currentTarget.dataset.demandid)
    wx.navigateTo({
      url: '../myDemandDetails/myDemandDetails?demandId=' + e.currentTarget.dataset.demandid,
      success: res => {

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        console.log('----------------------onLoad-getdata----------------------')

    this.setData({
      currentPage: 1,
      demandList:[]
    })
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
      demandList:[]
    });
    console.log('----------------------onshow-getdata---------------------')
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
    console.log("触发下拉事件");
      var self=this;
      wx.showNavigationBarLoading() //在标题栏中显示加载
      setTimeout(function () {
       self.setData({
        currentPage:1,
        demandList:[]
       })
      self.getdata()
      },1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("触发上拉事件");
    if (this.data.currentPage < this.data.allcurrentPage) {
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