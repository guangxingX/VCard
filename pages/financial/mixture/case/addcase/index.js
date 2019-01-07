// pages/financial/saveInstitutions/idea/index.js
// import { lookforsbmodule } from "../../../../../module/lookforsb";
// var lookforsb = new lookforsbmodule
import {programemodule} from "../../../../../module/programe";
const programe = new programemodule
Page({

  /**
   * 页面的初始数据
   */
  data: {
      ImageTextItem:[],//图文的信息
      pid:'-1',
      istextimg:false,//显示图文
      caseName:'',
      _case:{},//缓存
      mycase:{},//本次修改的对象
      index:0,//索引
      type:'-1',
  },
    onInput(e){
        // console.log(e.detail.value);
        this.setData({
            caseName:e.detail.value
        })
    },
    onTaptextimg(){
      this.setData({
          istextimg:true
      })
    },
    onTapSaveAll(){
        var data = this.data._case
        // console.log(this.data.index)
        if(this.data.index == -1){
          data[data.length] ={
            imageText: this.data.ImageTextItem,
            caseName: this.data.caseName
          }

        }else{
          data[this.data.index].imageText = this.data.ImageTextItem
          data[this.data.index].caseName = this.data.caseName
        }

        programe.postsaveImageTextDatta(this.data.pid , this.data.type,null,data).then(res=>{
            console.log(res);
            programe.saveSucceed()
        })

        // if(this.data.type==2){
        //     //保存投资人
        //     lookforsb.setPeopleCase(this.data.id,data).then(res=>{
        //         wx.navigateBack({})
        //         wx.showToast({
        //             title: '保存成功'
        //         })
        //     })
        // }else{
        //     // 保存机构
        //     lookforsb.setinstitutionsCase(this.data.id,data).then(res=>{
        //
        //         wx.navigateBack({})
        //         wx.showToast({
        //             title: '保存成功'
        //         })
        //     })
        // }

    },
    onTapSave(e){
        console.log(e)
        this.setData({
            istextimg:false
        })
        // console.log(e.detail.ImageTextItem);
        // console.log(this.data.ImageTextItem);
        // console.log(1)
        this.setData({
            ImageTextItem:e.detail.ImageTextItem,
        })
        let mycase=[]
        // mycase.push({
        //     caseName:''
        // })
        wx.showToast({
            title: '保存成功'
        })

    },
    onTapView(){
        console.log(2)
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // console.log(options)
      let {index=-1 ,mycase='', } = options
       index =  Number(index)
      // console.log(index);
      let _case = JSON.parse(mycase)

      // console.log(_case)
      mycase =  _case[index] || {}
      // console.log(mycase)
      const type = options.type
      // console.log(type)
      // console.log(options.mycase)
      if( mycase && mycase.imageText ){
          var ImageTextItem =  mycase.imageText
      }else {
          var ImageTextItem = []
      }
      let caseName = mycase.caseName || ''
      console.log(ImageTextItem);
      this.setData({
          index,
          pid:options.pid,
          _case,
          mycase,
          ImageTextItem,
          caseName:caseName,
          type,
      })
      if(options.index){
            // console.log(options.index)
      }
      // lookforsb.getinstitutionsImageText_money(options.id).then(res=>{
      //     console.log(res);
      //     this.setData({
      //         ImageTextItem:res.imageText
      //     })
      // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
