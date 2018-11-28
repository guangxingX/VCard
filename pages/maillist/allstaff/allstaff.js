var app = getApp()

Page({
  data: {
    companyId:'',
    from:false,
    isuthentication:'',
    staffcurrentPage:1,
    staffpageSize:10,
    companyName:"",
    employeeList:[],
    totalPageSize:1
  },
  // da打电话
  callMobile:function (event) {
    app.makeCall(event);
  },

  goCardDetails:function (e) {
    var mycardid = e.currentTarget.dataset.mycardid;
    var from = e.currentTarget.dataset.from;

    // wx.navigateTo({
    //   url:'../../mine/cardDetails/cardDetails?mycardid='+mycardid+'&from='+from
    // })

     wx.redirectTo({
        url:'../../mine/cardDetails/cardDetails?mycardid='+mycardid+'&from='+from
     })
  },

  getAllstaffData: function () {
      wx.showLoading({
        title: '加载中',
        mask:true
    })
    var that=this;

    console.log('员工数据加载了')

    wx.request({
      url: app.data.apiurl+'applets/companyEmployee',
      data: {
        companyId:that.data.companyId,
        currentPage:that.data.staffcurrentPage,
        pageSize:that.data.staffpageSize,
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if(res.statusCode==200){
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh();
          if(res.data.success==0){

            console.log('所有员工数据是--------')
            console.log(res);
            console.log('所有员工数据是--------')

            that.setData({
              employeeList:that.data.employeeList.concat(res.data.entity.employeeList),
              totalPageSize:res.data.entity.totalPageSize
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
          title: '加载中'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var companyId = options.id
    var isuthentication = options.isuthentication
    this.setData({
      companyId:companyId,
      isuthentication:isuthentication,
      companyName:options.companyName
    })

    var title = '所有员工 (共'+options.peopelenumber+'人)';
    wx.setNavigationBarTitle({
      title:title
    });

    // 加载员工数据
    this.getAllstaffData();


    console.log('员工页面isuthentication')
    console.log(this.data.isuthentication)
    console.log(isuthentication)
    console.log('员工页面isuthentication')
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
      var self=this;
      wx.showNavigationBarLoading() //在标题栏中显示加载

      console.log('所有员工刷新时，currtab=')

      setTimeout(function () {
        self.setData({
        staffcurrentPage:1,
        employeeList:[]
      })

      console.log('商会刷新---------')

      self.getAllstaffData();

      }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.staffcurrentPage<this.data.totalPageSize){
      this.data.staffcurrentPage+=1;
        this.setData({
          staffcurrentPage:this.data.staffcurrentPage,
        });
      this.getAllstaffData();
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