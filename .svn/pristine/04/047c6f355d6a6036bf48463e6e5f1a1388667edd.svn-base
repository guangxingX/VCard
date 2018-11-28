// pages/maillist/commerceDetails/commerceDetails.js
var app=getApp();
Page({
  data: {
    isshowmore:false,
    cocid:'',
    serviceCoList:[],
    cocIntro:'',
    email:'',
    logo:"",
    textlogo:'',
    name:"WISSO大数据商会",
    serviceNum:100,
    mobile:"",
    address:"",
    currenttab:1,
    iconList:{
      photo:"../../../assets/images/icon/icon-phone-gray.png",
      email:"../../../assets/images/icon/icon-email-gray.png",
      position:"../../../assets/images/icon/icon-map.png",
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png"
    }
  },
  showmorefun(){
    this.setData({
      isshowmore:!this.data.isshowmore
    });
  },
  makeCall:function (e) {
    app.makeCall(e)
  },
  // 去地图页面
  toaddressMaps:function (e) {
    var address = e.currentTarget.dataset.address;
    console.log(e)
    console.log(address)
    wx.navigateTo({
      url:'../../mine/companyAddressMaps/companyAddressMaps?address='+address
    })
  },
  tabchange(e){
    this.setData({currenttab:e.currentTarget.dataset.curr});
  },
  goCompanyDes:function (e) {
    var address = e.currentTarget.dataset.address;
    wx.navigateTo({
      url:'../../mine/companyAddressMaps/companyAddressMaps?address='+address
    })
  },
  getdata(){
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    var that=this;
    wx.request({
      url: app.data.apiurl+'applets/cocInfo',
      data: {cocId:that.data.cocid},
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if(res.statusCode==200){
          console.log('商会详情数据是')
          console.log(res)
          console.log('商会详情数据是')

          if(res.data.success==0){
              var tempLogo = res.data.entity.logo;
              if(tempLogo){
                  // 有http
                  console.log();
                  if(tempLogo.indexOf('http')!= -1){
                      tempLogo=tempLogo
                  }else{
                    tempLogo = 'https://static.upedu.cc/'+tempLogo
                  }

              }else{
                  // tempLogo = '../../../assets/images/mine/logo.jpg'
                  tempLogo = ''


              }
            that.setData({
              serviceCoList:res.data.entity.serviceCoList,
              cocIntro:res.data.entity.cocIntro,
              mobile:res.data.entity.mobile,
              email:res.data.entity.email,
              address:res.data.entity.address,
              logo:tempLogo,
              serviceNum:res.data.entity.serviceNum,
              name:res.data.entity.name
            });

            if(!that.data.tempLogo){
                // 要显示两字
                  var textlogo='';
                  textlogo=that.data.name.substring(0,2);
                  console.log('截取')
                  console.log(textlogo)
                  console.log('截取')
                  that.setData({
                    textlogo:textlogo
                  })
                  console.log('loggo-----------')
                  console.log(that.data.name)
                  console.log(that.data.textlogo)
                  console.log('loggo-----------')
                }else{
                  console.log('pppppppppppppppp')
                  console.log(that.data.textlogo)
                }

            that.data.serviceCoList.forEach(function(item,index,arr){
              item.textlogo=item.name.substring(0,2);
              item.fontsize='font34';
                if(item.name.length>30){
                  item.fontsize='font'+Math.floor(544*2/(item.name.length+1));
                }
              if(item.logo&&item.logo.indexOf('http')== -1){
                item.logo = 'https://static.upedu.cc/'+item.logo
              }

            });
            that.setData({
              serviceCoList:that.data.serviceCoList
            });
            console.log(that.data.cocIntro)
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
  joincoc(){
    wx.navigateTo({
      url: '../joincoc/joincoc?cocid='+this.data.cocid+'&mobile='+this.data.mobile+'&address='+this.data.address
      +'&name='+this.data.name+'&email='+this.data.email
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({cocid:options.cocid});
    this.getdata();
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})