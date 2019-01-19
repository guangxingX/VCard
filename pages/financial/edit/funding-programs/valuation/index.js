// pages/financial/edit/funding-programs/stage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      showTopTips: false,
    name:'',
    type:'',
      radioItems: [
        { name: '1万-50万', value: '1万-50万',checked: true},
        { name: '50万-100万', value: '50万-100万'},
        { name: '100万-500万', value: '100万-500万'},
        { name: '500万-1000万', value: '500万-1000万'},
        { name: '1000万-5000万', value: '1000万-5000万'},
        { name: '5000万-1亿', value: '5000万-1亿'},
        { name: '大于1亿', value: '大于1亿'},
          
      ],
    value:'1万-50万'
  },
  onSave(){
    var pages = getCurrentPages();

    var prevPage = pages[pages.length - 2];
    console.log(this.data.value)
    if(this.data.type == 1){
      //金额
      prevPage.setData({
        financingAmount: this.data.value
      })
    }else if (this.data.type == 2 ){
      //估值
      prevPage.setData({
        financingValuation: this.data.value
      })
    }
    // prevPage.setData({
    //   phase: this.data.value
    // })
    wx.navigateBack()
  },
    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value);

        var radioItems = this.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            radioItems[i].checked = radioItems[i].value == e.detail.value;
        }
        this.setData({
            radioItems: radioItems
        });
        

        this.setData({
          value: e.detail.value
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
    wx.setNavigationBarTitle({
      title: `${options.name}`,
      icon: 'none'
    })
    this.setData({
      name: options.name,
      type: options.type,
    })
      // let radioItems =this.data.radioItems
      // for(let i = 0,l = radioItems.length ; i<l ; i++){
      //    if(radioItems[i].name == options.value){
      //        radioItems[i].checked = true
      //    }else {
      //        radioItems[i].checked = false
      //    }
      // }
      // this.setData({
      //     radioItems,
      // })
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
    this.setData({

    })
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
