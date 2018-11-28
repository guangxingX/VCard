  // pages/mine/companyAddressMaps/companyAddressMaps.js
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    showNothing:false,
    address:'',
    lng:'',
    lat:'',
    markers: [{
      iconPath: "../../../assets/images/icon/icon-map-mark.png",
      id: 0,
      latitude: 40.002607,
      longitude: 116.487847,
      width: 25,
      height: 46,
      title:''
    }],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({address:options.address});
    console.log(this.data.address);
    qqmapsdk = new QQMapWX({
        key: 'ZKCBZ-KPG3X-CMR43-77774-HOTTO-CPFSZ' // 必填
    });
    // 调用接口
    console.log(this.data.address);
    var that=this;
    qqmapsdk.geocoder({
        address: this.data.address,
        success: function(res) {
          that.setData({
            showNothing:false
          })
            console.log(res);
            that.setData({lng:res.result.location.lng,lat:res.result.location.lat});
            that.data.markers[0].latitude=res.result.location.lat;
            that.data.markers[0].longitude=res.result.location.lng;
            //that.data.markers[0].title=that.data.address;
            that.setData({markers:that.data.markers});
        },
        fail: function(res) {
          console.log('failDe ')
            console.log(res);
          console.log('failDe ')

          that.setData({
            showNothing:true
          })

        },
        complete: function(res) {
            console.log(res);
        }
    });

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