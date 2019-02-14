import {
    DATAMODULE
} from "../../../module/data.js";
import {
    programemodule
} from "../../../module/programe";

const dataModule = new DATAMODULE
const programe = new programemodule

const qiniuUploader = require("../../../utils/qiniuUploader");

// pages/financial/upvideo/index.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isup:false,//显示视频
      videoUrl:'',//视频路径
      name:'',//视频名字
      uptoken:'',//上传的token
      domain:'',//
      src:'',//
      pid:'-1',
      isok:true,
  },
    onSave(){

      if(this.data.isok){
          console.log(this.data.videoUrl);
          console.log(this.data.name)
          programe.postvideo(this.data.pid,this.data.name,this.data.videoUrl).then(res=>{
              console.log(res);
              programe.saveSucceed();
          })
      }else {
          wx.showToast({
              title: "上传视频中，请稍等",
              icon:'none',
              duration: 2000
          })
      }
        // console.log(this.data.src);

    },
    onInput(e){
        console.log(e.detail.value);
        this.setData({
            name:e.detail.value,
        })
    },
    format(obj) {
        return '{\n' +
            Object.keys(obj).map(function (key) { return '  ' + key + ': ' + obj[key] + ',' }).join('\n') + '\n' +
            '}'
    },
    chooseVideo() {
        this.setData({
            info: ''
        })
        wx.chooseVideo({
            sourceType: ['album', 'camera'],
            compressed: true,
            maxDuration: 60,
            success: (res) => {
                this.setData({
                    src: res.tempFilePath,
                    info: this.format(res)
                })
            },
            fail: (res) => {
                this.setData({
                    info: this.format(res)
                })
            }
        })
    },
    onUpVideo(){
        var that = this
        this.setData({
            isok:false,
        })
        wx.showLoading({
            title: '上传中',
        })
        wx.chooseVideo(
            // {
            //     sourceType: ['album', 'camera'],
            //     compressed: true,
            //     maxDuration: 60,
            //     success: function (res) {
            //         that.setData({
            //             src: res.tempFilePath,
            //
            //         })
            //     }
            //     ,
            //     fail: (res) => {
            //         console.log(res)
            //         // this.setData({
            //         //     info:
            //         // })
            //     }
            // }

            {
            sourceType: ['album', 'camera'],
            compressed: false,
            maxDuration: 60,
            camera: 'back',
            success: function(res) {
              consoel.log(1)
                qiniuUploader.upload(res.tempFilePath, (res) => {
                    console.log(res.imageURL);
                    that.setData({
                        videoUrl: 'https://' + res.imageURL,
                        isok:true,
                    });
                    wx.hideLoading()
                    wx.showToast({
                        title: "上传视频成功",
                        icon:'none',
                        duration: 2000
                    })

                }, (error) => {
                  wx.hideLoading()
                    wx.showToast({
                        title: "上传视频失败",
                        icon:'none',
                        duration: 2000
                    })
                    console.log('error: ' + error);
                }, {
                    region: 'ECN',
                    uploadURL: 'https://touch.hopechina.cc',
                    domain: that.data.domain,
                    uptoken: that.data.uptoken,
                })
            },
            fail:function(res){
              console.log(res)
              wx.hideLoading()
            }
        }

        )
    },
  /**
   * 生命周期函数--监听页面加载
   */
  _init() {
      dataModule.getUptoken().then(res => {
          this.setData({
              uptoken: res.uptoken,
              domain: res.domain
          })
      })
  },
  onLoad: function (options) {
      console.log(options);
        this.setData({
            pid:options.pid,
        })
      if(options.url!=''){
          this.setData({
              videoUrl:options.url,
              isup:true,
          })
      }
      if(options.name!=''){
          this.setData({
              name:options.name,
          })
      }
        this._init()


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      let myurl ='https://oe75tqwfd.qnssl.com/tmp/wxd3981676414fcf99..xGwXnUTBU40O2a34126b49787f60ed9a1d7bd070eebe.mp4'

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
