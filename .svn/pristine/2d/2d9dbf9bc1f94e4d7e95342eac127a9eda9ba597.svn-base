// pages/maillist/AllEnterprises/AllEnterprises.js
var app=getApp();
Page({
  data: {
    searchCompany:'',
    currentPage:1,
    totalPageSize:1,
    iconList:{
      photo:"../../../assets/images/icon/icon-phone-gray.png",
      email:"../../../assets/images/icon/icon-email-gray.png",
      position:"../../../assets/images/icon/icon-map.png",
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png"
    },
    qualityEnterprise:[],
    city:''
  },
  toaddressMaps(e){
    console.log(e.currentTarget.dataset.adress);
    wx.navigateTo({
      url: "../../mine/companyAddressMaps/companyAddressMaps?address="+e.currentTarget.dataset.address,

    })
  },
  toSearch(e){
    wx.navigateTo({
      url: "../../commenPage/searchPage/searchPage?storageKey="+e.currentTarget.dataset.storagekey,

    })
  },
  tomaillist(){
    if(!app.globalData.userId||app.globalData.userId==-1){
      wx.redirectTo({
        url: "../../logIn/phone/phone"
      });
    }else{
       wx.navigateBack({
        delta: 1
      })
    }
  },
  bindCompanyInput(e){
    this.setData({
      searchCompany:e.detail.value
    });
  },
  getdata(){
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    var that=this;
    console.log(app.data.apiurl+'applets/allCocList?name='+
      that.data.searchCompany+'&type=1&currentPage='+that.data.currentPage);
    wx.request({
      url: app.data.apiurl+'applets/allCocList',
      data: {name:that.data.searchCompany,type:1,currentPage:that.data.currentPage,address:that.data.city},
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(that.data.city);
        console.log(res)
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();
        if(res.statusCode==200){
          if(res.data.success==0){
            that.setData({
              qualityEnterprise:that.data.qualityEnterprise.concat(res.data.entity.companyList),
              totalPageSize:res.data.entity.totalPageSize
            });
            that.data.qualityEnterprise.forEach(function(item,index,arr){
              item.textlogo=item.name.substring(0,2);
              item.fontsize='font34';
                if(item.name.length>30){
                  item.fontsize='font'+Math.floor(544*2/(item.name.length+1));
                }
               // 有http前缀
              if(item.logo&&item.logo.indexOf('http') == -1){
                  item.logo='https://static.upedu.cc/'+item.logo;
                }
            });
            that.setData({
              qualityEnterprise:that.data.qualityEnterprise
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
          title: '加载中'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({currentPage:1});
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
    // if(!app.globalData.userId||app.globalData.userId==-1){
    //   wx.redirectTo({
    //     url: "../../logIn/phone/phone"
    //   });
    // }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // if(!app.globalData.userId||app.globalData.userId==-1){
    //   wx.redirectTo({
    //     url: "../../logIn/phone/phone"
    //   });
    // }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
     var self=this;
      wx.showNavigationBarLoading() //在标题栏中显示加载
      setTimeout(function () {
        self.setData({
          currentPage:1,
          qualityEnterprise:[]
        })
        self.getdata();
      }, 1000)

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
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})