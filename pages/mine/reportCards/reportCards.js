var app = getApp()
Page({
  data: {
    beReporterId:'',
    reasonStr:'',
    otherStr:'',
    addimgList:[],
    addshow:true,
    imagStr:'',
    textareaValue:'',
    //单张上传图片地址
    avatar:'',
    reasonList:[
      {'name':'广告'},
      {'name':'色情'},
      {'name':'身份作假'},
      {'name':'违法/政治敏感'},
      {'name':'其他'}]
  },
  choseReason:function (e) {
    var that = this;
    var clickIndex = e.currentTarget.dataset.index;

    that.data.reasonList.forEach(function(item, index, arr){
      if(clickIndex==index){
        item.cheacked=true;
      }else{
        item.cheacked=false;
      }

    });
    that.setData({reasonList:that.data.reasonList,reasonStr:that.data.reasonList[clickIndex].name});
    console.log(that.data.reasonStr)
  },
  // 其他原因
  textChange:function (event) {

    var that = this;
    //event.detail.value是整个textarea的值
    var strLength = event.detail.value.length;
    var isEmojiChar = app.isEmojiCharacter(event.detail.value);
    //是表情
    if(isEmojiChar){
       that.data.textareaValue = that.data.textareaValue.replace(/\ud83d[\udc00-\ude4f\ude80-\udfff]/g, '');
        that.setData({
          textareaValue: that.data.textareaValue,
          otherStr:event.detail.value
        })
        wx.showToast({
          title:'禁止输入表情字符'
        })
        return;
   }else{
     that.setData({
        textareaValue: event.detail.value,
        otherStr:event.detail.value
      })
    }


    // this.setData({
    //   otherStr:e.detail.value
    // })
  },
  // 选择图片
  choiceImg:function () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        const src = res.tempFilePaths[0]

        console.log('src')
        console.log(src)
        console.log('src')

        wx.navigateTo({
          url: `../../homePage/upload/upload?src=${src}`,
          success:function () {
              console.log('跳转成功')
          },
          fail:function () {
              console.log('跳转失败')
          }
        })
      }
    })

},
// 删除上传的照片
deleteImg:function (e) {

  var deleteIndex = e.currentTarget.dataset.delindex;
  this.data.addimgList.splice(deleteIndex,1);
  this.setData({
    addimgList:this.data.addimgList
  })

  if(this.data.addimgList.length<4){
    this.setData({
      addshow:true
    })
  }else{
     this.setData({
      addshow:false
    })
  }
  this.joinArrWithStr(this.data.addimgList)
},
joinArrWithStr:function (array) {
  if(array.length>0){
    var str = array.join(',');
     this.setData({
        imagStr:str
      })
  }
},
saveReport:function () {
  var that=this;
  console.log('------------------------')
  console.log(app.globalData.userId)
  console.log(that.data.beReporterId)
  console.log(that.data.reasonStr)
  console.log(that.data.otherStr)
  console.log('------------------------')
  if(!that.data.reasonStr){
    wx.showToast({
      title:'请选择原因！',
      image:'../../../assets/images/icon/error-fff.png',
      duration:2000
    })
    return;
  }
     wx.request({
      url: app.data.apiurl+'applets/applyEvidence',
      data: {
        reporterId:app.globalData.userId,
        beReporterId:that.data.beReporterId,
        reason:that.data.reasonStr,
        content:that.data.otherStr,
        image:that.data.imagStr
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if(res.statusCode==200){
          if(res.data.success==0){

            console.log('举报数据是--------')
            console.log(res);
            console.log('举报数据是--------')

            wx.showToast({
              title:'举报成功',
              icon:'success',
              duration:2000
            })
            setTimeout(function () {
              wx.navigateBack({
                detail:1
              })
            },2000)

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

      }
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onload')
    this.setData({
      beReporterId:options.beReporterId
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
    console.log('onshow')

    var self=this;
    if(self.data.avatar){

      self.data.addimgList.push(self.data.avatar)
      self.setData({
        addimgList:self.data.addimgList
      })
      if(self.data.addimgList.length<4){
        self.setData({
          addshow:true
        })
      }else{
         self.setData({
          addshow:false
        })
      }
      self.joinArrWithStr(self.data.addimgList)

      console.log('addshow')
      console.log(this.data.addshow)
      console.log(this.data.addimgList.length)
      console.log('addshow')

    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onhide')
    console.log(this.data.avatar)
    console.log('onhide')

    this.setData({
      avatar:''
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