var app = getApp()
Page({

  data: {

    currentPage: 1,
    currentPage2:1,
    currentPage1:1,
    totalPageSize1:1,
    totalPageSize2:1,
    currenttab: 0,
    isShowNoActive:false,
    iconList: {
      mapicon: "../../../assets/images/icon/icon-map.png",
      timeicon: "../../../assets/images/icon/icon-clock.png",
      photoWhite:"../../../assets/images/icon/icon-phone.png",
      emailWhite:"../../../assets/images/icon/icon-email.png",
      addressWhite:"../../../assets/images/icon/icon-address.png",
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png",
      mapSmall:'../../../assets/images/icon/map-small.png'
    },
    userAvatar:'../../../assets/images/icon/photobg.png',
   collectionList1: [],
   collectionList2:[],
    currClickActive:'',
    isshare:false,
    isedit:false,
    pageFrom:'collection'
  },

  goAddressDes:function (e) {
    var address = e.currentTarget.dataset.address;
    wx.navigateTo({
      url:'../companyAddressMaps/companyAddressMaps?address='+address
    })
  },
  makeCall:function (e) {
     app.makeCall(e)
  },
  toMycardDetails:function  (e){
    console.log('去名片详情')
    wx.navigateTo({
      url: '../cardDetails/cardDetails?mycardid='+e.currentTarget.dataset.mycardid+'&from='+false
    })
  },
  // 去公司详情
  goCompanyDes:function (e) {
    var id=e.currentTarget.dataset.id;
    var canChangeTemp = e.currentTarget.dataset.can;
    var isuthentication = e.currentTarget.dataset.isuthentication;
    console.log('首页进入公司详情')
    console.log(e)
    console.log('首页进入公司详情')

    wx.navigateTo({
      url: '../myCompanyDes/myCompanyDes?id='+id+'&can='+canChangeTemp+'&isuthentication='+isuthentication
    })
  },
  changetab: function (e) {
    var that= this;

    that.setData({
      currenttab: e.currentTarget.dataset.tab
    });

    if(that.data.currenttab == 0){
     if(that.data.collectionList1.length>0){
          that.setData({
            isShowNoActive:false
          })
        }else{
          that.setData({
            isShowNoActive:true
          })
      }

      if(that.data.collectionList1.length){
        return;
      }else{
        that.getdata();
      }
    }else{
        if(that.data.collectionList2.length>0){
          that.setData({
            isShowNoActive:false
          })
        }else{
          that.setData({
            isShowNoActive:true
          })
        }

      if(that.data.collectionList2.length){
          return;
        }else{
          that.getdata();
        }
    }
  },
  // 获取名片和公司收藏列表
  getdata:function () {
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/collectionList',
      data: {
        userId:app.globalData.userId,
        type: that.data.currenttab,
        currentPage: that.data.currentPage,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('名片列表请求结果');
        console.log(res);
        console.log('名片列表请求结果');
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();
        if (res.statusCode == 200) {
          if (res.data.success == 0) {
            // var list=res.data.entity.activityList;

            if(that.data.currenttab==0){
              console.log("个人名片");

              var list=res.data.entity.cardList;
              that.setData({
                collectionList1: that.data.collectionList1.concat(list),
                totalPageSize:res.data.entity.totalPageSize,
                totalPageSize1:res.data.entity.totalPageSize
              });

              if(that.data.collectionList1.length>0){
                that.setData({
                  isShowNoActive:false
                })
              }else{
                that.setData({
                  isShowNoActive:true
                })
              }
            }else{
              console.log("公司名片")
              var list=res.data.entity.companyList;
              that.setData({
                collectionList2: that.data.collectionList2.concat(list),
                totalPageSize:res.data.entity.totalPageSize,
                totalPageSize2:res.data.entity.totalPageSize
              });

              that.data.collectionList2.forEach(function(item,index,arr){
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
              collectionList2:that.data.collectionList2
            });


              console.log(that.data.collectionList2)

              if(that.data.collectionList2.length>0){
                that.setData({
                  isShowNoActive:false
                })
              }else{
                that.setData({
                  isShowNoActive:true
                })
              }
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
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();
        wx.showToast({
          title: '加载失败',
          image:'../../../assets/images/icon/error-fff.png',
          duration: 2000
        })
      },
      complete() {
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
    // 添加成功，回到这，相当于刷新页面
    // 进入详情后，如果取消收藏后立刻回来的话，得刷新
    this.setData({
      collectionList1:[],
      collectionList2:[],
       currentPage: 1,
      currentPage2:1,
      currentPage1:1,
    })
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var self = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载

      console.log('我的名片公司收藏刷新时，currtab=')
      console.log(self.data.currenttab)
      console.log('我的名片公司收藏刷新时，currtab=')


      if(self.data.currenttab == 1){//收藏公司 右边
        self.setData({
          currentPage:1,
          currentPage2:1,
          collectionList2:[]
        })
        setTimeout(function () {
          console.log('我参加的刷新---------')
          self.getdata();
        }, 1000)
      }else{//0 收藏名片，左边
         self.setData({
          currentPage:1,
          currentPage1:1,
          collectionList1:[]
        })
        setTimeout(function () {
          console.log('我组织的刷新---------')
          self.getdata();
        }, 1000)
      }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var self = this;
    console.log("页面上拉触底事件的处理函数");
    if(self.data.currenttab==1){//公司
      if(self.data.currentPage2<self.data.totalPageSize2){
        self.data.currentPage2+=1;
        self.setData({
          currentPage2:self.data.currentPage2,
          currentPage:self.data.currentPage2,
        });
        wx.showLoading({
          title: '加载中...',
          mask:true
        })
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
      console.log("当前页组织"+self.data.currentPage1);
      console.log("总页数组织"+self.data.totalPageSize1);
      if(self.data.currentPage1<self.data.totalPageSize1){
        self.data.currentPage1+=1;
        self.setData({    //公司
          currentPage1:self.data.currentPage1,
          currentPage:self.data.currentPage1
        });
         wx.showLoading({
          title: '加载中...',
          mask:true
        })
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