// component/input-bar/inputBarComponet.js
Component({
  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    onTapEditText:function(){
      console.log('onTapEditText')
      wx.navigateTo({
        url: '../../pages/mine/productInsertText/productInsertText?page=addResource',
        success: res => {
        },
        fail: res => {
        },
        complete: res => {
        }
      })
    },
      onTapUpLoadFile:function(){
          console.log('onTapUpLoadFile');
        wx.downloadFile((res)=>{
            consloe.log(res)
        })
      },
  }
})
