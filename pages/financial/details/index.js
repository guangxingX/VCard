import {
  programemodule
} from '../../../module/programe.js'
var programe = new programemodule
var sliderWidth = 28; // 需要设置slider的宽度，用于计算中间位置
// pages/financial/details/index.js
Page({

  /**
   * 页面的初始数据
   */
  errorFunction(e) {
    console.log(e)
  },
  data: {
    tabs: ["项目介绍", "融资计划", "资源储备","商业模式"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    iconList: {
      photo: "../../../assets/images/icon/icon-phone-gray.png",
      email: "../../../assets/images/icon/icon-email-gray.png",
      position: "../../../assets/images/icon/icon-map.png",
      authentication: "../../../assets/images/icon/icon-authentication-yellow.png"
    },
    item: {
      isAuthentication: 1,
      address: "江西省九江市",
      legalPerson: "陈华量",
      name: "木艺有限公司",
      e: [
        {
          coTagName: "最新行业",
          coTagType: 0
        },
        {
          coTagName: "工业",
          coTagType: 0
        }
      ],
      logo: "https://oe75tqwfd.qnssl.com/QQ%E5%9B%BE%E7%89%8720171201205223.png",
      id: 1000108,
      companyTemplate: "https://oe75tqwfd.qnssl.com/companycard_3.jpg",
      bgId: 3,
      setUpTime: "2017-12-02"
    },
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }]
  },

  tabClick(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    programe.getProjectDetail()
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