const qiniuUploader = require("../../../utils/qiniuUploader");
let cropper = require('../../../welCropper/welCropper.js');
// 获取显示区域长宽
// const device = wx.getSystemInfoSync()
// const W = device.windowWidth
// const H = device.windowHeight - 100
var app=getApp();
Page({
    data: {
        uptoken:'',
        domain:'',
        imageList:[],
        cardInfo:[]
    },
    onLoad: function () {
        var that = this
        // 初始化组件数据和绑定事件
        const device = wx.getSystemInfoSync()
        const W = device.windowWidth
        const H = device.windowHeight - 50
        cropper.init.apply(that, [W, H]);
        console.log(device);
        this.getuptoken();
    },
    getuptoken(){
        var that=this;
        wx.request({
          url: app.data.apiurl+'applets/uptoken',
          data: {},
          header: {
              'content-type': 'application/json' // 默认值
          },
          success: function(res) {
            that.setData({
              uptoken:res.data.entity.uptoken,domain:res.data.entity.domain
            });
          }
        })
    },
    selectTap(e) {
        let that = this
        let mode = e.currentTarget.dataset.mode
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success(res) {
                console.log(res);
                const tempFilePath = res.tempFilePaths[0];
                // 将选取图片传入cropper，并显示cropper
                // mode=rectangle 返回图片path
                // mode=quadrangle 返回4个点的坐标，并不返回图片。这个模式需要配合后台使用，用于perspective correction
                // let modes = ["rectangle", "quadrangle"]
                // let mode = modes[1]   //rectangle, quadrangle
                that.showCropper({
                    src: tempFilePath,
                    mode: mode,
                    sizeType: [ 'compressed'],   //'original'(default) | 'compressed'
                    callback: (res) => {
                        if (mode == 'rectangle') {
                            var uploadImage = res;
                            qiniuUploader.upload(res, (res) => {
                              console.log(res);
                              //传服务器
                              wx.request({
                                url: app.data.apiurl+'applets/picture',
                                data: {imageUrl:"https://"+res.imageURL},
                                header: {
                                    'content-type': 'application/json' // 默认值
                                },
                                success: function(res) {
                                  console.log(res);
                                  that.setData({
                                    cardInfo:res.data.entity.cardInfo
                                  });
                                  wx.setStorageSync('ocrCardInfo', that.data.cardInfo);
                                  console.log(that.data.cardInfo)
                                  wx.hideLoading({
                                      title: '正在截取...',
                                  })
                                  // 改成覆盖跳转
                                  // wx.navigateTo({
                                  //   url: '../businessInfo/businessInfo'
                                  // })

                                   wx.redirectTo ({
                                    url: '../businessInfo/businessInfo'
                                  })


                                }
                              })

                              console.log('上传成功了');
                            }, (error) => {
                              console.log('error: ' + error);
                            }, {
                                region: 'ECN',
                              uploadURL: 'https://touch.hopechina.cc',
                              domain: that.data.domain,
                              uptoken: that.data.uptoken,
                            })
                        }
                        else {
                            wx.showModal({
                                title: '',
                                content: JSON.stringify(res),
                            })

                            console.log(res)
                        }
                        // that.hideCropper() //隐藏，我在项目里是点击完成就上传，所以如果回调是上传，那么隐藏掉就行了，不用previewImage
                    }
                })
            }
        })
    },
    onPullDownRefresh: function () {
        wx.startPullDownRefresh()
    },
    tobusinessInfo:function(){
        wx.navigateTo({
          url: '../businessInfo/businessInfo'
        })
    },
})
