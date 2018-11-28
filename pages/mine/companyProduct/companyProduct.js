// pages/mine/companyProduct/companyProduct.js
var app=getApp();
Page({
  data: {
    // wrapMaxHeight:530,
    // isShow:false,
    style:"查看更多",
    productCurrentPage:1,
    productPageSize:10,
    companyId:'',
    productList:[],
  },

  // 查看更多
  seeMore:function(event){
    var index = event.currentTarget.dataset.index;
    //更改index条数据的展开的标识
    var changeIsShow = "productList["+index+"].isShow";
    if(this.data.productList[index].isShow==false){
      console.log('if')
       this.setData({
          // isShow:true,
          style:"收起更多",
          [changeIsShow]:true
        })
      }else{
        console.log('else')
        this.setData({
          isShow:false,
          style:"查看更多",
          [changeIsShow]:false
        })
      }
  },
  //新增产品
  addProduce(){
    this.setData({loading:true});
    wx.navigateTo({
      url: '../editEveryCompanyProduct/editEveryCompanyProduct?companyid='+this.data.companyId,
      success: res => {
        this.setData({loading:false});
      },
      fail: res => {
        this.setData({loading:false});
      },
      complete: res => {
        this.setData({loading:false});
      }
    });
  },
  //编辑每一个公司产页面
  goEditEveryProduct:function(event){
    var productIndex = event.currentTarget.dataset.productindex;
    wx.navigateTo({
      url: '../editEveryCompanyProduct/editEveryCompanyProduct?productId='+productIndex+"&companyid="+this.data.companyId
    });
  },
  // 获取产品列表数据
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
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh();
        if(res.statusCode==200){
          if(res.data.success==0){

            var tempArr = res.data.entity.productList;
            tempArr.forEach(function(item, index, arr){
               item.isShow=false;
            });

            console.log('公司产品数据是--------')
            // console.log(res);
            console.log(tempArr);
            console.log('请公司产品数据是--------')
            that.setData({
              productList:tempArr
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
    // 获取公司id
    var id = options.id;
    this.setData({
      companyId:id
    })

    console.log(this.data.companyId);
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
    this.getProductData();
      // 先往每条数据插入一条关闭的数据.这个逻辑要放在数据求情成功后
    // for(let i=0;i<this.data.dataList.length;i++){
    //   // 拿到每一个对象
    //   var str = JSON.stringify(this.data.dataList[i]);
    //   // 减去最后一个}
    //   var newstr=str.substring(0,str.length-1);

    //   newstr+=',"isShow":false}';
    //   // console.log(newstr)

    //   var newObj = JSON.parse(newstr);
    //   console.log(newObj)
    // }
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
    setTimeout(function () {
      self.setData({
        currentPage:1,
        productList:[]
      })
      self.getProductData();
    }, 1000)
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