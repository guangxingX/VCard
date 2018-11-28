// assets/images/supply/supplysearchResult/supplysearchResult.js
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
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png"
    },
    sadList:[],
    type:0,
    isHighQuality:false,
    currenttab:'',
    hasownmess:0
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

  toDetails(e){
    console.log(e);
    console.log(this.data.sadList);
    console.log(this.data.sadList[e.currentTarget.dataset.index]);

    var hasownmess = e.currentTarget.dataset.hasownmess;

    app.data.supplyDetailsData=this.data.sadList[e.currentTarget.dataset.index];
    wx.navigateTo({
      url: "../supplyDetails/supplyDetails?id="+e.currentTarget.dataset.id+'&currenttab='+this.data.currenttab+'&hasownmess='+hasownmess,
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
      url: app.data.apiurl+'applets/sadList',
      data: {userId:app.globalData.userId,cocId:app.globalData.cocId,name:that.data.searchName,sadType:that.data.type,
        currentPage:that.data.currentPage,pageSize:5},
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(app.data.apiurl+'applets/sadList?cocId=10395&name='+
          that.data.searchName+'&sadType='+that.data.type+'&currentPage='+that.data.currentPage+'&pageSize=5');
        console.log(that.data.searchName);
        console.log(res);
        if(res.statusCode==200){
          if(res.data.success==0){
            var list=res.data.entity.sadList;
            list.forEach(function(item, index, arr){
              item.differTime=app.getTimeDifference(item.createTime)
            })
            that.data.sadList=that.data.sadList.concat(list);
            that.setData({sadList:that.data.sadList,unread:res.data.entity.unread,totalPageSize:res.data.entity.totalPageSize});
            if(that.data.sadList.length){
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
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if(options&&options.searchname){
      this.setData({searchcoc:options.searchname,currenttab:options.currenttab})
    }
    console.log('搜索页onptins')
    console.log(options)
    console.log(this.data.currenttab)
    console.log('搜索页onptins')



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
      //有值时下来才有提示
      if(this.data.sadList.length){
        wx.showToast({
          title: '没有更多数据了',
          icon: 'success',
          duration: 2000
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