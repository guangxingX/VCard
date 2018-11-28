// pages/homePage/cardChoiseCompany/cardChoiseCompany.js
var app=getApp();
Page({
  data: {
    iconList:{
      photo:"../../../assets/images/icon/icon-phone-gray.png",
      email:"../../../assets/images/icon/icon-email-gray.png",
      position:"../../../assets/images/icon/icon-address-gray.png",
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png"
    },
    failuretip:'',
    errorshow:false,
    myCompanyList:[],
    showMask:false,
    overflowHiden:false,
    companyName:'',
    changeTemp:'nojump'
  },
  cancleClick(){
    this.setData({showMask:false});
  },
  saveClick(){
    var that=this;
    setTimeout(function(){
      that.setData({
        errorshow:false
      })
    },1000)
    if(that.data.companyName!=''){
      console.log(that.data.companyName);
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      prevPage.setData({
        company:that.data.companyName
      });
      wx.navigateBack({
        delta: 1
      });
    }else{
      that.setData({errorshow:true,failuretip:'请填写公司名称'});
    }
  },
  industryInputChange(e){
    console.log(e);
    this.setData({companyName:e.detail.value});
  },
  addCompany(){
    this.setData({
        showMask:true,
        overflowHiden:true,
        companyName:''
      })
  },
  getCompanyList(){
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/cardCompany',
      data: {userId:app.globalData.userId},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.success == 0) {
              that.setData({myCompanyList:res.data.entity.companyInfo});
              that.data.myCompanyList.forEach(function(item,index,arr){
                item.textlogo=item.name.substring(0,2);
                item.fontsize='font34';
                if(item.name.length>30){
                  item.fontsize='font'+Math.floor(544*2/(item.name.length+1));
                }
              });
              that.setData({
                myCompanyList:that.data.myCompanyList
              });
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
        wx.showToast({
          title: '加载失败',
          image:'../../../assets/images/icon/error-fff.png',
          duration: 2000
        })
      }
    })
  },
  choiseCompany(e){
    var index=e.currentTarget.dataset.index;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    console.log(this.data.myCompanyList);
     console.log(this.data.myCompanyList[index]);
    prevPage.setData({
      companyId:this.data.myCompanyList[index].id,
      company:this.data.myCompanyList[index].name
      // address:this.data.myCompanyList[index].address
    });
    wx.navigateBack({
      delta: 1
    });
  },
  onLoad: function (options) {
    this.getCompanyList();
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
    this.getCompanyList();
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