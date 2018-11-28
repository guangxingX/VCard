// pages/supply/supply.js
var app = getApp();
Page({
  data: {
    currentPage:1,
    currentPage1:1,
    currentPage2:1,
    totalPageSize:1,
    totalPageSize1:1,
    totalPageSize2:1,
    // 默认没有未读消息
    unread:0,
    iconList:{
      authentication:"../../../assets/images/icon/icon-authentication-yellow.png"
    },
    currenttab:'',
    // 需求类型
    needSubjectList:[],
    //资源类型
    supplySubjectList:[],
    index:0,
    sadList:[],
    checkedType:"全部资源",
    checkedTypeId:'',
    resourceList:[],
    demandList:[],
    resourceImgShow:false,
    supplyImgShow:false
  },
  addNew(){
    if(this.data.currenttab==0){
      wx.navigateTo({
        url: "../../mine/addResource/addResource?currenttab="+this.data.currenttab,
        success: res => {
        },
        fail: res => {
        },
        complete: res => {
        }
      })

     // wx.setStorage({
     //   key:"currentpage",
     //   data:"supplypage"
     // })

    }else{
      wx.navigateTo({
        url: "../../mine/addDemand/addDemand?currenttab="+this.data.currenttab,
        success: res => {
        },
        fail: res => {
        },
        complete: res => {
        }
      })

      wx.setStorageSync('currentpage', {currenttab:1,
          currentpage:'supplypage'});
    }
  },
  toSearch(e){

    console.log('toSearch')
    console.log(this.data.currenttab)
    console.log('toSearch')


    wx.navigateTo({
      url: "../../commenPage/searchPage/searchPage?storageKey="+e.currentTarget.dataset.storagekey+'&currenttab='+this.data.currenttab,
    })
  },
  // 进入资源详情
  toDetails(e){
    console.log("index++++"+e.currentTarget.dataset.index);
    console.log(e.currentTarget.dataset.hasownmess)
    console.log(e.currentTarget.dataset.companyname)
    console.log("index++++"+e.currentTarget.dataset.index);



    // if(this.data.currenttab==0){
    //   app.data.supplyDetailsData=this.data.resourceList[e.currentTarget.dataset.index];
    // }else{
    //   app.data.supplyDetailsData=this.data.demandList[e.currentTarget.dataset.index]
    // }
    wx.navigateTo({
      url: '../supplyDetails/supplyDetails?id='+e.currentTarget.dataset.id+'&currenttab='+this.data.currenttab+'&hasownmess='+e.currentTarget.dataset.hasownmess+'&companyname='+e.currentTarget.dataset.companyname,
      success: res => {
      },
      fail: res => {
      },
      complete: res => {
      }
    })
  },
  /**
   * 获取分类数据
   */
  gettypeList(){
    var that=this;
    wx.request({
      url: app.data.apiurl+'applets/subjectList',
      data: {sadType:that.data.currenttab,cocId:app.globalData.cocId},
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res);
        if(res.statusCode==200){
          if(res.data.success==0){
            that.data.needSubjectList=res.data.entity.needSubjectList;
            that.data.supplySubjectList=res.data.entity.supplySubjectList;
            that.data.needSubjectList.unshift({id:'',name:"全部需求"});
            that.data.supplySubjectList.unshift({id:'',name:"全部资源"});
            that.setData({
              needSubjectList:that.data.needSubjectList,
              supplySubjectList:that.data.supplySubjectList
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
          title: '加载中',
        })
      }
    })
  },
  clickTab(e){
    if(this.data.currenttab!= parseInt(e.currentTarget.dataset.currenttab)){
      this.setData({
        currenttab:parseInt(e.currentTarget.dataset.currenttab)
      });
      if(parseInt(this.data.currenttab) == 0){
        console.log('点击了资源')
        this.setData({
          currentPage:this.data.currentPage1,
          totalPageSize:this.data.totalPageSize1,
        });
        console.log(this.data.checkedType);
          this.setData({
            checkedType:'全部资源',
            checkedTypeId:'',
            //复位选择
            index:0,
            resourceList:[]
          })

            this.getdata();
      }else{
        this.setData({
          currentPage:this.data.currentPage2,
          totalPageSize:this.data.totalPageSize2
        });

        console.log('点击了需求')

          this.setData({
            checkedType:'全部需求',
            checkedTypeId:'',
            //复位选择
            index:0,
            demandList:[]
          })

          this.getdata();
      }
    }
  },
  bindPickerChange: function(e) {
    this.setData({
      resourceImgShow:false,
      supplyImgShow:false
    })
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if(this.data.currenttab==0){
        this.setData({
          index: e.detail.value,
          checkedTypeId:this.data.supplySubjectList[e.detail.value].id,
          checkedType:this.data.supplySubjectList[e.detail.value].name,
          resourceList:[],
          currentPage:1,
          currentPage1:1,
          totalPageSize:this.data.totalPageSize1
        })
    }else{
      this.setData({
          index: e.detail.value,
          checkedTypeId:this.data.needSubjectList[e.detail.value].id,
          checkedType:this.data.needSubjectList[e.detail.value].name,
          demandList:[],
          currentPage:1,
          currentPage2:1,
          totalPageSize:this.data.totalPageSize2
      })
    }
    this.getdata();
  },
  // 获取资源、需求数据
  getdata(){
    wx.showLoading({
      title: '加载中',
      mask:true
    })

    console.log('再一次请求数据时，sadtype是')
    console.log(this.data.currenttab)
    console.log('再一次请求数据时，sadtype是')


    var that=this;
    console.log(app.globalData.cocId);
    wx.request({
      url: app.data.apiurl+'applets/sadList',
      data: {
        userId:app.globalData.userId,
        cocId:app.globalData.cocId,
        sadType: that.data.currenttab,
        currentPage:that.data.currentPage,
        subjectId:that.data.checkedTypeId,
        pageSize:10,
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh();
        console.log(res);
        if(res.statusCode==200){
          if(res.data.success==0){
            var list=res.data.entity.sadList;
            list.forEach(function(item, index, arr){
              item.differTime=app.getTimeDifference(item.createTime);
            })
            if(that.data.currenttab==0){
                that.data.resourceList=that.data.resourceList.concat(list);
                that.setData({
                  resourceList:that.data.resourceList,
                  unread:res.data.entity.isRead,
                  totalPageSize:res.data.entity.totalPageSize,
                  totalPageSize1:res.data.entity.totalPageSize
                });


                // 列表数据的头像地址可能是：/upload/Dev/logo/20180118/1516266750035664739.png这种形式
                that.data.resourceList.forEach(function (item,index,arr) {
                    if(item.companyLogo&&item.companyLogo.indexOf('http') == -1){
                      item.companyLogo='https://static.upedu.cc/'+item.companyLogo;
                    }
                })
                that.setData({
                   resourceList:that.data.resourceList
                })



            }else{
              that.data.demandList=that.data.demandList.concat(list);
              that.setData({
                demandList:that.data.demandList,
                unread:res.data.entity.isRead,
                totalPageSize:res.data.entity.totalPageSize,
                totalPageSize2:res.data.entity.totalPageSize});
            }
             // 列表数据的头像地址可能是：/upload/Dev/logo/20180118/1516266750035664739.png这种形式
             // 170215没有头像
                that.data.demandList.forEach(function (item,index,arr) {
                    if(item.companyLogo&&item.companyLogo.indexOf('http') == -1){
                      item.companyLogo='https://static.upedu.cc/'+item.companyLogo;
                    }
                })
                that.setData({
                   demandList:that.data.demandList
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
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();

        wx.showToast({
          title: '加载失败',
          image:'../../../assets/images/icon/error-fff.png',
          duration: 2000
        })
      },
      complete(){
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();

        wx.hideLoading({
          title: '加载中',
        })
      }
    })
  },
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
    // on-show 开始
    // this.setData({
    //   currentPage: 1,
    //   currentPage1:1,
    //   currentPage2:1,
    //   demandList:[],resourceList:[]
    // })
    // this.getdata();
    // on-show 结束


    this.setData({
      currentPage: 1,
      currentPage1:1,
      currentPage2:1,
      currenttab:'',
      demandList:[],
      resourceList:[]
    })
    this.gettypeList();
    var that=this;
    wx.getStorage({
      key: 'currentpage',
      success: function (res) {
        console.log("+++++++获取缓存成功");
        console.log(res);
        console.log("+++++++获取缓存成功");
        if(res.data.currentpage=='supplypage'){
          that.setData({
            currenttab: parseInt(res.data.currenttab)
          })
          if(that.data.currenttab==0){
            that.setData({
              checkedType:'全部资源',
              checkedTypeId:''
            })
          }else{
            that.setData({
              checkedType:'全部需求',
              checkedTypeId:''
            })
          }
        }else{
          that.setData({
            currenttab: 0,
            checkedType:'全部资源',
            checkedTypeId:''
          })
        }
        console.log("获取缓存的值");
        console.log(that.data.currenttab)
        console.log("获取缓存的值");
        console.log(res.data)
        that.getdata();
      },
      fail: function (res){
        console.log("获取缓存失败");
        console.log(res)
        that.setData({
          currenttab: 0,
          checkedType:'全部资源',
          checkedTypeId:''
        });
        that.getdata();
      }
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
    // wx.removeStorage({
    //   key: 'currentpage',
    //   success: function (res) {
    //     console.log("清除缓存活动详情")
    //   }
    // })

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("下拉刷新动作");
    var self=this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
      if(self.data.currenttab == 0){
        self.setData({
            currentPage1:1,
            currentPage:1,
            resourceList:[]
          })
        setTimeout(function(){
          self.getdata();
          console.log('资源刷新')
        },1000);

      }else{
         self.setData({
            currentPage2:1,
            currentPage:1,
            demandList:[]
          })
         setTimeout(function(){
            self.getdata();
            console.log('需求刷新')
          },1000);
      }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("触底时间")
    console.log(this.data.currentPage);
    console.log(this.data.totalPageSize);
    console.log(this.data.currentPage);
    if(this.data.currentPage<this.data.totalPageSize){
      this.data.currentPage+=1;
      if(this.data.currenttab==0){
        this.setData({
          currentPage:this.data.currentPage,
          currentPage1:this.data.currentPage
        });
      }else{
        this.setData({
          currentPage:this.data.currentPage,
          currentPage2:this.data.currentPage
        });
      }
      this.getdata();
    }else{
      wx.showToast({
        title: '没有更多数据了',
        icon: 'success',
        duration: 2000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})