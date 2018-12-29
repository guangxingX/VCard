// component/programe/edit-m/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name:String,
    rate:{
      type:String,
        value: '',
        observer(newVal){

            let _rate = newVal.split('%')
            this.setData({
                _rate:_rate[0]
            })
        }

    },
    info:String,
    must:{type:Boolean,
    value:false
    }
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的初始数据
   */
  data: {
      _rate :''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ontest(){
        // console.log(this.properties.rate);
    }
  },

    lifetimes: {
        attached() {
            // 在组件实例进入页面节点树时执行\

        },
        detached() {
            // 在组件实例被从页面节点树移除时执行
        },
    },
})
