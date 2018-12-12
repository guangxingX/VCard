// component/show-imageText/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url:String,
    imgData:Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    fileName:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _translationFile(){
      var k = this.properties.imgData.file
      if (k) {
        var appU = k.split('/')
        var name = appU[appU.length - 1];
        // var name = "中国著名资深法学家江平1.jpg"
        name = decodeURI(name)
        this.setData({
          fileName:name
        })
      }
    },
    onClip(){
     
      // console.log(this.properties.imgData['image'])
      // let foo = this.properties.imgData
      // for (var k in foo){
      //   console.log(k)
      // }
      // wx.setClipboardData({
      //   data: 'data',
      //   success: function (res) {
      //     wx.getClipboardData({
      //       success: function (res) {
      //         console.log(res.data) // data
      //       }
      //     })
      //   }
      // })
    },
    onOpenFile(){
      // console.log(1)
      wx.downloadFile({
        // TODO 新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx
        url: this.properties.url,
        success: function (res) {
          var filePath = res.tempFilePath
          console.log(filePath)
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
      })
    }
  },
  lifetimes: {
    attached: function () {
      this._translationFile()
      // 在组件实例进入页面节点树时执行
      
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行

    },
  }
})
