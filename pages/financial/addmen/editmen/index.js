// pages/financial/addmen/editmen/index.js
import { lookforsbmodule } from "../../../../module/lookforsb";
var lookforsb = new lookforsbmodule
Page({

  /**
   * 页面的初始数据
   */
  data: {
      radioItems: [
          {name: '男', value: '0',checked: true},
          {name: '女', value: '1', }
      ],
      avatar:[],
      ImageTextItem:[],
      savePreson:[],
      istextimg:false
  },
    onTapSaveAll(){

    },
    onTaptextimg(){
        this.setData({
            istextimg:true
        })
    },
    onTapSave(e){
        console.log(e.detail.ImageTextItem);
        // console.log(this.data.ImageTextItem);
        console.log(1)
        this.setData({
            ImageTextItem:e.detail.ImageTextItem,
            istextimg:false
        })

    },
    onTapView(){
        console.log(2)
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
    },
    chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                console.log(res.tempFilePaths);
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    avatar: res.tempFilePaths
                });
            }
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
      // let mydatas = JSON.parse(options.data)
      // console.log( mydatas);
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
