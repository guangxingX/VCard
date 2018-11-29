// component/image-text/imageTextComponet.js
var Store = require('../../store.js')
var myBehavior = require('../behavior')
import { DATAMODULE } from '../../module/data.js'
var dataModule = new DATAMODULE
Component({
  behaviors: [myBehavior],
  /**
   * Component properties
   */
  properties: {
    myProperty: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 'hello', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      },
      name:{
        type:String
      }
    }
  },

  /**
   * Component initial data
   */
  data: {
    ImageTextItem:[]
  },

  /**
   * Component methods
   */
  methods: {
    onPostmsg(){
      console.log('msg')
      dataModule.getIndustryList().then(res=>{
        console.log(res)
      })
    }
  },
  /**
   * Component lifetmies
   */
  onLoad:function(option){
    console.log(1)
    console.log(option)
    
  },
  //版本过低
  lifetimes:{
    onLoad: function (option) {
      console.log(1)
      console.log(option)
    },
    created: function (option){
      // getData.postCreateProject().then(res=>{
      //   console.log(res)
      // })
      console.log(option)
      // Data.postCreateProject().then((res)=>{console.log(res)})
      console.log('1')
      console.log(this.name)
      console.log(Store.ImageTextItem)
    },
    attached: function () {
      console.log('2')
      // 在组件实例进入页面节点树时执行
    },
  }
})
