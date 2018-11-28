// pages/mine/editMyCompany/editMyCompany.js
var app=getApp();
Page({
  data: {
    companyInfo:{},
    companyId:'',
    //总的百分比
    infoPercent:'',
    persent:{},
    dataList:[
      {
        "icon":"../../../assets/images/icon/icon-jieshao.png",
        "persent":0,
        "title":"公司介绍"
      },{
        "icon":"../../../assets/images/icon/icon-yuanjing.png",
        "persent":0,
        "title":"公司愿景"
      },{
        "icon":"../../../assets/images/icon/icon-shiming.png",
        "persent":0,
        "title":"公司使命"
      },{
        "icon":"../../../assets/images/icon/icon-linian.png",
        "persent":0,
        "title":"经营理念"
      },{
        "icon":"../../../assets/images/icon/icon-jiazhiguan.png",
        "persent":0,
        "title":"公司价值观"
      },{
        "icon":"../../../assets/images/icon/icon-product.png",
        "persent":0,
        "title":"公司产品"
      },
    ],
    iconList:{
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png",
      share:'../../../assets/images/icon/icon-share.png'
    },
    isshare:false,
    isedit:false,
    isMine:0
  },
  //去编辑我的公司基本信息
  toEditCompanyInfo:function(){
    wx.navigateTo({
      url: '../editCompanyInfo/editCompanyInfo?id='+this.data.companyInfo.id
    })
  },
  editCompanyPreview:function (event) {
     console.log(event.currentTarget.dataset.index)
     var index = event.currentTarget.dataset.index;
     console.log('预览= '+index)

     wx.navigateTo({
      url:'../previewCompnayInfo/previewCompnayInfo?index='+index+'&companyId='+this.data.companyId
     })
  },
  // 更换公司模板
  // 更换模板
  changeCompanyTemplate:function(){
    var companyId = this.data.companyId;

    // 存一下公司信息
    wx.setStorage({
      key:'companyDesInfoKey',
      data:this.data.companyInfo
    })

    console.log('存的公司信息')
    console.log(this.data.companyInfo)
    console.log('存的公司信息')


    wx.navigateTo({
      url:'../changeCompanyTemplate/changeCompanyTemplate?id='+companyId+'&isuthentication='+this.data.isuthentication
    })
  },
  // 点击不同模块的编辑按钮去不同的编辑页面
  editCompanyBlockModel:function(event){
    console.log(event.currentTarget.dataset.index)
    var index = event.currentTarget.dataset.index;
    switch(index){
      case 0:
          // 公司介绍
          wx.navigateTo({
            url:'../companyVision/companyVision?id='+this.data.companyInfo.id+'&type=1'
          })
          break;
      case 1:
          // 公司愿景
          wx.navigateTo({
            url:'../companyVision/companyVision?id='+this.data.companyInfo.id+'&type=2'
          })
          break;
      case 2:
          // 公司使命
          wx.navigateTo({
            url:'../companyVision/companyVision?id='+this.data.companyInfo.id+'&type=3'
          })
          break;
      case 3:
          // 经营理念
          wx.navigateTo({
            url:'../companyVision/companyVision?id='+this.data.companyInfo.id+'&type=4'
          })
          break;
      case 4:
          // 公司价值观
          wx.navigateTo({
            url:'../companyVision/companyVision?id='+this.data.companyInfo.id+'&type=5'
          })
          break;
      case 5:
          // 公司产品
          wx.navigateTo({
            url: '../companyProduct/companyProduct?id='+this.data.companyInfo.id
          })
          break;
      default:

    }
  },

  // 获取公司详情数据
  getdata:function () {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    var that=this;
    wx.request({
      url: app.data.apiurl+'applets/myCompanyProfile',
      data: {companyId:that.data.companyId,userId:app.globalData.userId},
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if(res.statusCode==200){
          if(res.data.success==0){

            console.log('编辑我的公司数据是--------')
            console.log(res);
            console.log('编辑我的公司数据是--------')

            that.setData({
              companyInfo:res.data.entity.companyInfo,
              isMine:res.data.entity.isMine
            });
            console.log('---------companyInfo---------')
            console.log(that.data.companyInfo)
            console.log('---------companyInfo---------')
            that.data.companyInfo.textlogo=that.data.companyInfo.name.substring(0,2);
            console.log(that.data.companyInfo.name.substring(0,2))
            console.log(that.data.companyInfo)
            // that.setData({
            //   companyInfo:that.data.companyInfo,
            //   infoPercent:res.data.entity.infoPercent
            // })
            for(var i=0;i<that.data.dataList.length;i++){
              if(i==0){//公司介绍
                that.data.dataList[0].persent = res.data.entity.persent.introPercent
              }else if(i==1){//公司愿景
                that.data.dataList[1].persent = res.data.entity.persent.visionPercent
              }else if(i==2){//公司使命
                that.data.dataList[2].persent = res.data.entity.persent.missionPercent
              }else if(i==3){//公司使命
                that.data.dataList[3].persent = res.data.entity.persent.philosophyPercent
              }else if(i==4){//公司价值观
                that.data.dataList[4].persent = res.data.entity.persent.valuePercent
              }else if(i==5){//公司产品
                that.data.dataList[5].persent = res.data.entity.persent.productPercent
              }
            }
            that.setData({
              companyInfo:that.data.companyInfo,
              infoPercent:res.data.entity.persent.infoPercent,
              dataList:that.data.dataList
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
      //获取公司详情信息
      // wx.getStorage({
      //   key: 'companyInfoKey',
      //   success: function(res) {
      //       self.setData({
      //         companyInfo:res.data
      //       })
      //       console.log('复制是-值是')
      //       console.log(self.data.companyInfo)
      //       console.log('复制是-值是')
      //   },
      //   fail: function(res) {

      //   },
      //   complete: function(res) {

      //   }
      // });

      this.setData({
        companyId:options.id
      })



      console.log('编辑我的公司的optins')
      console.log(options)
      console.log('编辑我的公司的optins')



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
     wx.removeStorage({
        key: 'companyInfoKey',
        success: function(res) {
          console.log('删除数据完成')
          console.log(res.data)
          console.log('删除数据完成')
        },
        fail:function () {

        },
        complete:function () {

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
  // onShareAppMessage: function () {

  // }
})