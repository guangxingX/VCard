// pages/mine/addCompany/addCompany.js
var app = getApp();
Page({
  data: {
    searchstep1:true,
    searchstep2:false,
    searchstep3:false,
    addCompanyListHistory:[],
    searchCompanykey:'',
    isFixed:false,
    hiddenSearchBtn:false,
    isShowFooter:false,
    isShowDeepFooter:false,
    rzCurrentPage:1,
    prevpage:'',
    iconList:{
      photo:"../../../assets/images/icon/icon-phone-gray.png",
      email:"../../../assets/images/icon/icon-email-gray.png",
      position:"../../../assets/images/icon/icon-address-gray.png",
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png"
    },
    hotCompany:[],
    rzCompanyList:[],
    depthCompanyList:{},
    depthcompanyInfo:{},
    cardId:'',
    focus:true,
    isFocus:false,
    rzCompanyIndex:''
  },
  clickhistory(e){
    this.setData({searchCompanykey:this.data.addCompanyListHistory[e.currentTarget.dataset.index]});
    this.beginSerch();
  },
  clearSearch(){
    this.setData({searchCompanykey:'',searchstep1:true,searchstep2:false,searchstep3:false})
  },
clearhistory:function () {
    var self=this;
     wx.showModal({
      title: '提示',
      content: '删除后不可恢复!',
      success: function(res) {
        if(res.confirm){
           wx.setStorage({
            key:'addCompanyListHistory',
            data:[]
          })
          self.setData({
           hiddenSearchBtn:true,
           addCompanyListHistory:[],
            searchstep1:false
          })
        }else if(res.cancel){}
    }
  })
},

  // 点击选择
  clickRzSelect:function (e) {
    this.setData({rzCompanyIndex:e.currentTarget.dataset.index});
    // var index = event.currentTarget.dataset.index;
    console.log("点击了"+e.currentTarget.dataset.index)
    this.data.rzCompanyList.forEach(function(item,index,arr){
      if(index==e.currentTarget.dataset.index){
        item.selectIco=true;
        console.log(item);
      }else{
        item.selectIco=false;
      }
    });
    this.setData({rzCompanyList:this.data.rzCompanyList});
    console.log(this.data.rzCompanyList);
  },
  clickQccSelect(e){
    this.setData({qccCompanyIndex:e.currentTarget.dataset.index});
    this.data.depthCompanyList.result.forEach(function(item,index,arr){
      if(index==e.currentTarget.dataset.index){
        item.selectIco=true;
      }else{
        item.selectIco=false;
      }
    });
    this.setData({depthCompanyList:this.data.depthCompanyList});
  },
  getHistory:function () {
    var self=this;
    wx.getStorage({
      // 注释代码是异步获取
      key:'addCompanyListHistory',
      success:function (res) {
          self.setData({
            addCompanyListHistory:res.data
          })
      },
      fail:function (res) {
        console.log('走了fail')
        if(res.data == null || res.data.length==0 ||res.data==undefined){
          //无缓存
          wx.setStorage({
            key:'addCompanyListHistory',
            data:[],
            success:function () {
              wx.getStorage({
                key:'history',
                success:function (res ) {
                  // 创建成功，返回新创建的缓存数据
                  self.setData({
                     addCompanyListHistory:res.data
                  })
                },
                fail:function () {

                }
              })
            },
          })
        }
      }
    })
  },
  // 开始搜索
  beginSerch:function (e) {
    var that=this;
    if(!that.data.searchCompanykey){
      wx.showToast({
        title:'请输入搜索内容',
        duration:1000
      })
      return;
    }
    that.setData({searchstep1:false,searchstep3:false,rzCompanyList:[]});
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    wx.request({
      url: app.data.apiurl+'applets/allCocList',
      data: {name:that.data.searchCompanykey,type:1,currentPage:that.data.rzCurrentPage},
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res);
        if(res.statusCode==200){
          if(res.data.success==0){
            console.log('搜索的公司数据')
            console.log(res.data.entity);
            console.log('搜索的公司数据')
              var list=res.data.entity.companyList;
              if(list.length>0){
                that.setData({
                  isShowFooter:true
                })
              }else{
                that.setData({
                  isShowFooter:false
                })
              }
              list.forEach(function(item,index,arr){
                item.textlogo=item.name.substring(0,2);
                item.fontsize='font34';
                if(item.name&&item.name.length>30){
                  item.fontsize='font'+Math.floor(470*2/(item.name.length+1));
                }
              });
              that.setData({
                rzCompanyList:that.data.rzCompanyList.concat(list),
                reTotalPageSize:res.data.entity.totalPageSize,
                searchstep2:true
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
    });
   if(e&&e.detail.value){
      console.log("搜索框搜索");
      this.data.addCompanyListHistory.forEach(function(item, index, arr){
        if(e.detail.value==item){
          arr.splice(index,1);
        }
      })
      this.data.addCompanyListHistory.unshift(e.detail.value);
      this.setData({addCompanyListHistory:this.data.addCompanyListHistory});
      console.log(this.data.addCompanyListHistory)
      wx.setStorage({
        key:'addCompanyListHistory',
        data:this.data.addCompanyListHistory
      })
    }else{
      console.log("点击搜索");
      that.data.addCompanyListHistory.forEach(function(item, index, arr){
        if(that.data.searchCompanykey==item){
          arr.splice(index,1);
        }
      })
      that.data.addCompanyListHistory.unshift(that.data.searchCompanykey);
      that.setData({addCompanyListHistory:that.data.addCompanyListHistory});
      wx.setStorage({
        key:'addCompanyListHistory',
        data:this.data.addCompanyListHistory
      })
    }
  },
  depthSearch(){
    this.setData({searchstep2:false,searchstep1:false,searchstep3:true})
    var that=this;
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    wx.request({
      url: app.data.apiurl+'applets/moreCompanyList',
      data: {type:1,name:that.data.searchCompanykey},
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res);
        if(res.statusCode==200){
          console.log(res.data.entity);

          that.setData({
            depthCompanyList:JSON.parse(res.data.entity)
          });
          that.data.depthCompanyList.result.forEach(function(item,index,arr){
            if(item.organization_name){
              item.textlogo=item.organization_name.substring(0,2);
            }
            item.fontsize='font34';
            if(item.organization_name&&item.organization_name.length>30){
              item.fontsize='font'+Math.floor(470*2/(item.organization_name.length+1));
            }
            if(item.establish_date){
              item.simplifyTime = item.establish_date.substring(0,10)
            }
          });
          that.setData({
            depthCompanyList:that.data.depthCompanyList
          });

          console.log('深度搜索结果')
          console.log(that.data.depthCompanyList.result.length)
          console.log(that.data.depthCompanyList.result)
          console.log('深度搜索结果')

          if(that.data.depthCompanyList.result.length>0){
            that.setData({
              isShowDeepFooter:true
            })
            console.log("that.data.isShowDeepFooter")
            console.log(that.data.isShowDeepFooter)
            console.log("that.data.isShowDeepFooter")
          }else{
            that.setData({
              isShowDeepFooter:false
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
    });
  },
  // 输入框获取到焦点，要显示历史记录
  onfocus:function () {
    var self=this;
    self.setData({searchstep2:false,searchstep1:true,searchstep3:false})
    self.getHistory();
    // 获取数据长度
    var length = self.data.addCompanyListHistory
    if(length<=0){
      //隐藏清空历史记录按钮
      self.setData({
        hiddenSearchBtn:true
      })
    }else{
       self.setData({
        hiddenSearchBtn:false
      })
    }

    if(length>=11){
      console.log('>=11')
      self.setData({
        isFixed:true
      })
    }else{
      console.log('else 11')
      self.setData({
        isFixed:false
      })
    }

    self.setData({
      isFocus:true,
      focus:true
    })

    wx.getSystemInfo({

  success: function(res) {
    console.log('搜索框获取到焦点')
      console.log(res.model)
      console.log(res.pixelRatio)
      console.log(res.windowWidth)
      console.log(res.windowHeight)
      console.log(res.language)
      console.log(res.version)
      console.log(res.platform)
    console.log('搜索框获取到焦点')

    // 是ios版本
    if(res.platform.indexOf('ios') != -1){
      console.log('ios版本')
      var temp = '43%'
        self.setData({
          bottom:temp
        })
    }else{
      console.log('其它版本')
      // 其它版本
      var temp = '48%'
      self.setData({
        bottom:temp
      })
    }



  },
  fail:function () {

  },
  complete:function () {}

})


  },

    onblur:function () {

      this.setData({
        isFocus:false,
        bottom:0
      })

      wx.getSystemInfo({
        success: function(res) {
          console.log('失去焦点')
            console.log(res.model)
            console.log(res.pixelRatio)
            console.log(res.windowWidth)
            console.log(res.windowHeight)
            console.log(res.language)
            console.log(res.version)
            console.log(res.platform)
          console.log('失去焦点')
        },
        fail:function () {

        },
        complete:function () {}

      })

  },


  cancelSearch(){
    this.setData({
      searchCompanykey:''
    });
    wx.navigateBack({
      delta: 1
    });
  },
  getInputContent(e){
    this.setData({
      searchCompanykey:e.detail.value
    });
  },
  affiliatedCompany(){//关联公司
    var that=this;
    if(!that.data.rzCompanyIndex&&that.data.rzCompanyIndex!==0){
      wx.showToast({
        title: '请选择公司',
        image:'../../../assets/images/icon/error-fff.png',
        duration: 2000
      })
    }else{
      wx.showLoading({
        title: '加载中',
        mask:true
      })
      wx.request({
        url: app.data.apiurl+'applets/relationCompany',
        data: {userId:app.globalData.userId,companyId:that.data.rzCompanyList[that.data.rzCompanyIndex].id,
          cardId:that.data.cardId},
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(that.data.rzCompanyList[that.data.rzCompanyIndex].id);
          console.log(res);
          if(res.statusCode==200){
            if(res.data.success==0||res.data.success==3){
              wx.hideLoading({
                title: '加载中'
              })
              wx.showToast({
                title: '关联成功',
                icon: 'success',
                duration: 2000
              })
              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 2]
              console.log(prevPage);
              if(prevPage.route=="pages/homePage/businessInfo/businessInfo"){
                console.log("条件成立");
                console.log(that.data.rzCompanyList[that.data.rzCompanyIndex].id)
                prevPage.setData({companyId:that.data.rzCompanyList[that.data.rzCompanyIndex].id,
                  company:that.data.rzCompanyList[that.data.rzCompanyIndex].name,
                address:that.data.rzCompanyList[that.data.rzCompanyIndex].address});
                // prevPage.getdata();
              }
              wx.navigateBack({
                delta: 1
              })
            }else if(res.data.success==2){
              wx.hideLoading({
                title: '加载中'
              })
              wx.showModal({
                title: '提示',
                content: res.data.message,
                success: function(res) {
                  if (res.confirm) {
                    wx.request({
                      url: app.data.apiurl+'applets/relationCompany',
                      data: {userId:app.globalData.userId,type:1,companyId:that.data.rzCompanyList[that.data.rzCompanyIndex].id},
                      header: {
                          'content-type': 'application/json' // 默认值
                      },
                      success: function(res) {
                        console.log(res);
                        if(res.statusCode==200){
                          if(res.data.success==0){
                            wx.showToast({
                              title: '关联成功',
                              icon: 'success',
                              duration: 2000
                            })
                            var pages = getCurrentPages();
                            var prevPage = pages[pages.length - 2]
                            console.log(prevPage);
                            if(prevPage.route=="pages/homePage/businessInfo/businessInfo"){
                              console.log("条件成立");
                              console.log(that.data.rzCompanyList[that.data.rzCompanyIndex].id)
                              prevPage.setData({companyId:that.data.rzCompanyList[that.data.rzCompanyIndex].id,
                              company:that.data.rzCompanyList[that.data.rzCompanyIndex].name,
                              address:that.data.rzCompanyList[that.data.rzCompanyIndex].address});
                              // prevPage.getdata();
                            }
                            wx.navigateBack({
                              delta: 1
                            })
                          }else {
                            console.log("失败了"+res.data.message);
                            wx.showToast({
                              title: res.data.message,
                              icon: 'success',
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
                    });
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }else {
              wx.hideLoading({
                title: '加载中'
              })
              console.log("失败了111"+res.data.message);
              wx.showToast({
                title: res.data.message,
                icon: 'success',
                duration: 2000
              })
            }
          }else{
            wx.hideLoading({
                title: '加载中'
              })
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
      });
    }
  },
  affiliatedCompanyQcc(){
    var that=this;
    if(!that.data.qccCompanyIndex&&that.data.qccCompanyIndex!==0){
      wx.showToast({
        title: '请选择公司',
        image:'../../../assets/images/icon/error-fff.png',
        duration: 2000
      })
    }else{
      if(that.data.depthCompanyList&&that.data.depthCompanyList.result[that.data.qccCompanyIndex]&&that.data.depthCompanyList.result[that.data.qccCompanyIndex].credit_code){
        wx.request({
          url: app.data.apiurl+'applets/relationCompany',
          data: {userId:app.globalData.userId,
            credit_code:that.data.depthCompanyList.result[that.data.qccCompanyIndex].credit_code,
            companyName:that.data.depthCompanyList.result[that.data.qccCompanyIndex].organization_name,
          cardId:that.data.cardId},
          header: {
              'content-type': 'application/json' // 默认值
          },
          success: function(res) {
            console.log(res);
            if(res.statusCode==200){
              if(res.data.success==0){
                console.log("关联成功");
                console.log(that.data.depthCompanyList.result[that.data.qccCompanyIndex].credit_code);
                var pages = getCurrentPages();
                  var prevPage = pages[pages.length - 2]
                  console.log(prevPage);
                  if(prevPage.route=="pages/homePage/businessInfo/businessInfo"){
                    console.log("条件成立");
                    console.log(that.data.rzCompanyList[that.data.rzCompanyIndex].id)
                    prevPage.setData({companyId:that.data.rzCompanyList[that.data.rzCompanyIndex].id,
                    company:that.data.rzCompanyList[that.data.rzCompanyIndex].organization_name,
                    address:''});
                    // prevPage.getdata();
                  }
                  wx.navigateBack({
                    delta: 1
                  })
              }else{

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
      }else{
        wx.showModal({
          title: '提示',
          content: '该公司工商信息存在异常，无法绑定，请联系公司人员核实情况。',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({prevpage:options.pagekey,cardId:options.cardid,searchCompanykey:options.companyName});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (format, data) {
      this.setData({
          focus:true
      })
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
