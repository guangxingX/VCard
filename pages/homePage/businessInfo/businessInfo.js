// pages/homePage/businessInfo/businessInfo.js
var app = getApp();
Page({
  data: {
    userId:app.globalData.userId,
    showmore:false,
    src:'',
    failuretip:'',
    errorshow:false,
    birthday:'',
    birthdayM:'',
    birthdayD:'',
    constellation:'',
    address:'',
    address1:'',
    address2:'',
    isMarried:'',
    permanentPlace:'',
    region:[],
    domain:'',
    uptoken:'',
    avatar:'',
    name:'',
    company:'',
    companyId:'',
    email:'',
    mobile:'',
    position:'',
    telephone:'',
    isAuthentication:false,
    cardbg:'',
    cardbgId:'',
    submitinfo:'',
    bgList:[],
    mycardid:'',
    cardDetail:{},
    businessInfoStorage:'',
    companyCheck:false,
    companyOne:false,
    loading:false,
    MarriageList:['保密','未婚','已婚'],
    isMarriedIndex:0,
    tempAvatar:''
  },
  // 更换背景
  tochangebg(){

    console.log(this.data.avatar)
    console.log(this.data.tempAvatar)

    app.businessInfoStorage={
      name:this.data.name,
      bgUrl:this.data.cardbg,
      cardbgId:this.data.cardbgId,
      avatar:this.data.avatar,
      // avatar:this.data.tempAvatar,
      position:this.data.position,
      isOriginal:this.data.isOriginal,
      position:this.data.position,
      companyName:this.data.company,
      mobile:this.data.mobile,
      email:this.data.email,
      address:this.data.address,
      isAuthentication:this.data.isAuthentication
    };
    wx.navigateTo({
      url: '../../mine/reviseCardBg/reviseCardBg',
      success: res => {
        console.log('businessInfoStorage')
        console.log(app.businessInfoStorage)
        console.log('businessInfoStorage')

      },
      fail: res => {

      },
      complete: res => {

      }
    })



    console.log('存储的名片详情数据')
    console.log(app.businessInfoStorage)
    console.log('存储的名片详情数据')
  },
  getbgList(){
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/backgroundList',
      data:{type:2},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.success == 0) {
            if(!that.data.mycardid){
              that.setData({bgList:res.data.entity.bgList,cardbg:res.data.entity.bgList[0].url,cardbgId:res.data.entity.bgList[0].id});
              that.data.bgList[0].checked=true;
              that.setData({bgList:that.data.bgList});
            }else{
              var bgList=res.data.entity.bgList;
              bgList.forEach(function(item,index,arr){
                if(item.id==that.data.cardbgId){
                  item.checked=true;
                }else{
                  item.checked=false;
                }
              });
              that.setData({bgList:bgList});
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
        wx.showToast({
          title: '加载失败',
          image:'../../../assets/images/icon/error-fff.png',
          duration: 2000
        })
      }
    })
  },
  formSubmit(e){
    var that=this;
    setTimeout(function(){
      that.setData({
        errorshow:false,
      })
    },1000)
    that.setData({
        loading:true
      })

    var value=e.detail.value;
    if(value.name==''){
      this.setData({errorshow:true,failuretip:'请填写姓名',loading:false});
      return;
    }else if(value.position==''){
      this.setData({errorshow:true,failuretip:'请填写职位',loading:false});
       return;
    }else if(value.companyName==''||value.companyName==undefined){
      console.log(value.companyName);
      this.setData({errorshow:true,failuretip:'请填写公司',loading:false});
       return;
    }else if(value.mobile==''){
      this.setData({errorshow:true,failuretip:'请填写手机号',loading:false});
       return;
    }else if(!app.isValidPhoneNumber(value.mobile)){
      this.setData({errorshow:true,failuretip:'请填写合法手机号',loading:false});
       return;
    }else if(!app.isValidTelphone(value.telephone)){
      this.setData({errorshow:true,failuretip:'请填写合法座机号',loading:false});
       return;
    }else if(value.email==''){
      this.setData({errorshow:true,failuretip:'请填写邮箱',loading:false});
       return;
    }else if(!app.isValidEmail(value.email)){
      this.setData({errorshow:true,failuretip:'请填写合法邮箱',loading:false});
      return;
    }else if(value.address==''){
      console.log("地址------------");
      this.setData({errorshow:true,failuretip:'请填写公司地址',loading:false});
      return;
    }else{
      that.setData({submitinfo:e.detail.value});
      that.submitCardInfo()
    }
  },
  submitCardInfo(){
    wx.showLoading({
      title: '提交中',
      mask:true
    })
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/addCard',
      data:that.data.submitinfo,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // post
      },
      success: function (res) {
        console.log(that.data.submitinfo);
        console.log("新建名片成功");
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.success == 0) {
            that.setData({
              loading:false
            })
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            });
            var pages = getCurrentPages();
            console.log(pages);
            if(pages.length>=3){
              var prevPage = pages[pages.length - 3];
              // prevPage.getdata();
              wx.navigateBack({
                delta: 2
              })
            }else{
              console.log("跳转到首页");
              wx.switchTab({
                url:'../../index/index'
              });
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
            title: '提交失败',
            image:'../../../assets/images/icon/error-fff.png',
            duration: 2000
          })
        }
      },
      fail() {
        wx.showToast({
          title: '提交失败',
          image:'../../../assets/images/icon/error-fff.png',
          duration: 2000
        })
      },
      complete() {
        wx.hideLoading({
          title: '提交中'
        })
      }
    })
  },
  changename(e){
    var str = app.isHaveEmojiStr(e.detail.value)
    this.setData({
      name:str
    });
  },
  changeposition(e){
    var str = app.isHaveEmojiStr(e.detail.value)
    this.setData({
      position:str
    });
  },
  changecompany(e){
    this.setData({
      company:e.detail.value
    });
  },
  changemobile(e){
    var str = app.isHaveEmojiStr(e.detail.value)
    this.setData({
      mobile:str
    });
  },
  guhuachange(e){
    var str = app.isHaveEmojiStr(e.detail.value)
    var newStr = 'this.data.cardDetail.telephone'
    this.setData({
      newStr:str
    })

  },
  changeemail(e){
    var str = app.isHaveEmojiStr(e.detail.value)
    this.setData({
      email:str
    });
  },
  changeaddress(e){
    var str = app.isHaveEmojiStr(e.detail.value)
    this.setData({
      address:str
    });
  },
  showmoreclick (){
    this.setData({
      showmore: !this.data.showmore
    });
  },
  getConstellation(month,day){
    var s="魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
    var arr=[20,19,21,21,21,22,23,23,23,23,22,22];
    return s.substr(month*2-(day<arr[month-1]?2:0),2)+"座";
  },
  bindMarriageChange(e){
    console.log(e);
    console.log(e.detail.value)
    this.setData({isMarried:e.detail.value});
    // if(e.detail.value==0){
    //   this.setData({
    //     isMarried:''
    //   })
    // }else if(e.detail.value==1||e.detail.value==2){
    //   this.setData({
    //     isMarried:e.detail.value-1
    //   })
    // }
    console.log(this.data.isMarried);
  },
  bindRegionChange: function (e) {
    this.setData({
      region:e.detail.value,
      permanentPlace:e.detail.value[0]+' '+e.detail.value[1]+' '+e.detail.value[2],
      errorshow:false
    })
  },
  bindBirthdayChange(e){
    this.setData({
      birthday: e.detail.value,
      birthdayM: e.detail.value.substring(5,7),
      birthdayD: e.detail.value.substring(8,10),
      constellation:this.getConstellation(e.detail.value.substring(5,7),e.detail.value.substring(8,10))
    })
  },
  choiseAdress:function(e){
    wx.navigateTo({
      url: '../choiseAdress/choiseAdress?address='+this.data.address+'&address1='
      +this.data.address1+'&address2='+this.data.address2,
      success: res => {
      },
      fail: res => {

      },
      complete: res => {

      }
    })
  },
  choisemarriage(){
    console.log(this.data.isMarried);
    wx.navigateTo({
      url: '../choisemarriage/choisemarriage?isMarried='+this.data.isMarried,
      success: res => {
      },
      fail: res => {

      },
      complete: res => {

      }
    })
  },
  upload () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        const src = res.tempFilePaths[0]
        wx.navigateTo({
          url: `../upload/upload?src=${src}`
        })
      }
    })
  },
  getCardDetails(){
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/myCardInfo',
      data:{cardId:that.data.mycardid,userId:app.globalData.userId},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.success == 0) {
              var value=res.data.entity;
              console.log('获取到的名片详情')
              console.log(value)
              console.log('获取到的名片详情')
              if(value.cardInfo){
                that.setData({name:value.cardInfo.name,company:value.cardInfo.companyName,
                  companyId:value.cardInfo.companyId,email:value.cardInfo.email,
                  mobile:value.cardInfo.mobile,position:value.cardInfo.position,
                  avatar:value.cardInfo.avatar,
                  tempAvatar:value.cardInfo.avatar,
                  address:value.cardInfo.address,
                  isAuthentication:value.cardInfo.isAuthentication,
                  cardbg:value.cardInfo.bgUrl,cardbgId:value.cardInfo.bgId
                });
              }
              if(value.cardDetail){
                that.setData({
                  cardDetail:value.cardDetail,permanentPlace:value.cardDetail.permanentPlace,
                  birthday:value.cardDetail.birthday,constellation:value.cardDetail.constellation,
                  isMarried:value.cardDetail.isMarried
                });
                if(value.cardDetail.birthday){
                  console.log("生日+"+value.cardDetail.birthday);
                  console.log(value.cardDetail.birthday.substring(5,7));
                  that.setData({constellation:that.getConstellation(value.cardDetail.birthday.substring(5,7),value.cardDetail.birthday.substring(8,10))})
                }else{
                  that.setData({constellation:''});
                }
              }
              if((that.data.avatar==''||!that.data.avatar)&&app.globalData.userInfo.avatarUrl){
                that.setData({avatar:app.globalData.userInfo.avatarUrl});
              }else if(that.data.avatar==''||!that.data.avatar){
                that.setData({avatar:'../../../assets/images/icon/mycard-avatar-default.png'});
              }
              that.getbgList();
              console.log("传过来的id");
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
  getCompanyList(){
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/main',
      data: {userId:app.globalData.userId},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.success == 0) {
              if(res.data.entity.companyInfo&&res.data.entity.companyInfo.length>0){
                that.setData({companyCheck:true});
              }else{
                that.setData({companyCheck:false,companyOne:false});
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
        wx.showToast({
          title: '加载失败',
          image:'../../../assets/images/icon/error-fff.png',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('on-laod -options')
    console.log(options)
    console.log('on-laod -options')

    if(options.avatar){
      this.setData({avatar:options.avatar});
    }
    this.setData({userId:app.globalData.userId});
    if(options.edit){
      wx.setNavigationBarTitle({
        title: '编辑名片'
      });
    }
    var that=this;
    wx.getStorage({
      key: 'ocrCardInfo',
      success: function (res) {
        var ocrCardInfo=res.data;
        console.log('on - load res.data');
        console.log(res.data);
        console.log('on - load res.data');
        if(ocrCardInfo){
          that.setData({
            name:ocrCardInfo.name,
            address:ocrCardInfo.address,
            company:ocrCardInfo.company,
            email:ocrCardInfo.email,
            mobile:ocrCardInfo.mobile,
            position:ocrCardInfo.position,
            telephone:ocrCardInfo.telephone,
            department:ocrCardInfo.department
          });
        }
      },
      fail:function (res) {
        console.log('获取缓存失败')
        console.log(res)
        console.log('获取缓存失败')
      }
    });
    if(options.mycardid){
      this.setData({mycardid:options.mycardid});
      this.getCardDetails();
    }else{
      this.getbgList();
    }
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

    if((this.data.avatar==''||!this.data.avatar)&&app.globalData.userInfo.avatarUrl){
      console.log('onshow if')
      console.log(this.data.avatar)
      console.log('onshow if')
      this.setData({avatar:app.globalData.userInfo.avatarUrl});
    }else if(this.data.avatar==''||!this.data.avatar){
      this.setData({avatar:app.globalData.userInfo.avatarUrl});
    }


    this.getCompanyList();
    console.log("onshow====")
    console.log(this.data.companyId);
    console.log(this.data.company);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("页面隐藏1111111111111111");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.removeStorage({
      key: 'ocrCardInfo',
      success: function (res) {
        console.log("清除缓存businessinfo")
      }
    })
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