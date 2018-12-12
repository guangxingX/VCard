// component/insert-bar/index.js
import {
  DATAMODULE
} from "../../../../module/data.js"
const qiniuUploader = require("../../../../utils/qiniuUploader");
var dataModule = new DATAMODULE
Component({
  relations: {
    './image-text': {
      type: 'parent', // 关联的目标节点应为子节点
      linked: function(target) {
        // 每次有custom-li被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
      },
      linkChanged: function(target) {
        // 每次有custom-li被移动后执行，target是该节点实例对象，触发在该节点moved生命周期之后
      },
      unlinked: function(target) {
        // 每次有custom-li被移除时执行，target是该节点实例对象，触发在该节点detached生命周期之后
      }
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    ImageTextItem: {
      type: Array
    } //需要配置的项
  },

  /**
   * 组件的初始数据
   */
  data: {
    uptoken: '', //上传图片前需要获取配置
    domain: '',
    insertbar: [{
        name: '文字',
        src: '../images/icon-text.png',
        fn: 'onTapText'
      },
      {
        name: '图片',
        src: '../images/icon-image.png',
        fn: 'onTapImage'
      },
      {
        name: '视频',
        src: '../images/icon-video.png',
        fn: 'onTapVideo'
      },
      {
        name: '链接',
        src: '../images/icon-a.png',
        fn: 'onTapATag'
      },
      {
        name: '文件',
        src: '../images/icon-file.png',
        fn: 'onTapFile'
      }
    ],
    errimg: '/assets/images/icon/error-fff.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTapText() {
      wx.navigateTo({
        url: '/component/edit-text/index',
      })
    },
    onTapImage(e) {
      let that = this;
      let mode = e.currentTarget.dataset.mode
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          qiniuUploader.upload(res.tempFilePaths[0], (res) => {
            var max = 0;
            if (that.data.ImageTextItem.length > 0) {
              max = that.data.ImageTextItem[0].sDtSecCode;
              that.data.ImageTextItem.forEach(function(item, index, arr) {
                if (item.sDtSecCode > max) {
                  max = item.sDtSecCode;
                }
              });
            }
            that.data.ImageTextItem.push({
              image: 'https://' + res.imageURL,
              sDtSecCode: max + 1
            });
            that.triggerEvent('setImageTextItem', that.data.ImageTextItem)
          }, (error) => {
            wx.showToast({
              title: "上传图片失败",
              image: that.data.errimg,
              duration: 2000
            })
            console.log('error: ' + error);
          }, {
            region: 'ECN',
            uploadURL: 'https://touch.hopechina.cc',
            domain: that.data.domain,
            uptoken: that.data.uptoken,
          })
        }
      })

    },
    onTapVideo() {
      var that = this
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        compressed: false,
        maxDuration: 60,
        camera: 'back',
        success: function(res) {
          qiniuUploader.upload(res.tempFilePath, (res) => {
            console.log(res.imageURL);
            var max = 0;
            if (that.data.ImageTextItem.length > 0) {
              max = that.data.ImageTextItem[0].sDtSecCode;
              that.data.ImageTextItem.forEach(function(item, index, arr) {
                if (item.sDtSecCode > max) {
                  max = item.sDtSecCode;
                }
              });
            }
            that.data.ImageTextItem.push({
              video: 'https://' + res.imageURL,
              sDtSecCode: max + 1
            });
            that.triggerEvent('setImageTextItem', that.data.ImageTextItem)
          }, (error) => {
            wx.showToast({
              title: "上传图片失败",
              image: that.data.errimg,
              duration: 2000
            })
            console.log('error: ' + error);
          }, {
            region: 'ECN',
            uploadURL: 'https://touch.hopechina.cc',
            domain: that.data.domain,
            uptoken: that.data.uptoken,
          })
        }
      })
    },
    onTapATag() {
      wx.showToast({
        title: '功能呢暂时未开放，尽请期待',
        icon: 'none',
        duration: 2000
      })
      console.log('A')
    },
    onTapFile() {
      wx.showToast({
        title: '功能呢暂时未开放，尽请期待',
        icon: 'none',
        duration: 2000
      })
      console.log('File')
    },
    _init() {
      dataModule.getUptoken().then(res => {
        this.setData({
          uptoken: res.uptoken,
          domain: res.domain
        })
      })
    }
  },
  lifetimes: {
    created: function() {
      this._init()
    },
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    ready: function() {
      // 在组件在视图层布局完成后执行
    }
  },
  pageLifetimes: {
    show: function() {

    },
    hide: function() {},

    resize: function() {}
  }
})
