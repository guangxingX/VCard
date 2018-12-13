var city = require('../../../utils/city.js');
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
var app=getApp();
Page({
data: {
  industryList:[],
  hotCityList:[],
  industryId:'',
  selected:false,


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
    hotCityList:[],
    tagList:[],
    newTagListArr:[]
},

getAllIndustryData:function () {
  var that = this;
    wx.request({
    url:app.data.apiurl+'applets/industryList',
    header: {
        'content-type': 'application/json' // 默认值
    },
    success: function(res) {
      console.log(res);
      if(res.statusCode==200){
        console.log(res.data)
        if(res.data.success==0){
          wx.hideLoading({});
          //行业数据
          var industryData = res.data.entity.industryList;

          var charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          var allDataArr = [];
          var tempTagList=[];
          for(var j=0;j<charStr.length;j++){
              var newArr = new Array();
              allDataArr.push(newArr)
          }

          for(var i=0;i<industryData.length;i++){
              var item = industryData[i];
              for(var m=0;m<charStr.length;m++){
                 if(item.pinyin==charStr[m]){
                   tempTagList.push(charStr[m])
                    allDataArr[m].push(item)
                  }
              }
          }

          // that.setData({
          //   industryList:allDataArr,
          //   hotCityList:res.data.entity.hotList,
          //   tagList:tempTagList,
          //   newTagListArr:newTagListArr
          // });

          // 对tempTagList去重,并排序
            var newTagListArr = that.arrayDuplicateRemoval(tempTagList).sort();

            var tempHotList = res.data.entity.hotList;
            tempHotList.unshift({id:'', name: "全部行业"})

            that.setData({
              industryList:allDataArr,
              hotCityList:res.data.entity.hotList,
              tagList:tempTagList,
              newTagListArr:newTagListArr
            });
            // 生命周期函数--监听页面加载
              // var searchLetter = city.searchLetter;
              var searchLetter = that.data.newTagListArr;
              var cityList = city.cityList();
              // console.log(cityInfo);

              console.log('新的searchLetter')
              console.log(searchLetter)
              console.log(that.data.newTagListArr)
              console.log('新的searchLetter')

              var sysInfo = wx.getSystemInfoSync();
              console.log(sysInfo);
              var winHeight = sysInfo.windowHeight;


               var itemH = winHeight / searchLetter.length;
              var tempObj = [];
              for (var i = 0; i < searchLetter.length; i++) {
                var temp = {};
                temp.name = searchLetter[i];
                temp.tHeight = i * itemH;
                temp.bHeight = (i + 1) * itemH;

                tempObj.push(temp)
              }

              that.setData({
                winHeight: winHeight,
                itemH: itemH,
                searchLetter: tempObj,
                cityList: cityList
              })
              console.log(that.data.cityInfo);
              qqmapsdk = new QQMapWX({
                  key: 'ZKCBZ-KPG3X-CMR43-77774-HOTTO-CPFSZ'
              });

              that.setData({
                winHeight: winHeight,
                itemH: itemH
                // cityList: cityList
              })
              console.log(that.data.cityInfo);
              qqmapsdk = new QQMapWX({
                  key: 'ZKCBZ-KPG3X-CMR43-77774-HOTTO-CPFSZ'
              });
        }else{
          wx.showToast({
            title: res.data.message,
            image:'../../../assets/images/icon/error-fff.png',
            duration: 2000
          })
        }
      }else{
        wx.showToast({
          title: '加载失败',
          image:'../../../assets/images/icon/error-fff.png',
          duration: 2000
        })
      }
    },
    fail(){
      wx.showToast({
        title: '加载失败',
        image:'../../../assets/images/icon/error-fff.png',
        duration: 2000
      })
    },
    complete(){

    }
  })

},
//数组去重方法
 arrayDuplicateRemoval:function (array) {
     var res = [];
     var json = {};
     for(var i = 0; i < array.length; i++){
      if(!json[array[i]]){
       res.push(array[i]);
       json[array[i]] = 1;
      }
     }
     return res;
},

bindIndustryHost:function (e) {
    //  this.setData({
    //   industryId:e.currentTarget.industry.id
    // })

    console.log('bindIndustryHost')
    console.log(e)
    console.log('bindIndustryHost')
     this.goSearch(e)
},
bindIndustry:function (e) {
    // this.setData({
    //   industryId:e.currentTarget.industry.id
    // })

    // console.log('bindIndustry')
    // console.log('e')
    // console.log('bindIndustry')

    this.goSearch(e)
},
goSearch:function (e) {
  // console.log('goSearch')
  // console.log(e)
  var industryId = e.currentTarget.dataset.industry.id;
  var industryName = e.currentTarget.dataset.industry.name;
  // console.log(industryName);
  // console.log(industryId)
  // console.log('goSearch')



    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]

    // console.log('prevPage');
    // console.log(prevPage);
    // console.log('prevPage');
    if(prevPage.route=="pages/maillist/maillistIndex/maillist" || prevPage.route=="pages/maillist/AllEnterprises/AllEnterprises"){
      wx.navigateTo({
        url: "../searchCompanyWithIndustry/searchCompanyWithIndustry?industryId="+industryId+"&industryName="+industryName,
        success: res => {
        },
        fail: res => {
        },
        complete: res => {
        }
      })
    }else{
      prevPage.setData({industryId:industryId,qualityEnterprise:[],industryName:industryName});
      wx.navigateBack({
        delta: 1
      });
    }

},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getAllIndustryData();
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
  searchStart: function (e) {
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

    console.log(this.data.newTagListArr)
    console.log('showLetter')
    console.log(showLetter)
    console.log('showLetter')

    var scrollTop = 0;
    var cityList = this.data.newTagListArr;
    var cityCount = 0;
    var initialCount = 0;
    for (var i = 0; i < cityList.length; i++) {
      if (showLetter == cityList[i]) {
        scrollTop = initialCount * 80 + cityCount * 46;
        break;
      } else {
        initialCount++;
        // cityCount += cityList[i].cityInfo.length;
        cityCount += cityList[i].length;
      }
    }

    that.setData({
      scrollTop: scrollTop
    })
  },
  isInarr:function (arr, obj) {
    let i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
        return true;
      }
    }
    return false;
  },
})
