// component/card-headalone/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
        cardinfo:Object,
      projectNum:String,
      isShowFooter:{
            type:Boolean,
          value:true
      }

  },

  /**
   * 组件的初始数据
   */
  data: {
      photoWhite: "/assets/images/icon/icon-phone.png",
      emailWhite: "/assets/images/icon/icon-email.png",
      addressWhite: "/assets/images/icon/icon-address.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
