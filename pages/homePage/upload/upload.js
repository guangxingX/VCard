import weCropper from '../../../welCropper/weCropper.js'
const qiniuUploader = require("../../../utils/qiniuUploader");

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight -50
console.log(device);
var app=getApp();
Page({
  data:  {
    issubmit:true,
    uptoken:'',
    domain:'',
  	cropperOpt: {
			id: 'cropper',
			width,
			height,
			scale: 2.5,
			zoom: 8,
			cut: {
				x: (width - 300) / 2,
				y: (height - 300) / 2,
				width: 300,
				height: 300
			}
		}
	},
  touchStart (e) {
    this.wecropper.touchStart(e)
  },
  touchMove (e) {
    this.wecropper.touchMove(e)
  },
  touchEnd (e) {
    this.wecropper.touchEnd(e)
  },

  getCropperImage () {
    if(this.data.issubmit){
       this.setData({issubmit:false});
      console.log('getCropperImage')
      var that=this;
      this.wecropper.getCropperImage((avatar) => {
        if (avatar) {
          //  获取到裁剪后的图片
          console.log(avatar);
          qiniuUploader.upload(avatar, (res) => {
            console.log('上传成功了');
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2]
            prevPage.setData({avatar:'https://'+res.imageURL});
            wx.navigateBack({
              delta: 1
            })
          }, (error) => {
            console.log('error: ' + error);
          }, {
            region: 'ECN',
            uploadURL: 'https://touch.hopechina.cc',
            domain: that.data.domain,
            uptoken: that.data.uptoken,
          })

        } else {
          that.setData({issubmit:true});
          console.log('获取图片失败，请稍后重试')
        }
        // setTimeout(function(){
        //   that.setData({issubmit:true});
        // },500)
      })
    }
  },
  uploadTap () {

    console.log('uploadTap')

  	const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        let src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

				self.wecropper.pushOrign(src)
      }
    })
  },
  onLoad (option) {
    // do something
    console.log('onload')

    this.getuptoken();
		const { cropperOpt } = this.data
    const { src } = option
    if (src) {
      Object.assign(cropperOpt, { src })
			new weCropper(cropperOpt)
				.on('ready', function (ctx) {
					console.log(`wecropper is ready for work!`)
				})
				.on('beforeImageLoad', (ctx) => {
					console.log(`before picture loaded, i can do something`)
					console.log(`current canvas context:`, ctx)
					wx.showToast({
						title: '上传中',
						icon: 'loading',
						duration: 20000
					})
				})
				.on('imageLoad', (ctx) => {
					console.log(`picture loaded`)
					console.log(`current canvas context:`, ctx)
					wx.hideToast()
				})
    }
  },
  getuptoken(){
    console.log('gettoken')

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
  }
})
