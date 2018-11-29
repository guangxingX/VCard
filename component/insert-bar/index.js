// component/insert-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    ImageTextItem: [],
    insertbar: [{
        name: '文字',
        src: '../images/icon-text.png',
        fn:'onTapText'
      },
      {
        name: '图片',
        src: '../images/icon-image.png',
        fn:'onTapImage'
      },
      {
        name: '视频',
        src: '../images/icon-video.png',
        fn:'onTapVideo'
      },
      {
        name: '链接',
        src: '../images/icon-a.png',
        fn:'onTapATag'
      },
      {
        name: '文件',
        src: '../images/icon-file.png',
        fn:'onTapFile'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onToTextpage() {
      wx.navigateTo({
        url: '../edit-text/index',
      })
    },
    onTapText(){
      console.log(1)
    },
    onTapImage() {
      console.log(2)
    },
    onTapVideo() {
      console.log(3)
    },
    onTapATag() {
      console.log(4)
    },
    onTapFile() {
      console.log(5)
      wx.getSavedFileList({
        success(res) {
          console.log(res.fileList)
        }
      })
    },
  }
})