var app = getApp()
Page({
  data: {
    errorshow:false,
    failuretip:'',
    startDate:'',
    startTime:'',
    endDate:'',
    endTime:'',
    timeStart1:'',
    dataStart1:'',
    timeStart2:'',
    dataStart2:''
  },
  changeStartDate(e){
    console.log(e);

    this.setData({
      startDate:e.detail.value,
      errorshow:false,
      dataStart2:e.detail.value
    })
  },
  changeStartTime(e){
    this.setData({
      startTime:e.detail.value,
      errorshow:false,
      timeStart2:e.detail.value
    })
  },
  changeEndDate(e){
    console.log(e);
    this.setData({
      endDate:e.detail.value,
      errorshow:false
    })
  },
  changeEndTime(e){
    this.setData({
      endTime:e.detail.value,
      errorshow:false
    })
  },
  // 保存活动时间
  saveaddress(){
    var that=this;
    setTimeout(function(){
      that.setData({errorshow:false})
    },1000)
    if(this.data.startDate==''){
      console.log('请选择活动开始日期');
      this.setData({errorshow:true,failuretip:'请选择活动开始日期'});
    }else if(this.data.startTime==''){
      console.log('请选择活动开始时间');
      this.setData({errorshow:true,failuretip:'请选择活动开始时间'});
    }else if(this.data.endDate==''){
      console.log('请选择活动结束日期');
      this.setData({errorshow:true,failuretip:'请选择活动结束日期'});
    }else if(this.data.endTime==''){
      console.log('请选择活动结束时间');
      this.setData({errorshow:true,failuretip:'请选择活动结束时间'});
    }else{
      // 比较结束时间是否早于开始时间
      var isEarlyStartDate = app.compareDate(this.data.startDate+' '+this.data.startTime,this.data.endDate+' '+this.data.endTime)
      if(isEarlyStartDate){
        this.setData({errorshow:true,failuretip:'活动结束日期不能早于开始日期'});
        return;
      }
      console.log("2222");
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]
      prevPage.setData({
        activityStart:this.data.startDate+' '+this.data.startTime,
        activityEnd:this.data.endDate+' '+this.data.endTime
      });

      var newStartDate =this.data.startDate.replace(/-/g, "/")
      var newActivityEnd =this.data.endDate.replace(/-/g, "/")
      prevPage.setData({
        displayActivityStart:newStartDate+' '+this.data.startTime,
        displayActivityEnd:newActivityEnd+' '+this.data.endTime
      })

      wx.navigateBack({
        delta: 1
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({regionstr:options.address1,detailsAddress:options.address2});
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
    var myDate = new Date();
    this.setData({
      dataStart1:myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()
    })
    this.setData({
      timeStart1:myDate.getHours()+":"+myDate.getMinutes()
    })

    console.log('myDate.getFullYear()')
    console.log(myDate.getFullYear())
    console.log('myDate.getFullYear()')

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