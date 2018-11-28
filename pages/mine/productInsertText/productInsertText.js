var app=getApp()
Page({
  data: {
    errorshow:false,
    failuretip:'',
    charNumber: 0,
    content: '',
    textareaValue:''
  },
  // 输入文字改变
  textChange: function (event) {
    var that = this;
    //event.detail.value是整个textarea的值
    var strLength = event.detail.value.length;
    var isEmojiChar = app.isEmojiCharacter(event.detail.value);
    //是表情
    if(isEmojiChar){
    this.data.textareaValue = this.data.textareaValue.replace(/\ud83d[\udc00-\ude4f\ude80-\udfff]/g, '');
    var strLength = this.data.textareaValue.length;
    that.setData({
      charNumber: strLength,
      content:  that.data.textareaValue,
      textareaValue: that.data.textareaValue
    })
    wx.showToast({
      title:'禁止输入表情字符'
    })
    return;
   }else{
    that.setData({
        charNumber: strLength,
        content:  event.detail.value,
        textareaValue: event.detail.value
      })
    }

  },
  Preservation: function () {
    var that = this;
    setTimeout(function(){
      that.setData({
        errorshow:false
      })
    },1000)
    // console.log(this.data.content.trim());
    if(this.data.charNumber==0||this.data.content.trim()==''){
      this.setData({errorshow:true,failuretip:'文字内容不能为空'});
    }else{
      var pages = getCurrentPages();
      console.log(pages)
      var prevPage = pages[pages.length-2];
      var prevPageImageTextItem=prevPage.data.ImageTextItem;
      console.log(prevPageImageTextItem);
      var max=0;
        if(prevPageImageTextItem.length>0){
          max = prevPageImageTextItem[0].sDtSecCode;
          prevPageImageTextItem.forEach(function(item,index,arr){
            if(item.sDtSecCode>max){
              max=item.sDtSecCode;
            }
          });
        }
        //把信息存入共同对象里
      prevPage.data.ImageTextItem.push({text:that.data.content,sDtSecCode:max+1});
      prevPage.setData({
        ImageTextItem:prevPage.data.ImageTextItem
      })
      wx.navigateBack({
        changed: true
      });
    }
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
