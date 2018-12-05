import { programemodule } from '../../../module/programe.js'
var programe = new programemodule
var base64 = require('../../images/base64.js')
// component/programe/item/intex.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    projectinfo: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    status: '融资中',//TODO 接口未给出
    tag: ['赛道布局', '教育培训', '智能', '直播业', '布局'],//标签
    info:{}

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onAddList() {
      console.log(1)
      console.log(this.properties.projectinfo)
    },
    setAlldata(){
      var tag;
      var info = this.properties.projectinfo
        if(typeof info.label != 'undefined'){
            var tag = programe.splitbycomma(info.label)
        }
      this.setData({
        tag: tag,
        info:info,
        icon60: base64.icon60
      });
    }
  },
  /**
   * Component lifetmies
   */
  lifetimes: {
    created: function(option) {

    },
    attached: function() {
      this.setAlldata()
    },
  },
})
