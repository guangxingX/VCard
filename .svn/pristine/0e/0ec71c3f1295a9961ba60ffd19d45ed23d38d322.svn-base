var app=getApp();
Page({
  data: {
    searchcoc:'',
    currentPage:1,
    totalPageSize:1,
    iconList:{
      photo:"../../../assets/images/icon/icon-phone-gray.png",
      email:"../../../assets/images/icon/icon-email-gray.png",
      position:"../../../assets/images/icon/icon-map.png",
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png"
    },
    qualityCC:[],
    qualityEnterprise:[],
    type:1,
    isHighQuality:false
  },
   makeCall:function (e) {
    app.makeCall(e)
  },
  toaddressMaps(e){
    console.log(e.currentTarget.dataset.adress);
    wx.navigateTo({
      url: "../../mine/companyAddressMaps/companyAddressMaps?address="+e.currentTarget.dataset.address,
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
      url: app.data.apiurl+'applets/allCocList',
      data: {name:that.data.searchcoc,
        type:that.data.type,currentPage:that.data.currentPage,pageSize:3},
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(that.data.currentPage)
        console.log(res);
        if(res.statusCode==200){
          if(res.data.success==0){

            console.log('到底是哪一个')
            console.log(that.data.type)
            console.log('到底是哪一个')

            if(that.data.type==2){//商会
               wx.setNavigationBarTitle({
                 title:'商会搜索'
               });

              console.log("商会");
              var list=res.data.entity.cocList;
              list.forEach(function(item,index,arr){
                item.textlogo=item.name.substring(0,2);
              });
              that.setData({
                qualityCC:that.data.qualityCC.concat(list),
                totalPageSize:res.data.entity.totalPageSize,
              });

              if(that.data.qualityCC.length){
                that.setData({
                  isShowNoSearchResult:false
                })
              }else{
                that.setData({
                  isShowNoSearchResult:true
                })
              }

            }else{
              console.log("公司");

               wx.setNavigationBarTitle({
                 title:'公司搜索'
               });

              var list=res.data.entity.companyList;
              list.forEach(function(item,index,arr){
                item.textlogo=item.name.substring(0,2);
                item.fontsize='font34';
                if(item.name.length>30){
                  item.fontsize='font'+Math.floor(544*2/(item.name.length+1));
                }
                if(item.logo&&item.logo.indexOf('http') == -1){
                  item.logo='https://static.upedu.cc/'+item.logo;
                }
              });
              that.setData({
                qualityEnterprise:that.data.qualityEnterprise.concat(list),
                totalPageSize:res.data.entity.totalPageSize,
              });

               if(that.data.qualityEnterprise.length){
                that.setData({
                  isShowNoSearchResult:false
                })
              }else{
                that.setData({
                  isShowNoSearchResult:true
                })
              }


              console.log(that.data.qualityEnterprise);
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
          title: '加载中'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("跳转成功了。。。");
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]
    prevPage.setData({historyclick:true});
    if(options.isHighQuality){
      this.setData({isHighQuality:options.isHighQuality});
    }
    this.setData({currentPage:1,searchcoc:options.searchname,type:options.type});
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
    if(!app.globalData.userId||app.globalData.userId==-1){
      wx.redirectTo({
        url: "../../logIn/phone/phone"
      });
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if(!app.globalData.userId||app.globalData.userId==-1){
      wx.redirectTo({
        url: "../../logIn/phone/phone"
      });
    }
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
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})