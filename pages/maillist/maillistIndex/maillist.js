// pages/maillist/maillist.js
var app=getApp();
Page({
  data: {
    windowHeight:'',
    windowWidth:'',
    currenttab:1,
    currentPage:1,
    companyCurrentPage:1,
    cocCurrentPage:1,
    totalPageSize:1,
    companytotalPageSize:1,
    coctotalPageSize:1,
    searchname:'',
    iconList:{
      photo:"../../../assets/images/icon/icon-phone-gray.png",
      email:"../../../assets/images/icon/icon-email-gray.png",
      position:"../../../assets/images/icon/icon-map.png",
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png"
    },
    hotCompanyList:[],
    qualityEnterprise:[],
    qualityCC:[],
    industry:'',
  },
  searchIndustry(e){
    var industryId = e.currentTarget.dataset.id;
    var industryName=e.currentTarget.dataset.name;
   wx.navigateTo({
      url: '../searchCompanyWithIndustry/searchCompanyWithIndustry?industryId='+industryId+"&industryName="+industryName
    })
  },

  getdata(){

    var that=this;
    wx.showLoading({
      title: '加载中',
      mask:true
    });
    wx.request({
      url: app.data.apiurl+'applets/allCocList',
      data: {type:that.data.currenttab,currentPage:that.data.currentPage,
        isHighQuality:1,pageSize:10},
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(that.data.industry);
        wx.hideLoading({
          title: '加载中'
        })
        if(res.statusCode==200){
          if(res.data.success==0){
            if(that.data.currenttab==2){//商会
              console.log("商会原始数据");
              console.log(res)
              console.log("商会原始数据");
              if(res.data.entity.cocList){
                that.setData({
                  qualityCC:that.data.qualityCC.concat(res.data.entity.cocList),
                  totalPageSize:res.data.entity.totalPageSize,
                  coctotalPageSize:res.data.entity.totalPageSize
                });
              }

              console.log('xxxxx商会数据')
              console.log(that.data.qualityCC)
              console.log('xxxxx商会数据')

              //这一段导致商会空白
               that.data.qualityCC.forEach(function(item,index,arr){
                item.textlogo=item.name.substring(0,2);
                // 有http前缀
                if(item.logo&&item.logo.indexOf('http') == -1){
                  item.logo='https://static.upedu.cc/'+item.logo;
                }
              });
               that.setData({
                qualityCC:that.data.qualityCC
              });

               console.log('处理好的商会数据')
               console.log(that.data.qualityCC)
               console.log('处理好的商会数据')
            }else{
              console.log("公司");
              that.setData({
                qualityEnterprise:that.data.qualityEnterprise.concat(res.data.entity.companyList),
                hotIndustryList:res.data.entity.hotIndustryList,
                totalPageSize:res.data.entity.totalPageSize,
                companytotalPageSize:res.data.entity.totalPageSize
              });

              that.data.qualityEnterprise.forEach(function(item,index,arr){
                item.textlogo=item.name.substring(0,2);
                console.log(item.name)
                console.log(item.name.length)
                item.fontsize='font34';
                if(item.name.length>30){
                  item.fontsize='font'+Math.floor(544*2/(item.name.length+1));
                  console.log(item.fontsize)
                }
                 // 有http前缀
                if(item.logo&&item.logo.indexOf('http') == -1){
                  item.logo='https://static.upedu.cc/'+item.logo;
                }
              });
              that.setData({
                qualityEnterprise:that.data.qualityEnterprise
              });

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
        wx.hideLoading({
          title: '加载中'
        })
        wx.showToast({
          title: '加载失败',
          image:'../../../assets/images/icon/error-fff.png',
          duration: 2000
        })
      },
      complete(){
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();
      }
    })
  },
  seeAddressOnMap:function(){
     wx.navigateTo({
      url: '../../companyAddressMaps/companyAddressMaps'
    })
  },
  clickTab(e){
    this.setData({
      currenttab:e.currentTarget.dataset.currenttab,
    });
    console.log(this.data.currenttab);
    if(this.data.currenttab==2){//商会
      console.log("商会");
      this.setData({
        currentPage:this.data.cocCurrentPage
      });
      if(this.data.cocCurrentPage==1&&this.data.qualityCC.length==0){
        this.getdata();
        console.log('---------------clickTab==2 getdata-----------------')
      }

      // 罗2 maillistpage
      wx.setStorageSync('currentpage',{
        currenttab:2,
        currentpage:'maillistpage'
     });

    }else{
      console.log("公司");
      this.setData({    //公司
        currentPage:this.data.companyCurrentPage
      });
      if(this.data.companyCurrentPage==1&&this.data.qualityEnterprise.length==0){
        this.getdata()
        console.log('---------------clickTab==1 getdata-----------------')
      }

         // 罗2 maillistpage
      wx.setStorageSync('currentpage',{
          currenttab:1,
          currentpage:'maillistpage'
       });


    }
  },
  toSearch(e){
    wx.navigateTo({
      url: "../../commenPage/searchPage/searchPage?storageKey="+e.currentTarget.dataset.storagekey+'&currenttab='+this.data.currenttab,
      success: res => {

      },
      fail: res => {

      },
      complete: res => {

      }
    })
  },
  // 商会详情
  toCommerceDetails(e){
    wx.navigateTo({
      url: "../commerceDetails/commerceDetails?cocid="+e.currentTarget.dataset.cocid
    })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function( e ) {
    console.log("通讯录onshow");

    // 罗 注掉 测试商会空白bug
      this.setData({
        currentPage:1,
        companyCurrentPage:1,
        cocCurrentPage:1,
        qualityEnterprise:[],
        qualityCC:[],
        searchname:''
      });

     var that=this;
      wx.getStorage({
        key: 'currentpage',
        success: function (res) {

          if(res.data.currentpage=='maillistpage'){
            that.setData({
              currenttab: res.data.currenttab
            })

          }else{
            that.setData({
              currenttab: 1
            })
          }

          that.getdata();
        },
        fail: function (res){

          that.setData({
            currenttab: 1
          });

          that.getdata();
        }
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')

    // 不用清除，要不进入详情回来就没有缓存数据了

    // wx.removeStorage({
    //   key: 'currentpage',
    //   success: function (res) {
    //     console.log("清除缓存活动详情")
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload')
    wx.removeStorage({
      key: 'currentpage',
      success: function (res) {
        console.log("清除缓存活动详情")
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
     var self=this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
      console.log('通讯录刷新时，currtab=')
      console.log(self.data.currenttab)
      console.log('通讯录刷新时，currtab=')
      if(self.data.currenttab == 2){//商会
          self.setData({
            cocCurrentPage:1,
            currentPage:1,
            qualityCC:[]
          })
          setTimeout(function () {
            console.log('商会刷新---------')
            self.getdata();
          }, 1000)
      }else{//1 公司
        self.setData({
          companyCurrentPage:1,
          currentPage:1,
          qualityEnterprise:[]
        })
        setTimeout(function () {
          console.log('公司刷新---------')
          self.getdata();
        }, 1000)
      }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("页面上拉触底事件的处理函数");
    console.log(this.data.currenttab);
    if(this.data.currenttab==2){//商会
      console.log("当前页"+this.data.cocCurrentPage);
      console.log("总页数"+this.data.coctotalPageSize);
      if(this.data.cocCurrentPage<this.data.coctotalPageSize){
        this.data.cocCurrentPage+=1;
        this.setData({
          cocCurrentPage:this.data.cocCurrentPage,
          currentPage:this.data.cocCurrentPage,
        });

         wx.showLoading({
          title: '加载中...',
          mask:true
        })
         var self=this;
        setTimeout(function(){
          wx.hideLoading();
          self.getdata();
        }, 1000)
      }else{
          wx.showToast({
            title: '没有更多数据',
            icon: 'success',
            duration: 1000
          })
       }
    }else{
      console.log("当前页"+this.data.companyCurrentPage);
      console.log("总页数"+this.data.companytotalPageSize);
      if(this.data.companyCurrentPage<this.data.companytotalPageSize){
        this.data.companyCurrentPage+=1;
        this.setData({    //公司
          companyCurrentPage:this.data.companyCurrentPage,
          currentPage:this.data.companyCurrentPage
        });

        wx.showLoading({
          title: '加载中...',
          mask:true
        })
        var self=this;
        setTimeout(function(){
          wx.hideLoading();
          self.getdata();
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

  }
})