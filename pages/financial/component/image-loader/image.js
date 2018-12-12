Component({
  properties: {
    //默认图片 显示的文字 
    //异步需要检测变动
    defaultText: {
      type: String,
      value: '暂无',
      observer: function(newVal, oldVal, changedPath) {
        this.setData({
          _defaultText: newVal.substring(0, Number(this.properties.size))
        })
      }
    },
    //原始图片
    originalImage: String,
    //图片的宽高
    width: {
      type: String,
      value: '84rpx'
    },
    height: {
      type: String,
      value: '84rpx'
    },
    //其它样式的添加
    plugStyle: {
      type: String,
      value: ` font-size: 28rpx;
  border-radius: 10rpx;`,
    },
    //图片剪裁mode，同Image组件的mode
    mode: {
      type: String,
      value: 'scaleToFill'
    },
    //默认显示占位图的字数
    //通信录是1字
    //企业是2字
    size: {
      type: String,
      value: '2'
    }
  },
  data: {
    finishLoadFlag: false,
    _defaultText: '暂无',
  },
  methods: {
    finishLoad: function(e) {
      this.setData({
        finishLoadFlag: true
      })
    },
    errorshow(e) {
      this.setData({
        finishLoadFlag: false
      })
    }
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      // console.log(this.properties.size)
      this.setData({
        defaultText: this.properties.defaultText.substring(0, Number(this.properties.size))
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行


    },
  },
})

// 作者：Quenice
// 链接：https://www.jianshu.com/p/2ddbdb6c6b6d
// 來源：简书
// 简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。