var city = require('../../../utils/city.js');
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
const device = wx.getSystemInfoSync()
const W = device.windowWidth
const H = device.windowHeight
console.log(device)
Page({
  data: {
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    tHeight: 0,
    bHeight: 0,
    startPageY: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,
    city: "",
    cityCountStepNum:46,
    initialCountStepNum:45,
    isIosPlatform:1,
    hotCityList:[
    { "id": "-1", "provincecode": "", "city": "全国", "code": "", "initial": "" },
    { "id": "1","provincecode": "110000","city": "北京市","code": "110100","initial": "B"},
    { "id": "344", "provincecode": "310000", "city": "上海市", "code": "310000", "initial": "S" },
    { "id": "87","provincecode": "330000","city": "杭州市","code": "330100","initial": "H" },
    { "id": "199",
        "provincecode": "440000",
        "city": "深圳市",
        "code": "440300",
        "initial": "S"},
    { "id": "197",
        "provincecode": "440000",
        "city": "广州市",
        "code": "440100",
        "initial": "G" },
    { "id": "238",
        "provincecode": "510000",
        "city": "成都市",
        "code": "510100",
        "initial": "C"},
    { "id": "74",
        "provincecode": "320000",
        "city": "南京市",
        "code": "320100",
        "initial": "N"},
    { "id": "169",
        "provincecode": "420000",
        "city": "武汉市",
        "code": "420100",
        "initial": "W" },
    {
        "id": "343",
        "provincecode": "120000",
        "city": "天津市",
        "code": "120100",
        "initial": "T"
    },
    {
        "id": "291",
        "provincecode": "610000",
        "city": "西安市",
        "code": "610100",
        "initial": "X"
    },
    {
        "id": "78",
        "provincecode": "320000",
        "city": "苏州市",
        "code": "320500",
        "initial": "S"
    },
    ]
  },
  onLoad: function (options) {
    var self = this;
    wx.getSystemInfo({
      success: function(res) {
        // 是ios版本
        // 原来：cityCountStepNum:46,initialCountStepNum:45

        if(res.platform.indexOf('ios') != -1){
          console.log('ios版本')
          self.setData({
            isIosPlatform:1,
            cityCountStepNum:46,
            initialCountStepNum:40
          })
        }else{
          console.log('其他版本')
          self.setData({
            isIosPlatform:0,
            cityCountStepNum:46,
            initialCountStepNum:100
          })
        }
      }
    })



    // 生命周期函数--监听页面加载
    var searchLetter = city.searchLetter;
    var cityList = city.cityList();
    // console.log(cityInfo);

    var sysInfo = wx.getSystemInfoSync();
    console.log(sysInfo);
    var winHeight = sysInfo.windowHeight;

    //添加要匹配的字母范围值
    //1、更加屏幕高度设置子元素的高度
    var itemH = winHeight / searchLetter.length;
    var tempObj = [];
    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;

      tempObj.push(temp)
    }

    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj,
      cityList: cityList
    })
    console.log(this.data.cityInfo);
    qqmapsdk = new QQMapWX({
        key: 'ZKCBZ-KPG3X-CMR43-77774-HOTTO-CPFSZ'
    });
    // this.getLocation();
  },
  getLocation: function () {
    var page = this
    wx.getLocation({
      type: 'wgs84',   //<span class="comment" style="margin: 0px; padding: 0px; border: none;">默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标</span><span style="margin: 0px; padding: 0px; border: none;"> </span>
      success: function (res) {
        // success
        var longitude = res.longitude
        var latitude = res.latitude
        page.loadCity(longitude, latitude)
        console.log(res.longitude+"++++"+res.latitude);
      }
    })
  },
  loadCity: function (longitude, latitude) {
    var that=this;
    qqmapsdk.reverseGeocoder({
      location: {
          latitude: latitude,
          longitude: longitude
      },
      success: function(res) {
          console.log(res);
          that.setData({city:res.result.address_component.city});
          console.log(that.data.city);
      },
      fail: function(res) {
          console.log(res);
      },
      complete: function(res) {
          console.log(res);
      }
    });
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  searchStart: function (e) {
    console.log("searchStart====fun");
    var showLetter = e.currentTarget.dataset.letter;
    var pageY = e.touches[0].pageY;
    this.setScrollTop(this, showLetter);
    this.nowLetter(pageY, this);
    this.setData({
      showLetter: showLetter,
      startPageY: pageY,
      isShowLetter: true,
    })
  },
  searchMove: function (e) {
    console.log("searchMove====fun");
    var pageY = e.touches[0].pageY;
    var startPageY = this.data.startPageY;
    var tHeight = this.data.tHeight;
    var bHeight = this.data.bHeight;
    var showLetter = 0;
    console.log(pageY);
    if (startPageY - pageY > 0) { //向上移动
      if (pageY < tHeight) {
        // showLetter=this.mateLetter(pageY,this);
        this.nowLetter(pageY, this);
      }
    } else {//向下移动
      if (pageY > bHeight) {
        // showLetter=this.mateLetter(pageY,this);
        this.nowLetter(pageY, this);
      }
    }
  },
  searchEnd: function (e) {
    console.log("searchEnd====fun");
    // console.log(e);
    // var showLetter=e.currentTarget.dataset.letter;
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)

  },
  nowLetter: function (pageY, that) {//当前选中的信息
    var letterData = this.data.searchLetter;
    var bHeight = 0;
    var tHeight = 0;
    var showLetter = "";
    for (var i = 0; i < letterData.length; i++) {
      if (letterData[i].tHeight <= pageY && pageY <= letterData[i].bHeight) {
        bHeight = letterData[i].bHeight;
        tHeight = letterData[i].tHeight;
        showLetter = letterData[i].name;
        break;
      }
    }

    this.setScrollTop(that, showLetter);

    that.setData({
      bHeight: bHeight,
      tHeight: tHeight,
      showLetter: showLetter,
      startPageY: pageY
    })
  },
  bindScroll: function (e) {
    console.log(e.detail)
  },
  setScrollTop: function (that, showLetter) {
    var scrollTop = 0;
    var cityList = that.data.cityList;
    var cityCount = 0;

    var initialCount = 0;
    for (var i = 0; i < cityList.length; i++) {
      if (showLetter == cityList[i].initial) {
        // scrollTop = initialCount* 45 + cityCount * 46 ;
        scrollTop = initialCount* this.data.initialCountStepNum + cityCount * this.data.cityCountStepNum ;
        console.log(initialCount);
        console.log(cityCount);
        console.log(scrollTop);
        break;
      } else {
        initialCount++;
        cityCount += cityList[i].cityInfo.length;
      }
    }

    that.setData({
      scrollTop: scrollTop
    })

    console.log('cityCount')
    // cityCount是点击某个索引后，该索引以上的城市个数
    console.log(cityCount)
    // initialCount是第几个索引，从0开始
    console.log(initialCount)
    console.log('cityCount')



  },
  bindCity: function (e) {
    var city = e.currentTarget.dataset.city;
    this.setData({ city: city });
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]
    console.log(city);
    if(city=="全国"){
      prevPage.setData({city:'',currentPage:1,qualityEnterprise:[]});
    }else{
      prevPage.setData({city:city,currentPage:1,qualityEnterprise:[]});
    }
    prevPage.getdata();
    wx.navigateBack({
      delta: 1
    });
  }
})