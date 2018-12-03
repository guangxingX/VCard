// my-behavior.js
module.exports = Behavior({
  behaviors: [],
  properties: {
    myBehaviorProperty: {
      type: String
    }
  },
  data: {
    ImageTextItem: [],//使用insert组件 需要在调用组件页面中 设置此参数 来记录显示插入信息
  },
  attached: function () { },
  methods: {
    myBehaviorMethod: function (a) {
      this.setData({
        ImageTextItem:a
      })
    }
  }
})