Component({
  properties: {
    //默认图片
    defaultText: String,
    //原始图片
    originalImage: String,
    width: {
      type:String,
      value:'84rpx'
    },
    height: {
      type: String,
      value: '84rpx'
    },
    //图片剪裁mode，同Image组件的mode
    mode: String
  },
  data: {
    finishLoadFlag: false
  },
  methods: {
    finishLoad: function (e) {
      this.setData({
        finishLoadFlag: true
      })
    },
    errorshow(e){
      this.setData({
        finishLoadFlag: false
      })
    }

  }
})

// 作者：Quenice
// 链接：https://www.jianshu.com/p/2ddbdb6c6b6d
// 來源：简书
// 简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。