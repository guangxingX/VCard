// pages/mine/mine/addResource/addResource.js
const qiniuUploader = require("../../../utils/qiniuUploader");
var app = getApp();
Page({
  data: {
    errorshow:false,
    failuretip:'',
    ImageTextItem:[],
    uptoken: '',
    domain: '',
    step1: true,
    step2: false,
    loading:false,
    index: 0,
    demandClassIndex: 0,
    inputValue: '',
    demandClassValue: '',
    mycardId:'',
    movableViewPosition:{
        x:0,
        y:0,
        className:"hidden",
        data:{}
    },
    scrollPosition:{
        everyOptionCell:100,
        top:47,
        scrollTop:0,
        scrollY:true,
        scrollViewHeight:1000,
        scrollViewWidth:375,
        windowViewHeight:1000,
    },
    selectItemInfo:{
        sName:"",
        sDtSecCode:"",
        sCode:"",
        selectIndex: -1,
        selectPosition:0,
    },
    rangeoption:0,
    supplySubjectList:'',
    checkedTypeId:'',
    checkedType:'',
    cardList:[],
    companyName:'',
    companyId:'',
    contactName:'',
    isonlyCard:false
  },
  prevstep(){
    this.setData({step1: true,step2: false})
  },
  choiseCompany(){
    wx.navigateTo({
      url: '../myCard/myCard',
    })
  },
  choisetype(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      checkedTypeId:this.data.supplySubjectList[e.detail.value].id,
      checkedType:this.data.supplySubjectList[e.detail.value].name
    })
  },
  getCardList(){
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/main',
      data: {userId:app.globalData.userId},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          cardList: res.data.entity.cardInfo,
        });
        if(res.data.entity.cardInfo.length==1){
          that.setData({isonlyCard:true,companyName:res.data.entity.cardInfo[0].companyName,
          contactName:res.data.entity.cardInfo[0].name,mycardId:res.data.entity.cardInfo[0].id});
        }else{
          that.setData({isonlyCard:false});
        }
      }
    })
  },
  getResourceType(){
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/subjectList',
      data: {cocId:10395},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          supplySubjectList: res.data.entity.supplySubjectList
        });
      }
    })
  },
  deleteRow(e){
    console.log(e.currentTarget.dataset.index);
    var index=e.currentTarget.dataset.index;
    this.data.ImageTextItem.splice(index,1);
    this.setData({ImageTextItem:this.data.ImageTextItem});
    console.log();
  },
  nextstep(e){
    var that=this;
    setTimeout(function(){
      that.setData({errorshow:false})
    },1000)
    if(this.data.contactName==''||this.data.contactName=='选择联系人'){
      this.setData({errorshow:true,failuretip:'请选择联系人'});
    }else if(this.data.demandClassValue==''){
      this.setData({errorshow:true,failuretip:'请填写资源名称'});
    }else if(this.data.checkedTypeId==''){
      this.setData({errorshow:true,failuretip:'请选择资源类型'});
    }else{
      this.setData({
        step1: false,
        step2: true
      });
    }
  },
  getuptoken() {
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/uptoken',
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          uptoken: res.data.entity.uptoken,
          domain: res.data.entity.domain
        });
        console.log(that.data.uptoken)
      }
    })
  },
  choiseAdress: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  demandClass: function (e) {
    console.log(e.detail.value)
    this.setData({
      demandClassIndex: e.detail.value
    })
    console.log(this.data.demandClassIndex)
    console.log(this.data.demandClass[this.data.demandClassIndex])
  },
  bindKeyInput: function (e) {

    var str = app.isHaveEmojiStr(e.detail.value)

    if (e.currentTarget.dataset.input == 0) {
      this.setData({
        // inputValue: e.detail.value
        inputValue: str
      })
    } else {
      this.setData({
        // demandClassValue: e.detail.value
        demandClassValue: str
      })
    }
  },
  addResource: function (e) {
    var that = this;
     that.setData({
      loading:true
    })
    console.log("点击了保存");
    console.log(that.data.ImageTextItem)
    console.log("点击了保存");

    if(that.data.ImageTextItem.length>0){
      console.log('开始提交')
      wx.request({
        url: app.data.apiurl+'applets/addDemand',
        data: {
          userId: app.globalData.userId,
          cardId:that.data.mycardId,
          demandName: that.data.demandClassValue,
          demandType: that.data.checkedTypeId,
          demandDescription: JSON.stringify(that.data.ImageTextItem),
          sadType: 0
        },
        header: {
          'content-type':  "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
           that.setData({
              loading:false
            })
          if (res.statusCode == 200) {
            if (res.data.success == 0) {
              console.log(res);
              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 2];
              if(prevPage){
                prevPage.setData({currentPage:1,sadList:[]});
                wx.navigateBack({
                  delta: 1
                });
              }else{
                wx.navigateTo({
                  url: '../myResource/myResource',
                  success: res => {
                  },
                  fail: res => {

                  },
                  complete: res => {

                  }
                })
              }

            }
          }
        },
        fail:function (res) {
          that.setData({
            loading:false
          })
          console.log('保存失败')
          console.log(res)
          console.log('保存失败')
        }
      })
    }else{
       that.setData({
          loading:false
        })
      setTimeout(function(){
        that.setData({errorshow:false})
      },1000)
      this.setData({errorshow:true,failuretip:'资源详情不能为空'});
    }
  },
  toContent() {
    wx.navigateTo({
      url: '../productInsertText/productInsertText?page=addResource',
      success: res => {
      },
      fail: res => {
      },
      complete: res => {
      }
    })
  },
  addIamge(e) {
    console.log('addIamge')
    let that = this;
    let mode = e.currentTarget.dataset.mode
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        qiniuUploader.upload(res.tempFilePaths[0], (res) => {
          var max=0;
          if(that.data.ImageTextItem.length>0){
            max = that.data.ImageTextItem[0].sDtSecCode;
            that.data.ImageTextItem.forEach(function(item,index,arr){
              if(item.sDtSecCode>max){
                max=item.sDtSecCode;
              }
            });
          }
          that.data.ImageTextItem.push({image:'https://'+res.imageURL,sDtSecCode:max+1});
          that.setData({ImageTextItem:that.data.ImageTextItem})
        }, (error) => {
          wx.showToast({
              title: "七牛云上传图片失败",
              image:'../../../assets/images/icon/error-fff.png',
              duration: 2000
            })
          console.log('error: ' + error);
        }, {
          region: 'ECN',
          uploadURL: 'https://touch.hopechina.cc',
          domain: that.data.domain,
          uptoken: that.data.uptoken,
        })

      }
    })
  },
    /**
     * 选择 / 拍摄视频
     * @author abei<abei@nai8.me>
     */
    addVideo: function () {
        var that = this
        wx.chooseVideo({
            sourceType: ['album', 'camera'],
            compressed: false,
            maxDuration: 60,
            camera: 'back',
            success: function (res) {
                // that.setData({
                //     video: res.tempFilePath,
                //     size: (res.size / (1024 * 1024)).toFixed(2)
                // })
                qiniuUploader.upload(res.tempFilePath, (res) => {
                    console.log(res.imageURL);
                    var max=0;
                    if(that.data.ImageTextItem.length>0){
                        max = that.data.ImageTextItem[0].sDtSecCode;
                        that.data.ImageTextItem.forEach(function(item,index,arr){
                            if(item.sDtSecCode>max){
                                max=item.sDtSecCode;
                            }
                        });
                    }
                    that.data.ImageTextItem.push({video:'https://'+res.imageURL,sDtSecCode:max+1});
                    that.setData({ImageTextItem:that.data.ImageTextItem})
                }, (error) => {
                    wx.showToast({
                        title: "七牛云上传图片失败",
                        image:'../../../assets/images/icon/error-fff.png',
                        duration: 2000
                    })
                    console.log('error: ' + error);
                }, {
                    region: 'ECN',
                    uploadURL: 'https://touch.hopechina.cc',
                    domain: that.data.domain,
                    uptoken: that.data.uptoken,
                })
            }
        })
    },
    bindscroll:function (event) {
        var scrollTop = event.detail.scrollTop;
        this.setData({
            'scrollPosition.scrollTop':scrollTop,
            scrollTopPostion:scrollTop
        })
  },
    //****/
    getOptionInfo:function (code) {
      for(var i=0,j=this.data.ImageTextItem.length;i<j;i++){
          var optionData= this.data.ImageTextItem[i];
          if(optionData.sDtSecCode == code){
              optionData.selectIndex = i;
              return optionData;
          }
      }
      return {};
  },
    getPositionDomByXY:function (potions) {
      var y = potions.y-this.data.scrollPosition.top+this.data.scrollPosition.scrollTop;
      var ImageTextItem = this.data.ImageTextItem;
      var everyOptionCell = this.data.scrollPosition.everyOptionCell;
      for(var i=0,j=ImageTextItem.length;i<j;i++){
          if(y>=i*everyOptionCell&&y<(i+1)*everyOptionCell){
            this.setData({rangeoption:y-i*everyOptionCell});
              return ImageTextItem[i];
          }
      }
      return ImageTextItem[0];
    },
    //拖拽时候实现数据变化
    draggleTouch:function (event) {
        var touchType = event.type;
        switch(touchType){
            case "touchstart":
                this.scrollTouchStart(event);
                break;
            case "touchmove":
                this.scrollTouchMove(event);
                break;
            case "touchend":
                this.scrollTouchEnd(event);
                break;
        }
    },
    scrollTouchStart:function (event) {
        // console.log(event);
        var firstTouchPosition = {
            x:event.changedTouches[0].pageX,
            y:event.changedTouches[0].pageY,
        }
        var domData = this.getPositionDomByXY(firstTouchPosition);//找到开始的dom
        //movable-area滑块位置处理
        var movableX = 0;
        var movableY = firstTouchPosition.y-this.data.scrollPosition.top-this.data.scrollPosition.everyOptionCell/2;
        this.setData({
            movableViewPosition:{
                x:movableX,
                y:movableY,
                className:"",
                data:domData
            }
        })
        var secCode = domData.sDtSecCode;
        var secInfo = this.getOptionInfo(secCode);
        secInfo.selectPosition =  event.changedTouches[0].clientY;
        secInfo.selectClass = "dragSelected";
        this.data.ImageTextItem[secInfo.selectIndex].selectClass = "dragSelected";
        var ImageTextItem = this.data.ImageTextItem;
        this.setData({
            'scrollPosition.scrollY':false,
            selectItemInfo:secInfo,
            ImageTextItem:ImageTextItem,
            'scrollPosition.selectIndex':secInfo.selectIndex
        })
    },
    scrollTouchMove:function (event) {
        var selectItemInfo = this.data.selectItemInfo;
        var selectPosition = selectItemInfo.selectPosition;
        var moveDistance   = event.changedTouches[0].clientY;
        var everyOptionCell = this.data.scrollPosition.everyOptionCell;
        var ImageTextItem = this.data.ImageTextItem;
        var selectIndex = selectItemInfo.selectIndex;
        //movable-area滑块位置处理
        var movableX = 0;
        var movableY = event.changedTouches[0].pageY-this.data.scrollPosition.top-this.data.scrollPosition.everyOptionCell/2;
        this.setData({
            movableViewPosition:{
                x:movableX,
                y:movableY,
                className:"",
                data:this.data.movableViewPosition.data
            }
        })
        // if(movableY>this.data.scrollPosition.scrollViewHeight&&ImageTextItem[selectIndex-1].selectClass = "dragSelected"){
        //         //   this.setData({'scrollPosition.scrollY':true,
        //         //   'scrollPosition.scrollTop':this.scrollPosition.scrollTop+everyOptionCell});
        //         //   this.setData({
        //         //     movableViewPosition:{
        //         //         x:movableX,
        //         //         y:this.data.scrollPosition.scrollViewHeight,
        //         //         className:"",
        //         //         data:this.data.movableViewPosition.data
        //         //     }
        //         // })
        //         console.log("超出yido动范围");
        //    }

        // 把选择的dom插入到应放的位置
        if(moveDistance - selectPosition > 0 && selectIndex < ImageTextItem.length - 1){
            if (ImageTextItem[selectIndex].sDtSecCode == selectItemInfo.sDtSecCode) {
                ImageTextItem.splice(selectIndex, 1);
                ImageTextItem.splice(++selectIndex, 0, selectItemInfo);
                selectPosition += everyOptionCell;
              }
        }

        if (moveDistance - selectPosition < 0 && selectIndex > 0) {
            if (ImageTextItem[selectIndex].sDtSecCode == selectItemInfo.sDtSecCode) {
                ImageTextItem.splice(selectIndex, 1);
                ImageTextItem.splice(--selectIndex, 0, selectItemInfo);
                selectPosition -= everyOptionCell;
            }
        }

        this.setData({
            'selectItemInfo.selectPosition': selectPosition,
            'selectItemInfo.selectIndex': selectIndex,
            ImageTextItem: ImageTextItem,
        });
    },
    scrollTouchEnd:function (event) {
        var ImageTextItem = this.optionsDataTranlate(this.data.ImageTextItem,"");//清除灰色背景
        this.setData({
            ImageTextItem:ImageTextItem,
            'scrollPosition.scrollY':true,
            'movableViewPosition.className':"hidden"
        })
    },
    optionsDataTranlate:function (optionsList,selectClass) {
        for(var i=0,j=optionsList.length;i<j;i++){
            optionsList[i].selectClass = selectClass;
        }
        return optionsList;
    },
    ///********/
    onLoad: function (options) {

      this.getuptoken();
      this.getResourceType();
        var systemInfo= wx.getSystemInfoSync();
        var scrollViewHeight = systemInfo.windowHeight*(1-196/603);
        var scrollViewWidth = systemInfo.windowWidth;
        this.setData({
            'scrollPosition.scrollViewWidth':scrollViewWidth,
            'scrollPosition.scrollViewHeight':scrollViewHeight,
            'scrollPosition.windowViewHeight':systemInfo.windowHeight,
        });
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
    setTimeout(function(){
      if(!app.globalData.userId||app.globalData.userId==-1){
        wx.navigateTo({
          url: "../../logIn/phone/phone"
        });
      }
    },1000);
    this.getCardList();
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
