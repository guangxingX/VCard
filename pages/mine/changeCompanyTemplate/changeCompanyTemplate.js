// pages/mine/reviseCardBg/reviseCardBg.js
var app=getApp();
Page({
  data: {
    isuthentication:'',
    bgList:[],
    companyInfo:{},
    companyId:'',
    // businessCard: {},
    // bgList:[],
    currId:'',
    bgarrRemainder:'',
    bgarrCol:'',
    iconList:{
      photo:"../../../assets/images/icon/icon-phone-gray.png",
      email:"../../../assets/images/icon/icon-email-gray.png",
      position:"../../../assets/images/icon/icon-map.png",
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png"
    },
    // 更换公司背景的页面标志
    changeTemp:'nojump'
  },
  toaddressMaps:function (e) {
    console.log(e)
    wx.navigateTo({
      url:'../../mine/companyAddressMaps/companyAddressMaps?address='+e.currentTarget.dataset.address
    })
  },
  choisebg(e){
    var that=this;
    that.setData({currId:e.currentTarget.dataset.id});
    that.data.bgList.forEach(function(item, index, arr){
      if(item.id==e.currentTarget.dataset.id){
        item.checked=true;
        that.data.companyInfo.companyTemplate=item.url
      }else{
        item.checked=false;
      }

    });
    // that.setData({bgList:that.data.bgList,businessCard:that.data.businessCard});
    that.setData({bgList:that.data.bgList,companyInfo:that.data.companyInfo});
      // console.log('that.data.bgList')
      // console.log(that.data.bgList)
      // console.log('that.data.bgList')
      // console.log(that.data.currId)

      console.log('点击的背景id')
      console.log(that.data.currId)
      console.log('点击的背景id')
  },
  saveSet(){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var that=this;
    prevPage.setData({cardbg:that.data.companyInfo.companyTemplate,cardbgId:that.data.currId});
    console.log(that.data.currId)
    wx.navigateBack({
      delta: 1
    })
  },

 // 请求模板列表
  getCompanyTemplates:function () {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    var that=this;
    wx.request({
      url: app.data.apiurl+'applets/backgroundList',
      data: {
       type:1
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if(res.statusCode==200){
          if(res.data.success==0){

            console.log('模板列表数据是--------')
            console.log(res);
            console.log('模板列表数据是--------')

          that.setData({
            bgList:res.data.entity.bgList,
          });
          that.setData({
            bgarrCol:Math.ceil(that.data.bgList.length/3),
            bgarrRemainder:that.data.bgList.length%3
          })

          var index = 0;
          for(var i=0;i<that.data.bgList.length;i++){
              if(that.data.bgList[i].id==that.data.currId){
                index = i
              }
           }

          var willChangeItem = "bgList["+index+"].checked";
          that.setData({
            [willChangeItem]:true
          })


             wx.hideLoading({})

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

      }
    })
  },
  // 保存公司模板
  saveCompanyTemplate:function(){
    var companyId = this.data.companyId;
    var bgId = this.data.currId;

    console.log('保存公司所需数据')
    console.log('companyId='+companyId)
    console.log('bgId='+bgId)
    console.log('保存公司所需数据')

    if(companyId=='' || companyId=='undefined' || companyId==null) {
      wx.showToast({
        title:'缺少必须参数companyId'
      })
      return;
    }

    if(bgId=='' || bgId=='undefined' || bgId==null) {
       wx.showToast({
        title:'缺少必须参数bgId'
      })
      return;
    }

    wx.showLoading({
      title:'保存中',
      mask:true
    })

    wx.request({
      url:app.data.apiurl+'applets/updateCompanyBasic',
      data:{
        id:companyId,
        mould_id:bgId
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res);
        if(res.statusCode==200){
          console.log(res.data)
          if(res.data.success==0){

           wx.showLoading({
            title:'保存成功',
            mask:true
           })
           wx.navigateBack({
            detail:1
           })

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

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // wx.getStorage({
    //   key: 'businessInfoStorage',
    //   success: function (res) {
    //     that.setData({
    //       businessCard: res.data
    //     })
    //     console.log(res.data)
    //   }
    // })
    // wx.getStorage({
    //   key: 'businessbgStorage',
    //   success: function (res) {
    //     that.setData({
    //       bgList: res.data
    //     })
    //     console.log(res.data)
    //   }
    // })

    console.log(options)
    var isuthentication = options.isuthentication;
    that.setData({
      isuthentication:isuthentication,
      // 背景id
      companyId:options.id
    })
    wx.getStorage({
      key:'companyDesInfoKey',
      success:function(res){

        console.log('更改模板获取到的值是')
        console.log(res.data)
        console.log('更改模板获取到的值是')



        that.setData({
          companyInfo:res.data,
          currId:res.data.bgId
        })
        if(that.data.companyInfo.businessInfo&&that.data.companyInfo.businessInfo.setUpTime){
          that.data.companyInfo.setUpTime=that.data.companyInfo.businessInfo.setUpTime;
        }
        if(that.data.companyInfo.businessInfo&&that.data.companyInfo.businessInfo.legalPerson){
          that.data.companyInfo.legalPerson=that.data.companyInfo.businessInfo.legalPerson;
        }
        that.setData({
          companyInfo:that.data.companyInfo
        })
        console.log('that.data.companyInfo')
        console.log(res.data)
        console.log(that.data.companyInfo)
        console.log('that.data.companyInfo')
      }
    })

    that.getCompanyTemplates();

    // console.log('缓存获取到的公司信息是')
    // console.log(that.data.companyInfo)
    // console.log('缓存获取到的公司信息是')


    // console.log('传进来的背景id是')
    // console.log(that.data.currId)
    // console.log('传进来的背景id是')
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
    wx.removeStorage({
      key: 'businessInfoStorage',
      success: function (res) {
        // console.log("清除缓存活动详情")
      }
    })
    wx.removeStorage({
      key: 'businessbgStorage',
      success: function (res) {
        // console.log("清除缓存活动详情")
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