// pages/financial/addmen/editmen/index.js
import { lookforsbmodule } from "../../../../module/lookforsb";
var lookforsb = new lookforsbmodule
import {programemodule} from "../../../../module/programe";
const programe = new programemodule
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
      istextimg:false,
      maininfo:{}, //缓存id 与 类型
      mold:'',//是否是展示还是编辑
      info:{} ,//展示触发渲染已经禁用部分编辑功能
      options:{},//缓存options
  },
    onTapSaveAll(){
        lookforsb.setsaveCoreTeam(
            this.data.maininfo.cardId,
            this.data.maininfo.userId,
            this.data.maininfo.id,
            this.data.ImageTextItem
        ).then(res=>{

        })
    },
    onTaptextimg(){
      this._randerImageTextItem()
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
      //不能修改
      return
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
        console.log(this.data.mold)
        //如果不是编辑模式禁止操作
        // 不能修改
            return

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
    _isEdit(){

    },
  _randerImageTextItem(){
    console.log(this.data.maininfo)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      //1是投资机构3是项目
      console.log(options);
      console.log(options.data);

      let maininfo = JSON.parse(options.data)
      let radioItems = this.data.radioItems

      if(maininfo.gender == '女'){
          radioItems[1].checked = true
          radioItems[0].checked = false
      }
      let mold = options.mold
      // let info = JSON.parse(options.info)
      this.setData({
          maininfo,
          mold,
          radioItems,
      })
        // TODO 需要区别是否是机构还是项目
      // let mydatas = JSON.parse(options.data)
      // console.log( mydatas);
      switch (options.type) {
          //机构
          case '1':
              lookforsb.getUserIntro(
                  maininfo.cardId,
                  maininfo.userId,
                  maininfo.id,
              ).then(res=>{
                  this.setData({
                      ImageTextItem:res.userIntro
                  })
              })
              break;
              //项目 核心团队编辑
          case '3':
              console.log(maininfo);
              programe.getproject_getUserIntro(maininfo.cardId,
                maininfo.userId,
                maininfo.id,).then(res=>{
                console.log(res);
            })
              break;
      }

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
