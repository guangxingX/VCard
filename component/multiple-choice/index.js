// component/multiple-choice/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      name:String,
      radioItems:{
        value:[
            { name: '男', value: '0', checked: true },
            { name: '女', value: '1', }
          ],
          type:Array
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // radioItems: [
    //   { name: '男', value: '0', checked: true },
    //   { name: '女', value: '1', }
    // ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    radioChange: function (e) {
      // console.log('radio发生change事件，携带value值为：', e.detail.value);

      var radioItems = this.properties.radioItems;
      for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
      }

      this.setData({
        radioItems: radioItems
      });
      this.triggerEvent('onChangeChoice',e.detail.value)
    },
  }
})
