var app = getApp()
Page({
  data: {
    errorshow:false,
    failuretip:'',
    supplyId:'',
    seleValue:'',
    loading:false,
    companyList:[],
    inputStr:'',
    contactName:'',
    companyName:'',
    gongsiName:'',
    companyId:'',
    mycardId:'',
    isonlyCard:false,
    cardList:[],
    iconList:{
      photo:"../../../assets/images/icon/icon-phone-gray.png",
      email:"../../../assets/images/icon/icon-email-gray.png",
      position:"../../../assets/images/icon/icon-address-gray.png",
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png"
    },
    sadList:{},
    differTime:'',
    charNumber:0,
    // 提交留言使用 0资源，1需求
    currenttab:0
  },

  getCardList(){
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/main',
      data: {
        userId:app.globalData.userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('cardList');
        console.log('cardList');
        console.log(res);
        that.setData({
          cardList: res.data.entity.cardInfo,
        });
        if(res.data.entity.cardInfo.length==1){
          that.setData({isonlyCard:true,companyName:res.data.entity.cardInfo[0].companyName,
          contactName:res.data.entity.cardInfo[0].name,mycardId:res.data.entity.cardInfo[0].id});
        }else{
          that.setData({isonlyCard:false});
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      supplyId:options.id,
      sadList:app.data.toLeaveMessage,
      currenttab:options.currenttab,
      gongsiName:options.companyname
    });
    console.log('留言页面获取到的数据');
    console.log(this.data.currenttab)
    console.log(app.data.toLeaveMessage);
    console.log(options)
    console.log('留言页面获取到的数据');
    if(app.data.toLeaveMessage&&app.data.toLeaveMessage.createdTime){
      console.log(this.data.sadList)
      console.log(this.data.sadList.createdTime)
      this.data.sadList.differTime=app.getTimeDifference(this.data.sadList.createdTime);
      this.setData({
        sadList:this.data.sadList
      })

    }
    if(this.data.sadList.launchCompany&&this.data.sadList.launchCompany.name){
      this.data.sadList.companyName=this.data.sadList.launchCompany.name;
      this.setData({
        sadList:this.data.sadList
      })
    }
     if(this.data.sadList.launchCompany&&this.data.sadList.launchCompany.logo){
      this.data.sadList.companyLogo=this.data.sadList.launchCompany.logo;
      this.setData({
        sadList:this.data.sadList
      })
    }

    console.log( 'this.data.sadList')
    console.log( this.data.sadList)
    console.log( 'this.data.sadList')
    //模板里是用companyName字段取得值，所以这里再造一个字段
    this.data.sadList.companyName = this.data.gongsiName;
    this.setData({
      sadList:this.data.sadList
    })

  },
  choiseAdress:function (e) {
    //进名片列表
    wx.navigateTo({
      url:'../../mine/myCard/myCard'
    })
  },

  // 输入文字改变
  inputChange:function (e) {
    var strLength = e.detail.value.length;
      this.setData({
        charNumber: strLength,
        inputStr : e.detail.value
      })

  },
  // 保存留言
  toAddActive:function () {
    var that = this;
    that.setData({
      loading:true
    })
    setTimeout(function(){
      that.setData({errorshow:false})
    },1000)
    if(!that.data.inputStr){
      that.setData({errorshow:true,failuretip:'请输入留言内容'});
      that.setData({
        loading:false
      })
      return;
    }else if(!that.data.mycardId){
      that.setData({errorshow:true,failuretip:'请选择联系人'});
       that.setData({
        loading:false
      })
      return;
    }else{
      wx.request({
        url: app.data.apiurl+'applets/saveMessage',
        data: {
          userId:app.globalData.userId,
          sadId:that.data.supplyId,
          // companyId:that.data.companyId,
          cardId:that.data.mycardId,
          leaveMessage:that.data.inputStr,
          // 这里产品设计的没有区分，暂时写死
          type:that.data.currenttab
        },
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log('保存留言res')
          console.log(res)
          console.log('保存留言res')
           that.setData({
              loading:false
            })

          if(res.statusCode==200){
            if(res.data.success==0){
                wx.showToast({
                  title:'提交成功！',
                  duration:2000
                })
                setTimeout(function () {
                  wx.navigateBack({
                    detail:1
                  })
                },2000)

             }else{
              wx.showToast({
                title: res.data.message,
                image:'../../../assets/images/icon/error-fff.png',
                duration: 2000
              })
            }
          }else{
             that.setData({
              loading:false
            })
            wx.showToast({
              title: '加载失败',
              image:'../../../assets/images/icon/error-fff.png',
              duration: 2000
            })
          }
        },
        fail(){
           that.setData({
            loading:false
          })
          wx.showToast({
            title: '加载失败',
            image:'../../../assets/images/icon/error-fff.png',
            duration: 2000
          })
        }
      })
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
     this.getCardList();

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
