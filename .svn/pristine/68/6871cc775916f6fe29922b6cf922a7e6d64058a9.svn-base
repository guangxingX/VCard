// pages/financial/edit/funding-programs/stage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      showTopTips: false,

      radioItems: [
          {name: '种⼦轮', value: '种⼦轮',checked: true},
          {name: '天使轮', value: '天使轮'},
          {name: 'A轮', value: 'A轮'},
          {name: 'A+轮', value: 'A+轮'},
          {name: 'B轮', value: 'B轮'},
          {name: 'C轮', value: 'C轮'},
          {name: 'BAT轮', value: 'BAT轮'},
          {name: 'preIPO', value: 'preIPO'},
          {name: 'IPO', value: 'IPO'},
      ],
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
        var pages = getCurrentPages();

        var prevPage = pages[pages.length - 2];

        prevPage.setData({
            phase: e.detail.value
        })
        wx.navigateBack()
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
      let radioItems =this.data.radioItems
      for(let i = 0,l = radioItems.length ; i<l ; i++){
         if(radioItems[i].name == options.value){
             radioItems[i].checked = true
         }else {
             radioItems[i].checked = false
         }
      }
      this.setData({
          radioItems,
      })
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
