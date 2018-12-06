// component/link-1/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //
    linkData:Object,
    //联系人姓名
    name:String,
    //联系人头像
    src:String,
    //联系人介绍（名字下显示）
    subintr:String,
    //联系人电话
    call:String,
    //电话是否加密
    unShow:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    setString(){
      var phone = this.properties.call
      if (this.properties.unShow) {
        var dh = phone.substr(0, 3) + "****" + phone.substr(7);
        this.setData({
          call: dh
        })
    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setString()
          // console.log(dh)
      }


    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行

    },
  },
})
