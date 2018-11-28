// pages/mine/previewCompnayInfo/previewCompnayInfo.js
var app=getApp();
Page({
  data: {
    type:0,
    companyId:'',
    companyInfo:[],
    bigtitle:'',
    previewProduct:false,
    productList:[],
    productAllList:[],
    productCurrentPage:1,
    productTotalPageSize:'',
    productPageSize:10
  },

  getdata:function () {
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/myCompanyIntro',
      data: {
        companyId:that.data.companyId,
        type:that.data.type
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if(res.statusCode==200){
          if(res.data.success==0){

            that.setData({
              companyInfo:res.data.entity.intro
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
  getProductData:function () {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    var that=this;
    wx.request({
      url: app.data.apiurl+'applets/myCompanyProductList',
      data: {
        companyId:that.data.companyId,
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

            // that.setData({
            //   productList:res.data.entity.productList
            // });


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
  onLoad: function (options) {
    var companyId = options.companyId;
    var index = options.index;
    console.log(index)
    var dataType = parseInt(index)+1;

    if(dataType == 1){
      wx.setNavigationBarTitle({
        title:'预览-公司介绍'
      })
      this.setData({
        bigtitle:'公司介绍'
      })
    } else if(dataType == 2){
      wx.setNavigationBarTitle({
        title:'预览-公司愿景'

      })
       this.setData({
        bigtitle:'公司愿景'
      })
    } else if(dataType == 3){
      wx.setNavigationBarTitle({
        title:'预览-公司使命',

      })
       this.setData({
         bigtitle:'公司使命'
      })
    } else if(dataType == 4){

       this.setData({
         bigtitle:'公司理念'
      })

    } else if(dataType == 5){
      wx.setNavigationBarTitle({
        title:'预览-公司价值观'
      })
       this.setData({
         bigtitle:'公司价值观'
      })

    } else{
      wx.setNavigationBarTitle({
        title:'预览-公司产品'
      })
       this.setData({
         bigtitle:'公司产品'
      })
    }

    this.setData({
      type:dataType,
      companyId:companyId
    })

    if(dataType<=5){
      this.setData({
        previewProduct:false
      })

      this.getdata();
    }else{
      this.setData({
        previewProduct:true
      })

      this.getProductData()
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
    var self= this;
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
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})