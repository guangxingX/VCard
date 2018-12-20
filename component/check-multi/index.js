// component/check-multi/index.js
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
      checkboxItems: [
          {name: 'standard is dealt for u.', value: '0', checked: true},
          {name: 'standard is dealicient for u.', value: '1'}
      ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

          checkboxChange: function (e) {
              console.log('checkbox发生change事件，携带value值为：', e.detail.value);

              var checkboxItems = this.data.checkboxItems, values = e.detail.value;
              for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
                  checkboxItems[i].checked = false;

                  for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                      if(checkboxItems[i].value == values[j]){
                          checkboxItems[i].checked = true;
                          break;
                      }
                  }
              }

              this.setData({
                  checkboxItems: checkboxItems
              });
          },
      }

})
