// pages/mine/addMyActive/addMyActive.js
const qiniuUploader = require("../../../utils/qiniuUploader");
var app=getApp();
Page({
  data: {
    errorshow:false,
    failuretip:'',
    uptoken: '',
    domain: '',
    tempFiles: '',
    tempFilePath: '',
    tempFilePaths:'',
    inputValue:'',
    content:'',
    demandClassValue:'',
    step1: true,
    step2: false,
    index:0,
    loading:false,
    ImageTextItem:[],
    companyList:[],
    companyName:'',
    companyId:'',
    activityStart:'',
    activityEnd:'',
    displayActivityStart:'',
    displayActivityEnd:'',
    address:'',
    mycardId:'',
    contactName:'',
    isonlyCard:false,
    //拖拽排序
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
  },
  prevstep(){
    this.setData({step1: true,step2: false})
  },
  tosetAddress(){
    wx.navigateTo({
      url: '../../homePage/choiseAdress/choiseAdress?page=addactive',
    })
  },
  tosetTime(){
    wx.navigateTo({
      url: '../selectRangeTime/selectRangeTime',
    })
  },
  changeDate(e){
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      activeData:this.data.companyList[e.detail.value].id,
      companyName:this.data.companyList[e.detail.value].name
    })
  },
   deleteRow(e){
    console.log(e.currentTarget.dataset.index);
    var index=e.currentTarget.dataset.index;
    this.data.ImageTextItem.splice(index,1);
    this.setData({ImageTextItem:this.data.ImageTextItem});
    console.log();
  },
  choiseCompany(e){
    wx.navigateTo({
      url: '../myCard/myCard',
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
  getuptoken() {
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/uptoken',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          uptoken: res.data.entity.uptoken,
          domain: res.data.entity.domain
        });
      }
    })
  },
  nextstep(e) {
    var that=this;
    setTimeout(function(){
      that.setData({errorshow:false})
    },1000)
    if(this.data.contactName==''||this.data.contactName=='选择联系人'){
      this.setData({errorshow:true,failuretip:'请选择联系人'});
    }else if(this.data.demandClassValue==''){
      this.setData({errorshow:true,failuretip:'请填写活动名称'});
    }else if(this.data.activityStart==''){
      this.setData({errorshow:true,failuretip:'请选择活动时间'});
    }else if(this.data.address==''){
      this.setData({errorshow:true,failuretip:'请填写地址'});
    }else if(this.data.tempFilePath==''){
      this.setData({errorshow:true,failuretip:'请上传活动图片'});
    }else{
      this.setData({
        step1: false,
        step2: true
      });
    }
  },
  choiseAdress: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  addIamge(e) {
    let that = this;
    let mode = e.currentTarget.dataset.mode
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        console.log(res);
        qiniuUploader.upload(res.tempFilePaths[0], (res) => {
          console.log(res.imageURL);
          that.data.ImageTextItem.push({
              image: 'http://'+res.imageURL
            })
          that.setData({
            ImageTextItem:that.data.ImageTextItem
          })
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
  uploadImage(e) {
    let that = this;
    let mode = e.currentTarget.dataset.mode
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        console.log(res);
        that.setData({
          tempFilePaths: res.tempFilePaths[0]
        })
        qiniuUploader.upload(res.tempFilePaths[0], (res) => {
          console.log(res.imageURL);
          that.setData({
            tempFilePath: 'http://'+res.imageURL
          })
        }, (error) => {
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
  addActivity: function (e) {
    var that = this;
    that.setData({
      loading:true
    })
    if(that.data.ImageTextItem.length>0){
      wx.request({
        url: app.data.apiurl+'applets/addActivity',
        data: {
          userId: app.globalData.userId,
          cardId:that.data.mycardId,
          name:that.data.demandClassValue,
          startTime:that.data.activityStart,
          endTime:that.data.activityEnd,
          address:that.data.address,
          exerImg:that.data.tempFilePath,
          description:JSON.stringify(that.data.ImageTextItem),
          exerMoney:90
        },
        header: {
          'content-type':  "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
           that.setData({
            loading:false
          })
          console.log(res);
          if (res.statusCode == 200) {
            if (res.data.success == 0) {
              console.log(res);
              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 2]
              if(prevPage){
                prevPage.setData({currentPage:1,currentPage1:1,currenttab:1,activityList1:[]});
                wx.navigateBack({
                  delta: 1
                });
              }else{
                wx.navigateTo({
                  url: '../myActive/myActive',
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
        }
      })
    }else{
       that.setData({
            loading:false
          })
      setTimeout(function(){
        that.setData({errorshow:false})
      },1000)
      this.setData({errorshow:true,failuretip:'活动详情不能为空'});
    }
  },
  toContent() {
    wx.navigateTo({
      url: '../productInsertText/productInsertText',
      success: res => {
      },
      fail: res => {
      },
      complete: res => {
      }
    })
  },
  bindscroll:function (event) {
    console.log(event);
        var scrollTop = event.detail.scrollTop;
        this.setData({
            'scrollPosition.scrollTop':scrollTop,
            scrollTopPostion:scrollTop
        })
    },
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
      console.log("************"+this.data.scrollPosition.top)
        var y = potions.y-this.data.scrollPosition.top+this.data.scrollPosition.scrollTop;
        console.log(y)
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
        console.log("firstTouchPosition:",firstTouchPosition);
        var domData = this.getPositionDomByXY(firstTouchPosition);
        console.log("domData:",domData);
        //movable-area滑块位置处理
        var movableX = 0;
        var movableY = firstTouchPosition.y-this.data.scrollPosition.top-this.data.scrollPosition.everyOptionCell/2;
        console.log(movableY);
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
        if(moveDistance - selectPosition > 0 && selectIndex < ImageTextItem.length - 1){
            if (ImageTextItem[selectIndex].sDtSecCode == selectItemInfo.sDtSecCode) {
                ImageTextItem.splice(selectIndex, 1);
                ImageTextItem.splice(++selectIndex, 0, selectItemInfo);
                selectPosition += everyOptionCell;

                console.log("scrollTopPostion+++++"+selectPosition)
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
    console.log("放手后");
      console.log(event);
      var ImageTextItem = this.optionsDataTranlate(this.data.ImageTextItem,"");
      console.log(ImageTextItem);
      this.setData({
          ImageTextItem:ImageTextItem,
          'scrollPosition.scrollY':true,
          'movableViewPosition.className':"hidden"
      })
      console.log(this.data.ImageTextItem);
  },
  optionsDataTranlate:function (optionsList,selectClass) {
      for(var i=0,j=optionsList.length;i<j;i++){
          optionsList[i].selectClass = selectClass;
      }
      return optionsList;
  },
  onLoad: function (options) {
    // if(!app.globalData.userId||app.globalData.userId==-1){
    //     wx.navigateTo({
    //       url: "../../logIn/phone/phone"
    //     });
    //   }
    this.getuptoken();
      var systemInfo= wx.getSystemInfoSync();
      // var optionsList = [{"sCode":"600879","sDtSecCode":"0101600879","sName":"航天电子",
      // "iUpdateTime":1496362315,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"00700","sDtSecCode":"020100700","sName":"腾讯控股","iUpdateTime":1495531418,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"000759","sDtSecCode":"0001000759","sName":"中百集团","iUpdateTime":1495531394,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"000651","sDtSecCode":"0001000651","sName":"格力电器","iUpdateTime":1495531384,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"600036","sDtSecCode":"0101600036","sName":"招商银行","iUpdateTime":1495153104,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"600518","sDtSecCode":"0101600518","sName":"康美药业","iUpdateTime":1495153089,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"601238","sDtSecCode":"0101601238","sName":"广汽集团","iUpdateTime":1495153077,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"601989","sDtSecCode":"0101601989","sName":"中国重工","iUpdateTime":1495153069,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"600519","sDtSecCode":"0101600519","sName":"贵州茅台","iUpdateTime":1495153058,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"002230","sDtSecCode":"0001002230","sName":"科大讯飞","iUpdateTime":1495152519,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"002431","sDtSecCode":"0001002431","sName":"棕榈股份","iUpdateTime":1494776256,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"01357","sDtSecCode":"020101357","sName":"美图公司","iUpdateTime":1494480437,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"300222","sDtSecCode":"0001300222","sName":"科大智能","iUpdateTime":1493777483,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"300131","sDtSecCode":"0001300131","sName":"英唐智控","iUpdateTime":1493777479,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"001696","sDtSecCode":"0001001696","sName":"宗申动力","iUpdateTime":1493777476,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"600503","sDtSecCode":"0101600503","sName":"华丽家族","iUpdateTime":1493777473,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"300154","sDtSecCode":"0001300154","sName":"瑞凌股份","iUpdateTime":1493177346,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"000001","sDtSecCode":"0105000001","sName":"上证指数","iUpdateTime":1492426642,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"300059","sDtSecCode":"0001300059","sName":"东方财富","iUpdateTime":1490074861,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"002616","sDtSecCode":"0001002616","sName":"长青集团","iUpdateTime":1487392877,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"002340","sDtSecCode":"0001002340","sName":"格林美  ","iUpdateTime":1485419729,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"600893","sDtSecCode":"0101600893","sName":"航发动力","iUpdateTime":1485147808,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"000768","sDtSecCode":"0001000768","sName":"中航飞机","iUpdateTime":1483949683,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"600677","sDtSecCode":"0101600677","sName":"航天通信","iUpdateTime":1483949677,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"600435","sDtSecCode":"0101600435","sName":"北方导航","iUpdateTime":1483763759,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"000738","sDtSecCode":"0001000738","sName":"航发控制","iUpdateTime":1483763742,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"600150","sDtSecCode":"0101600150","sName":"中国船舶","iUpdateTime":1483763697,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"HSI","sDtSecCode":"1605HSI","sName":"恒生指数","iUpdateTime":1483691814,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"000002","sDtSecCode":"0001000002","sName":"万  科Ａ","iUpdateTime":1483691798,"fNow":"--","sRate":"--","className":"block_wave block_stop"},{"sCode":"300104","sDtSecCode":"0001300104","sName":"乐视网  ","iUpdateTime":1483691763,"fNow":"--","sRate":"--","className":"block_wave block_stop"}];
      // optionsList = this.optionsDataTranlate(optionsList,"");
      // 开始加载页面
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
