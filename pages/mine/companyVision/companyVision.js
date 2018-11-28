// pages/mine/companyVision/companyVision.js
const qiniuUploader = require("../../../utils/qiniuUploader");
var app=getApp();
Page({
  data: {
    ImageTextItem:[],
    uptoken:'',
    domain:'',
    companyId:'',
    type:1,
    movableViewPosition:{
        x:0,
        y:0,
        className:"hidden",
        data:{}
    },
    scrollPosition:{
        everyOptionCell:100,
        top:0,
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
  getdata(){
    var that = this;
    wx.request({
      url: app.data.apiurl+'applets/myCompanyIntro',
      data: {
        type: that.data.type,
        companyId: that.data.companyId,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data.success == 0) {
            that.setData({ImageTextItem:res.data.entity.intro});
            that.data.ImageTextItem.forEach(function(item,index,arr){
              item.sDtSecCode=index+1;
            });
            that.setData({ImageTextItem:that.data.ImageTextItem});
          }
        }
      },
      fail:function(){
        wx.showToast({
          title: '提交失败',
          image:'../../../assets/images/icon/error-fff.png',
          duration: 2000
        })
      }
    })
  },
  savedata(){
    var that = this;
    console.log("点击了保存");
    if(that.data.ImageTextItem.length>0){
      wx.request({
        url: app.data.apiurl+'applets/updateCompanyIntro',
        data: {
          type: that.data.type,
          intro:JSON.stringify(that.data.ImageTextItem),
          companyId: that.data.companyId,
        },
        header: {
          'content-type':  "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          if (res.statusCode == 200) {
            if (res.data.success == 0) {
              console.log(res);
              wx.showToast({
                title: '编辑成功',
                 icon: 'success',
                duration: 2000
              })
              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 2]
              wx.navigateBack({
                delta: 1
              });
            }
          }
        },
        fail:function(){
          wx.showToast({
            title: '提交失败',
            image:'../../../assets/images/icon/error-fff.png',
            duration: 2000
          })
        }
      })
    }else{
      setTimeout(function(){
        that.setData({errorshow:false})
      },1000)
      this.setData({errorshow:true,failuretip:'保存内容不能为空'});
    }
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
        console.log(that.data.uptoken)
      }
    })
  },
  deleteRow(e){
    var index=e.currentTarget.dataset.index;
    this.data.ImageTextItem.splice(index,1);
    this.setData({ImageTextItem:this.data.ImageTextItem});
  },
  insertText(){
    wx.navigateTo({
      url: '../productInsertText/productInsertText?page=companyVision',
      success: res => {
      },
      fail: res => {
      },
      complete: res => {
      }
    })
  },
  insertImage(e) {
    let that = this;
    let mode = e.currentTarget.dataset.mode
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        qiniuUploader.upload(res.tempFilePaths[0], (res) => {
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
  bindscroll:function (event) {
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
        console.log("开始的"+moveDistance);
        console.log("选中的"+selectPosition)
        console.log(moveDistance - selectPosition);
        console.log("selectIndex==="+selectIndex)
        console.log("event.changedTouches:",event.changedTouches);
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
    this.setData({type:options.type,companyId:options.id});
    this.getdata()
    if(this.data.type==1){
      wx.setNavigationBarTitle({
        title: '公司介绍'
      })
    }else if(this.data.type==2){
      wx.setNavigationBarTitle({
        title: '公司愿景'
      })
    }else if(this.data.type==3){
      wx.setNavigationBarTitle({
        title: '公司使命'
      })
    }else if(this.data.type==4){
      wx.setNavigationBarTitle({
        title: '经营理念'
      })
    }else if(this.data.type==5){
      wx.setNavigationBarTitle({
        title: '公司价值观'
      })
    }
    this.getuptoken();
      var systemInfo= wx.getSystemInfoSync();
      var scrollViewHeight = systemInfo.windowHeight*(1-146/603);
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
