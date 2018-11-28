var app = getApp();
Page({
  data: {
    //真数据
    iconList:{
      mapicon:"../../../assets/images/icon/icon-map-durk.png",
      timeicon:"../../../assets/images/icon/icon-clock.png",
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png"
    },
    currClickActive:'',
    companyCardList:[],
    id:'',
    can:'',
    isuthentication:'',
    companyInfo:{},
    showMore:false,
    showText:'查看更多',
    isMine:'0',
    //是否已收藏公司
    colStatus:'0',
    // 在哪个页面标志
    hereGailan:false,
    hereWenhua:false,
    hereChanpin:false,
    hereZiyuan:false,
    hereXuqiu:false,
    hereHuodong:false,
    // 企业文化，不分页
    cultureList:[],
    //公司产品
    productList:[],
    productAllList:[],
    productCurrentPage:1,
    productPageSize:10,
    productTotalPageSize:0,
    // 资源
    demandList:[],
    demandAllList:[],
    demandCurrentPage:1,
    demandPageSize:10,
    demandTotalPageSize:0,
    //需求
    supplyList:[],
    supplyAllList:[],
    supplyCurrentPage:1,
    supplyPageSize:10,
    supplyTotalPageSize:0,
    // 活动
    activityList:[],
    activityAllList:[],
    activeCurrentPage:1,
    activePageSize:10,
    activeTotalPageSize:0,

    navTab:["概览","文化/产品","供需/活动"],
    currentNavtab: "0",
    productCurrentNavtab: "1",
    supplyCurrentNavtab:"0",

    isShowNoActive:false,
    isShowNoSupply:false,
    isShowNoResource:false

  },
  // 查看公司位置地图
  seeAddressOnMap:function(){
     wx.navigateTo({
      url: '../companyAddressMaps/companyAddressMaps',
      success: res => {

      },
      fail: res => {

      },
      complete: res => {

      }
    })
  },
   // 去编辑我的公司
  // goEditCompany:function(){
  //     wx.setStorage({
  //       key:'companyInfoKey',
  //       data:this.data.companyInfo
  //     })

  //   wx.navigateTo({
  //     url: '../editMyCompany/editMyCompany'
  //   })
  // },
  // 查看等多
  seemore:function () {
    this.setData({
      showMore:!this.data.showMore
    })
   if(this.data.showMore){
      this.setData({
        showText:'收起'
      })
   }else{
     this.setData({
        showText:'查看更多'
      })
   }
  },
  // 收藏公司操作
  collectionInPackage:function () {
  // 收藏到名片夹或者取消收藏
    var that=this;
    var userId = app.globalData.userId;
    if(!app.globalData.userId||app.globalData.userId==-1){
      wx.redirectTo({
        url: "../../logIn/phone/phone"
      });
    }else{
      wx.showLoading({
        title: '加载中',
        mask:true
      })
      wx.request({
        url: app.data.apiurl+'applets/addCollection',
        data: {
          user_id:userId,
          object_id:that.data.id,
          // 名片
          type:'1',
          // 0是添加到收藏
          colStatus:that.data.colStatus
        },
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res);
          if(res.statusCode==200){
            if(res.data.success==0){
              var title = ''
              if(that.data.colStatus == '0'){
                  title="已收藏"
              }else{
                title="已取消"
              }
              wx.showToast({
                title:title,
                mask:true,
                duration:1000
              })
              setTimeout(function () {
                that.getdata();
              },1000)
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
        }
      });
    }

  },

  goAddressDes:function (e) {
    var address = e.currentTarget.dataset.address;
    wx.navigateTo({
      url:'../companyAddressMaps/companyAddressMaps?address='+address
    })
  },
  // 去所有员工页面
  goAllStaff:function(){
    // 得把公司id传过去，根据id请求员工数据
    var companyId = this.data.id;
    var companyName = this.data.companyInfo.name;
    var isuthentication = this.data.isuthentication;
    var peopelenumber = this.data.companyInfo.employee;
    if(!app.globalData.userId||app.globalData.userId==-1){
      wx.redirectTo({
        url: "../../logIn/phone/phone"
      });
    }else{
      wx.navigateTo({
         url: '../../maillist/allstaff/allstaff?id='+companyId+'&isuthentication='+isuthentication+'&companyName='+companyName+"&peopelenumber="+peopelenumber
      })
    }
    // wx.redirectTo({
    //   url: '../../maillist/allstaff/allstaff?id='+companyId+'&isuthentication='+isuthentication+'&companyName='+companyName+"&peopelenumber="+peopelenumber
    // })
  },
  // 去商会详情
  goShanghuiDetails:function (e) {
    if(!app.globalData.userId||app.globalData.userId==-1){
      wx.redirectTo({
        url: "../../logIn/phone/phone"
      });
    }else{
      wx.navigateTo({
        url:"../../maillist/commerceDetails/commerceDetails?cocid="+e.currentTarget.dataset.cocid
      })
    }
  },
  lower:function () {
      console.log('lower')
  },
 switchTab: function(e){
   var index = e.currentTarget.dataset.idx
    this.setData({
      currentNavtab: index
    });
    switch(index){
      case 0:
      this.setData({
        hereGailan:true,
        hereWenhua:false,
        hereChanpin:false,
        hereZiyuan:false,
        hereXuqiu:false,
        hereHuodong:false,
      })
        break;
      case 1:
      console.log('点击了文化产品')

      if(!this.data.hereChanpin){
        this.setData({
          hereGailan:false,
          hereWenhua:true,
          hereChanpin:false,
          hereZiyuan:false,
          hereXuqiu:false,
          hereHuodong:false,
        })

       }
      // 加载文化和公司产品数据
      this.getWenhuaData();//文化
      this.getProductData();//产品
        break;
      case 2:
        console.log('点击了供需活动')
        if(!this.data.hereXuqiu && !this.data.hereHuodong){
            this.setData({
              hereGailan:false,
              hereWenhua:false,
              hereChanpin:false,
              hereZiyuan:true,
              hereXuqiu:false,
              hereHuodong:false,
            })
            console.log('this.data.hereChanpin')
       }

       if(!this.data.hereZiyuan && !this.data.hereHuodong){
            this.setData({
              hereGailan:false,
              hereWenhua:false,
              hereChanpin:false,
              hereZiyuan:false,
              hereXuqiu:true,
              hereHuodong:false,
            })
            console.log('this.data.hereChanpin')
       }

     if(!this.data.hereZiyuan && !this.data.hereXuqiu){
            this.setData({
              hereGailan:false,
              hereWenhua:false,
              hereChanpin:false,
              hereZiyuan:false,
              hereXuqiu:false,
              hereHuodong:true,
            })
            console.log('this.data.hereChanpin')
       }
       // 清空数据和回复默认页数
       this.setData({
        demandList:[],
        demandAllList:[],

        supplyList:[],
        supplyAllList:[],

        activityList:[],
        activityAllList:[],

        demandCurrentPage:1,
        supplyCurrentPage:1,
        activeCurrentPage:1
       })
        // 加载资源数据
        this.getResourceData(0);
        // 加载需求数据
        this.getSupplyData();
        // 加载活动数据
        this.getActiveData();
        break;
      default:
    }
  },
    // 文化/产品切换
  swicthPoductTab:function(e){
    this.setData({
      productCurrentNavtab: e.currentTarget.dataset.select
    });
      var index = e.currentTarget.dataset.select;
      switch(index){
        case 0:
          // 公司产品
        this.setData({
          hereGailan:false,
          hereWenhua:false,
          hereChanpin:true,
          hereZiyuan:false,
          hereXuqiu:false,
          hereHuodong:false,
        })
        break;

        case 1:
          // 企业文化
        this.setData({
          hereGailan:false,
          hereWenhua:true,
          hereChanpin:false,
          hereZiyuan:false,
          hereXuqiu:false,
          hereHuodong:false,
        })
        break;
      }
  },
  // 资源、需求、活动切换
  swicthsupplyTab:function(e){
    this.setData({
      supplyCurrentNavtab: e.currentTarget.dataset.supplyselect
    });
    var index =  e.currentTarget.dataset.supplyselect ;
    switch(index){
        case 0:
        console.log("点击了资源")
         this.setData({
          hereGailan:false,
          hereWenhua:false,
          hereChanpin:false,
          hereZiyuan:true,
          hereXuqiu:false,
          hereHuodong:false,
        })
        break;
        case 1:
          console.log("点击了需求")
          this.setData({
            hereGailan:false,
            hereWenhua:false,
            hereChanpin:false,
            hereZiyuan:false,
            hereXuqiu:true,
            hereHuodong:false,
          })
        break;
        case 2:
          console.log("点击了活动")
          this.setData({
            hereGailan:false,
            hereWenhua:false,
            hereChanpin:false,
            hereZiyuan:false,
            hereXuqiu:false,
            hereHuodong:true,
          })
        break;
    }
  },
  // 企业文化数据
  getWenhuaData:function () {
    wx.showLoading({
        title: '加载中',
        mask:true
    })
    var that=this;
    wx.request({
      url: app.data.apiurl+'applets/companyCulture',
      data: {
        companyId:that.data.id
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.hideLoading({
          title: '加载中'
        })
        if(res.statusCode==200){
          if(res.data.success==0){
            console.log('企业文化数据是--------')
            console.log(res);
            console.log('企业文化数据是--------')
            that.setData({
              cultureList:res.data.entity.culture
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
        wx.hideLoading({
          title: '加载中'
        })
        wx.showToast({
          title: '加载失败',
          image:'../../../assets/images/icon/error-fff.png',
          duration: 2000
        })
      }
    })
  },
  // 公司产品数据
  getProductData:function () {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    var that=this;
    wx.request({
      url: app.data.apiurl+'applets/myCompanyProductList',
      data: {
        companyId:that.data.id,
        currentPage:that.data.productCurrentPage,
        pageSize:that.data.productPageSize
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if(res.statusCode==200){
          if(res.data.success==0){

            console.log('公司产品数据是--------')
            console.log(res);
            console.log('请公司产品数据是--------')

            that.setData({
              productList:res.data.entity.productList
            });
            var tempArr = res.data.entity.productList;
            for(var i=0;i<tempArr.length;i++){
              that.data.productAllList.push(tempArr[i])
            }
            that.setData({
              productList:tempArr,
              productTotalPageSize:res.data.entity.totalPageSize
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
  // 获取资源数据
  getResourceData:function () {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    var that=this;
    wx.request({
      // http://cloud.hopechina.cc/applets/myDemand
      url: app.data.apiurl+'applets/companyDemand',
      data: {
        userId:app.globalData.userId,
        companyId:that.data.id,
        sadType:0,//资源
        currentPage:that.data.demandCurrentPage,
        pageSize:that.data.demandPageSize
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if(res.statusCode==200){
          if(res.data.success==0){
            console.log('资源数据是--------')
            console.log(res);
            console.log('资源数据是--------')
            var tempArr = res.data.entity.demandList;
            tempArr.forEach(function(item, index, arr){
               item.laseTime=app.getTimeDifference(item.createTime);
                that.data.demandAllList.push(item)
            })
            that.setData({
              demandList: that.data.demandAllList,
              demandTotalPageSize:res.data.entity.totalPageSize
            });
            if(that.data.demandList.length){
              that.setData({
                isShowNoResource:false
              })
            }else{
              that.setData({
                isShowNoResource:true
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
          mask:true
        })
      }
    })
  },
  //获取需求列表
  getSupplyData:function () {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    var that=this;
    wx.request({
      url: app.data.apiurl+'applets/companyDemand',
      data: {
        userId:app.globalData.userId,
        companyId:that.data.id,
        sadType:1,//需求
        currentPage:that.data.supplyCurrentPage,
        pageSize:that.data.supplyPageSize
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if(res.statusCode==200){
          if(res.data.success==0){

            wx.hideLoading();

            console.log('需求数据是--------')
            console.log(res);
            console.log('需求数据是--------')
           var tempArr = res.data.entity.demandList;
            tempArr.forEach(function(item, index, arr){
             item.laseTime=app.getTimeDifference(item.createTime);
             that.data.supplyAllList.push(item)
            })

            that.setData({
              supplyList:that.data.supplyAllList,
              supplyTotalPageSize:res.data.entity.totalPageSize
            });

            if(that.data.supplyList.length){
              that.setData({
                isShowNoSupply:false
              })
            }else{
              that.setData({
                isShowNoSupply:true
              })
            }

          }else{
            wx.hideLoading();
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
          mask:true
        })
      }
    })
  },
  // 获取活动数据
  getActiveData:function () {
    wx.showLoading({
      title: '加载中',
    })
    var that=this;
    var app = getApp();
    var userId = app.globalData.userId;
    wx.request({
      url: app.data.apiurl+'applets/companyActivityList',
      data: {
        companyId:that.data.id,
        currentPage:that.data.activeCurrentPage,
        pageSize:that.data.activePageSize
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if(res.statusCode==200){
          console.log('活动数据')
          console.log(res)
          console.log('活动数据')
          if(res.data.success==0){

            var tempArr = res.data.entity.activityList;


            tempArr.forEach(function(item, index, arr){
              item.activityState=app.setState(item.createTime,item.endTime);
            })

            for(var i=0;i<tempArr.length;i++){
              that.data.activityAllList.push(tempArr[i])
            }

            that.setData({
              activityList:that.data.activityAllList,
              activeTotalPageSize:res.data.entity.totalPageSize
            });

            if(that.data.activityList.length){
              that.setData({
                isShowNoActive:false
              })
            }else{
              that.setData({
                isShowNoActive:true
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
          mask:true
        })
      }
    })
  },

  // 公司详情页面
  getdata:function () {
    wx.showLoading({
      title: '加载中'
    })
    var that=this;
    wx.request({
      url: app.data.apiurl+'applets/myCompanyInfo',
      data: {companyId:that.data.id,userId:app.globalData.userId},
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if(res.statusCode==200){
          if(res.data.success==0){
            console.log("公司详情数据----");
            console.log(res.data);
            console.log(res.data.entity.isMine)
            console.log("公司详情数据----");
            that.setData({
              companyInfo:res.data.entity.companyInfo,
              bgId:res.data.entity.companyInfo.bgId,
              colStatus:res.data.entity.colStatus,
              isMine:res.data.entity.isMine
            });
            that.data.companyInfo.textlogo=that.data.companyInfo.name.substring(0,2);
            that.data.companyInfo.fontsize='font34';
              if(that.data.companyInfo.name.length>30){
                that.data.companyInfo.fontsize='font'+Math.floor(544*2/(that.data.companyInfo.name.length+1));
              }
            that.setData({
              companyInfo:that.data.companyInfo
            });
            wx.setNavigationBarTitle({
              title: that.data.companyInfo.name
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
  // 更换模板
  changeCompanyTemplate:function(){
    var companyId = this.data.id;

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

  shareInfoClick:function () {
      console.log('分享企业信息')
  },
  getCompanyList(){
    var that=this;
    wx.request({
      url: app.data.apiurl+'applets/main',
      data: {userId:app.globalData.userId},
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res);
        if(res.statusCode==200){
          console.log(res.data)
          if(res.data.success==0){
            that.setData({
              companyCardList:res.data.entity.companyInfo
            });
            console.log("for****************");
            that.data.companyCardList.forEach(function(item,index,arr){
              console.log("item======");
              console.log(that.data.id);
              console.log(item.id);
              console.log(that.data.id==item.id);
              if(that.data.id==item.id){
                console.log("进入条件");
                that.setData({can:'can'});
              }
            })
            console.log(that.data.can);
            console.log(that.data.companyCardList);
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
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this;
    // 页面一进来就是概览页面
    self.getCompanyList();
    self.setData({
      hereGailan:true
    })

    console.log('公司详情---options')
    console.log(options)
    console.log('公司详情---options')

    if(options){
      if(options.can == 'can'){
          self.setData({
            can:options.can
          })
      }else{
        self.setData({
          can:''
        })
      }
      if(options.id){
        self.setData({
          id:options.id
        })
      }
      if(options.isuthentication){

        console.log('商会过来的')
        console.log(options)
        console.log('商会过来的')

          self.setData({
            isuthentication:options.isuthentication
          })
      }

       if(options.scene){
          var scene = decodeURIComponent(options.scene)
          console.log(options.scene);
          console.log(scene);
          self.setData({
            id: options.scene
          });
        }


    }
    console.log(self.data.can)
    console.log(self.data.id)
  },
  // 根据是不是我的公司，进入不同的资源详情页面
  goResourceDetails:function (e) {
      var resourceId = e.currentTarget.dataset.id;
      var hasownmess = e.currentTarget.dataset.hasownmess;
      console.log('根据 can 来进入')
      console.log(this.data.can)
      console.log('根据 can 来进入')
      if(!app.globalData.userId||app.globalData.userId==-1){
        wx.redirectTo({
          url: "../../logIn/phone/phone"
        });
      }else{
        if(this.data.can == 'can'){
          wx.navigateTo({
            url:'../myResourceDetails/myResourceDetails?resourceId='+resourceId
          })
       }else{
        // 要把该条数据详情存一下
         app.data.supplyDetailsData=this.data.demandList[e.currentTarget.dataset.index];
        wx.navigateTo({
          url:'../../supply/supplyDetails/supplyDetails?id='+resourceId+'&hasownmess='+hasownmess
        })
       }
      }
  },
  // 根据是不是我的公司，进入不同的需求详情页面
  goSupplyDetails:function (e) {
    var supplyId = e.currentTarget.dataset.id;
    var hasownmess = e.currentTarget.dataset.hasownmess;
    console.log('公司详情-供需')
    console.log(e)
    console.log('公司详情-供需')
    if(!app.globalData.userId||app.globalData.userId==-1){
        wx.redirectTo({
          url: "../../logIn/phone/phone"
        });
      }else{
        if(this.data.can == 'can'){
          wx.navigateTo({
            url:'../myDemandDetails/myDemandDetails?demandId='+supplyId
          })
        }else{
          app.data.supplyDetailsData=this.data.supplyList[e.currentTarget.dataset.index];
          wx.navigateTo({
            url:'../../supply/supplyDetails/supplyDetails?id='+supplyId+'&hasownmess='+hasownmess
          })
        }
      }
  },
   //根据是不是我的公司，进入不同的活动详情页面
  goMyCompanyAvtiveDes:function (e) {
    // data-activityId
    var activityId = e.currentTarget.dataset.activityid;
    var activityitem = e.currentTarget.dataset.activityitem;
    if(!app.globalData.userId||app.globalData.userId==-1){
      wx.redirectTo({
        url: "../../logIn/phone/phone"
      });
    }else{
      this.setData({
        currClickActive:activityitem
      });
      app.currClickActive=this.data.currClickActive;
      if(this.data.can=='can'){
        wx.navigateTo({
          url:'../myActiveDetails/myActiveDetails?activityId='+activityId
        })
      }else{
        // wx.setStorageSync('activityDetailsInfo', activityitem)
        wx.navigateTo({
          url:'../../activity/activityDetails/activityDetails?activityId='+activityId
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   console.log('onReady')
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
    console.log('onHide')
    /*if(!app.globalData.userId||app.globalData.userId==-1){
      wx.redirectTo({
        url: "../../logIn/phone/phone"
      });
    }*/
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  console.log('onUnload')
    /*if(!app.globalData.userId||app.globalData.userId==-1){
      wx.redirectTo({
        url: "../../logIn/phone/phone"
      });
    }*/
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  console.log('onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var self=this;
    console.log('onReachBottom')
    // 判断在哪个页面，分别加载不同的数据

     if(self.data.hereGailan){
        console.log('在概览页面')
     }if(self.data.hereWenhua){

        console.log('在文化页面')

     }if(self.data.hereChanpin){
        console.log('在产品页面')
        //获取到当前第几页，每次下拉就++
        var nowPage = self.data.productCurrentPage;
         if(nowPage<self.data.productTotalPageSize){
            nowPage++;
            self.setData({
              productCurrentPage:nowPage
            })
            // 显示正在加载
            wx.showLoading({
              title: '加载中...',
              mask:true
            })
            setTimeout(function(){
              wx.hideLoading();
              self.getProductData();
            }, 1000)
         }else{
            wx.showToast({
              title: '没有更多数据',
              icon: 'success',
              duration: 1000
            })
         }

     }if(self.data.hereZiyuan){

        console.log('在资源页面')
        //获取到当前第几页，每次下拉就++
        var nowPage = self.data.demandCurrentPage;
         if(nowPage<self.data.demandTotalPageSize){
            nowPage++;
            self.setData({
              demandCurrentPage:nowPage
            })
            // 显示正在加载
            wx.showLoading({
              title: '加载中...',
              mask:true
            })
            setTimeout(function(){
              wx.hideLoading();
              self.getResourceData();
            }, 1000)
         }else{
            wx.showToast({
              title: '没有更多数据',
              icon: 'success',
              duration: 1000
            })
         }


     }if(self.data.hereXuqiu){
        console.log('在需求页面')
        //获取到当前第几页，每次下拉就++
        var nowPage = self.data.supplyCurrentPage;

        console.log('需求的-nowpage')
        console.log(nowPage)
        console.log('需求的-nowpage')

        console.log('需求的-supplyTotalPageSize')
        console.log(self.data.supplyTotalPageSize)
        console.log('需求的-supplyTotalPageSize')

         if(nowPage<self.data.supplyTotalPageSize){
            nowPage++;
            self.setData({
              supplyCurrentPage:nowPage
            })
            // 显示正在加载
            wx.showLoading({
              title: '加载中...',
              mask:true
            })
            setTimeout(function(){
              wx.hideLoading();
              self.getSupplyData();
            }, 1000)
         }else{
            wx.showToast({
              title: '没有更多数据',
              icon: 'success',
              duration: 1000
            })
         }


     }if(self.data.hereHuodong){
        console.log('在活动页面')
        //获取到当前第几页，每次下拉就++
        var nowPage = self.data.activeCurrentPage;
         if(nowPage<self.data.activeTotalPageSize){
            nowPage++;
            self.setData({
              activeCurrentPage:nowPage
            })
            // 显示正在加载
            wx.showLoading({
              title: '加载中...',
              mask:true
            })
            setTimeout(function(){
              wx.hideLoading();
              self.getActiveData();
            }, 1000)
         }else{
            wx.showToast({
              title: '没有更多数据',
              icon: 'success',
              duration: 1000
            })
         }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var id = this.data.id;
    return {
      title: '分享给您的名片,请惠存',
      path: 'pages/mine/myCompanyDes/myCompanyDes?id='+id
    }
  }
})