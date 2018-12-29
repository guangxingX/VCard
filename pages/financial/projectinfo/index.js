// pages/financial/projectinfo/index.js
import {programemodule} from "../../../module/programe";
const programe = new programemodule
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    text:'',
    tag:'请选择项目标签',
      title:'',
      id:'-1',//缓存userid
      isShowTag:false,//显示行业
      tagId:'',//缓存标签id
      pid:'-1',//缓存 projectId
      isNew:false,//识别是否新建否则走创建接口
  },
    onTapindustry(e){
      console.log(e.detail)
        let tagData = e.detail
        let tag = []
        let tagId = []
        tagData.forEach(item=>{

            tag.push(item.name)
            tagId.push(item.id)

        })
        tag = tag.join(',')
        tagId = tagId.join(',')
        this.setData({
            isShowTag:false,
            tag,
            tagId,
        })
    },
  onInputText(e){
    console.log(e.detail.value)
    this.setData({
      text: e.detail.value
    })
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: [].concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    console.log(1)
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
    onInput(e){
        console.log(e.detail.value);
        this.setData({
            title:e.detail.value
        })
    },
    onSelectlabel(){
    console.log('onSelectlabel')
      this.setData({
          isShowTag:true,
      })
    },
    onSave(){
        console.log(this.data.title)
        console.log(this.data.files)
        console.log(this.data.text)
        console.log(this.data.tagId)


        if(!this.data.files[0]){
          wx.showToast({
            title: '请先填写logo',
              icon:'none'
          })
          return
        }

        if(!this.data.title){
            wx.showToast({
                title: '请先填写项目名称',
                icon:'none'
            })
            return
        }

        if(!this.data.text){
            wx.showToast({
                title: '请先填写项目简介',
                icon:'none'
            })
            return
        }
        if(!this.data.tagId){
            wx.showToast({
                title: '至少选择一个项目标签',
                icon:'none'
            })
            return
        }
        //新项目走创建项目的接口
        if(this.data.isNew){
            programe.postcreateProject(
                this.data.id,
                this.data.title,
                this.data.tagId,
                this.data.text,
                this.data.files[0],

            ).then(res=>{
                console.log(res);

                //需要设置前一页 变成不是新建 并传过去创建的pid
                var pages = getCurrentPages();
                console.log(pages)
                var prevPage = pages[pages.length-2];
                console.log(prevPage)
                prevPage.setData({
                    isNew:false,
                    pid:res.id
                })
                wx.navigateBack()
                wx.showToast({
                    title: '保存成功',
                    duration:2000,
                    icon:'none'

                })
            })
        }else {

            programe.setProjectName(this.data.pid,
                this.data.files[0],
                this.data.title,
                this.data.tagId,
                this.data.text
                ).then(res=>{
                wx.navigateBack()
                wx.showToast({
                    title: '保存成功',
                    duration:2000,
                    icon:'none'

                })
            })
        }

    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);

      //userId
      this.setData({
          id:options.id
      })

      if(options.type=='new'){
          this.setData({
              isNew:true
          })
      }else {
          //编辑逻辑
          if(options.pid){
              this.setData({
                  pid:options.pid
              })
          }else {
              return
          }
          if(options.title){
              this.setData({
                  title:options.title
              })
          }
          if(options.logo){
              // 让url显示
              console.log(options.logo)
              this.setData({
                  files:[options.logo]
              })
          }
          if(options.Intro){
              console.log(options.Intro)
              let text = JSON.parse(options.Intro)
              this.setData({
                  text,
              })
          }
      }
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
