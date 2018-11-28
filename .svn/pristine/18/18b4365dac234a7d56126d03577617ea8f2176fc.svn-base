var city = require('../../../utils/city.js');
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
var app=getApp();
Page({
  data: {
    companyId:'',
    //行业list
    industryList:[],
    storyIndustryList:[],
    selected:false,
    selectStyle:false,
    selelcttempArr:[],
    selelcttempLenght:0,
    moreThanTwoIndustry:false,
    overflowHiden:false,
    industryIdStr:'',
    industryNameStr:'',
    clickId:'',
    // 选中的行业
    industry:'',
    // 新增行业输入的行业
    inputIndustry:'',
    showMask:false,
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
    newTagListArr:[],
    // 已选择的行业个数
    seleNumber:0,
    // 上页面传来的已选中、接口给的行业数据
    industryArr:[]
  },
  onLoad: function (options) {
    var that=this;
    var companyId = options.id;
    that.setData({
      companyId:companyId,
      // cityList:cityList
    })
    // 去除出来的行业数据，以在此页面选中
    wx.getStorage({
      key:'fromEditIndustryArrKey',
      success:function (res) {
        that.setData({
          industryArr : res.data
        })
      }
    })
    //加载行业数据
    wx.showLoading({
      title: '加载中',
      mask:true
    })

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
            // 对tempTagList去重,并排序
            var newTagListArr = that.arrayDuplicateRemoval(tempTagList).sort();
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
              var sysInfo = wx.getSystemInfoSync();
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
              // this.getLocation();
              // 调用点击事件
              that.data.industryArr.forEach(function (item,index,arr) {
                that.bindIndustry(item,'auto')
              })
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


//数组去重
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
  getLocation: function () {
    var page = this
    wx.getLocation({
      type: 'wgs84',   //<span class="comment" style="margin: 0px; padding: 0px; border: none;">默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标</span><span style="margin: 0px; padding: 0px; border: none;"> </span>
      success: function (res) {
        var longitude = res.longitude
        var latitude = res.latitude
        page.loadCity(longitude, latitude)
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
          that.setData({city:res.result.address_component.city});
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
    console.log('选择行业页面隐藏')

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
    console.log('选择行业页面卸载')
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  // onShareAppMessage: function () {

  // },
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
    // console.log(pageY);
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
    var scrollTop = 0;
    var cityList = this.data.newTagListArr;
    var cityCount = 0;
    var initialCount = 0;
    for (var i = 0; i < cityList.length; i++) {
      if (showLetter == cityList[i]) {
        // scrollTop = initialCount * 80 + cityCount * 46;
        scrollTop = initialCount * 100 + cityCount * 46;
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
  // 单击了一个行业
  bindIndustry: function (e,auto) {
      var item = '';
      // 在改组中的位置
      var itemindex ='';
      if(auto=='auto'){
        //常规行业
        // if(e.pinyin){}
        var id = e.id;
        var name = e.name;
        // 行业非空数组，就是每个数组里面都已几个行业
        var noEmpetyArr = [];

        for(var a=0;a<this.data.industryList.length;a++){
          if(this.data.industryList[a].length){
            noEmpetyArr.push(this.data.industryList[a])
          }
        }
        for(var b=0;b<noEmpetyArr.length;b++){
          for(var c=0;c<noEmpetyArr[b].length;c++){
            if(id==noEmpetyArr[b][c].id){
              item = noEmpetyArr[b][c];
              itemindex = c;
            }

            // else{
            //   // 常规行业里没有的话，再去热门里找。这样的逻辑去找有可能导致选的是热门行业，但是自动选择的是
            //   this.bindIndustryHost:function(e,auto)
            // }
          }
        }
      }else{
        item = e.currentTarget.dataset.industry;
        // 在改组中的位置
        itemindex = e.currentTarget.dataset.itemindex;
      }
    // 在allDataArr中的位置
    var charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var titleStr = item.pinyin;
    var allDataArrIndex = 0;
    for(var i=0;i<charStr.length;i++){
      if(titleStr == charStr[i]){
        allDataArrIndex = i;
      }
    }
    var temp = !item.selected;
    // 选中
    if(!this.data.moreThanTwoIndustry && !item.selected){
      var willChangeItem = "industryList["+allDataArrIndex+"]["+itemindex+"].selected";
      this.setData({
       [willChangeItem]:true
      })
    }else if(this.data.moreThanTwoIndustry && !item.selected){
       wx.showToast({
        title:'最多四个行业！',
        image:'../../../assets/images/icon/error-fff.png',
        duration:2000,
        mask:true
      })
    }else{
      // 取消选中
      var willChangeItem = "industryList["+allDataArrIndex+"]["+itemindex+"].selected";
      this.setData({
       [willChangeItem]:false
      })
    }
    var tempItem = this.data.industryList[allDataArrIndex][itemindex];
    var arr = this.data.selelcttempArr;
    if(tempItem.selected){
      // 如果数组中有着一个行业，就不要在添加了
      // if(this.data.selelcttempArr.length){
      //   for(var d=0;d<this.data.selelcttempArr.length;d++){
      //     if(this.data.selelcttempArr[d].name == tempItem.name){
      //       //已包含
      //       wx.showToast({
      //         title:'已选择了该行业！',
      //         duration:1000
      //       })

      //       console.log('已经选择了该行业-常规')
      //       console.log(tempItem)
      //       console.log('已经选择了该行业-常规')
      //       tempItem.selected = false;
      //        this.setData({
      //          selelcttempArr:arr
      //       })
      //       return;
      //     }
      //   }
      // }

       arr.push(tempItem);
        this.setData({
           selelcttempArr:arr
        })
        // 数组长度为零时，直接放进来
        console.log('this.data.selelcttempArr.length')
        console.log(this.data.selelcttempArr.length)//1
        console.log('this.data.selelcttempArr.length')
    }else{
      console.log('+++++++++++++++++++++++++++++++++++++++++++')
      console.log(this.data.selelcttempArr)
      console.log('+++++++++++++++++++++++++++++++++++++++++++')
      for(var p=0;p<arr.length;p++){
        if(tempItem.id == arr[p].id){

            arr.splice(p,1)
            this.setData({
              selelcttempArr:arr
            })
          console.log('this.data.selelcttempArr+++++++++++++')
          console.log(this.data.selelcttempArr)
          console.log('this.data.selelcttempArr+++++++++++++')
        }
      }
    }
    console.log('最终的选择array')
    console.log(this.data.selelcttempArr)
    console.log('最终的选择array')

    // 设置已选择的行业长度
    this.setData({
      seleNumber:this.data.selelcttempArr.length
    })
    // if(this.data.selelcttempArr.length>=2){
    //     console.log('超过两个了xxxxxxxxxxxxxxxxxxxxxxxxxxx')
    //       wx.showToast({
    //         title:'最多两个行业！',
    //         image:'../../../assets/images/icon/error-fff.png',
    //         duration:2000,
    //         mask:true
    //       })

    //     return;
    // }

    var tempIndustryIdStr='';
    var tempIndustryNameStr='';
    for(var n=0;n<this.data.selelcttempArr.length;n++){
        tempIndustryIdStr += this.data.selelcttempArr[n].id;
        tempIndustryNameStr += this.data.selelcttempArr[n].name;

        if(n<this.data.selelcttempArr.length-1){
          tempIndustryIdStr+=',',
          tempIndustryNameStr+=','
        }
    }
    this.setData({
      industryIdStr : tempIndustryIdStr,
      industryNameStr : tempIndustryNameStr
    })

    console.log('选中的id、name str')
    console.log(this.data.industryIdStr)
    console.log(this.data.industryNameStr)
    console.log('选中的id、name str')

    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];

    prevPage.setData({
      industryIdStr:this.data.industryIdStr,
      industryCharStr:tempIndustryNameStr,
      industryArr:this.data.selelcttempArr
    });


    //选择2个
    // if(this.data.selelcttempArr.length>=2){
    // 选择4个
    if(this.data.selelcttempArr.length>=4){
        this.setData({
          moreThanTwoIndustry:true
        })

      // wx.showToast({
      //   title:'最多两个行业！',
      //   image:'../../../assets/images/icon/error-fff.png',
      //   duration:2000,
      //   mask:true
      // })


    }else{
      this.setData({
        moreThanTwoIndustry:false,
      })
    }

  },
  // 添加行业
  addhangye:function(){
      this.setData({
        showMask:true,
        overflowHiden:true
      })
  },
  // 返回
  completeBack:function () {
    wx.navigateBack({
      detail:1
    })
  },
  industryInputChange:function(e){
    console.log(e.detail.value)
    var str = e.detail.value;
    this.setData({
      inputIndustry:str
    })
  },
  cancleClick:function(){
     this.setData({
        showMask:false,
        industryIdStr:'',
        overflowHiden:false
      })
  },
  saveClick:function(){
    var that=this;
    console.log('点击了保存行业')
    console.log(that.data.inputIndustry)
    console.log(that.data.companyId)
    console.log('点击了保存行业')
    if(that.data.inputIndustry=='' || that.data.inputIndustry==null || that.data.inputIndustry.length<=0){
      wx.showToast({
        title:'请输入行业名称',
        image:'../../../assets/images/icon/error-fff.png',
        duration:1000
      })
      return;
    }

    wx.request({
      url:app.data.apiurl+'applets/addIndustry',
      data:{
        name:that.data.inputIndustry,
        companyId:that.data.companyId
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res);
        if(res.statusCode==200){
          console.log(res.data)
          if(res.data.success==0){
            console.log('保存陈宫')
            console.log(res.data)
            console.log('保存陈宫')
            that.setData({
              overflowHiden:false
            })
            wx.showLoading({
              title:'新增成功',
              mask:true
            })
            setTimeout(function(){
              wx.navigateBack({
                detail:1
              })
            },1000)

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
  // 点击了热门
  bindIndustryHost:function(e,auto){

    console.log('热门 auto')
    console.log(auto)
    console.log(this.data.hotCityList)
    console.log('热门 auto')




      var item = '';
      var itemindex ='';

      if(auto=='auto'){
        var id = e.id;
        var name = e.name;


          for(var d=0;d<this.data.hotCityList.length;d++){
            if(id==this.data.hotCityList[d].id){
              item = this.data.hotCityList[d];
              itemindex = d;
            }
          }


        console.log('热门-item=---itemindex')
        console.log(item)
        console.log(itemindex)
        console.log('热门-item=---itemindex')



      }else{
        item = e.currentTarget.dataset.industry;
        // 在改组中的位置
        itemindex = e.currentTarget.dataset.itemindex;
        console.log('改组中的位置')
        console.log(item)
        console.log(itemindex)
        console.log('改组中的位置')
      }



    var temp = !item.selected;
    if(!this.data.moreThanTwoIndustry && !item.selected){
      var willChangeItem = "hotCityList["+itemindex+"].selected";
      this.setData({
       [willChangeItem]:true
      })
    }else if(this.data.moreThanTwoIndustry && !item.selected){
       wx.showToast({
        title:'最多四个行业！',
        image:'../../../assets/images/icon/error-fff.png',
        duration:2000,
        mask:true
      })
    }else{
      console.log('进这一个')
      var willChangeItem = "hotCityList["+itemindex+"].selected";
      this.setData({
       [willChangeItem]:false
      })
    }
    var tempItem = this.data.hotCityList[itemindex];
    var arr = this.data.selelcttempArr;
    if(tempItem.selected){
       // 如果数组中有着一个行业，就不要在添加了
      // if(this.data.selelcttempArr.length){
      //   for(var f=0;f<this.data.selelcttempArr.length;f++){
      //     if(this.data.selelcttempArr[f].name == tempItem.name){
      //       //已包含
      //       wx.showToast({
      //         title:'已选择了该行业！',
      //         duration:1000
      //       })

      //       console.log('已经选择了该行业-热门')
      //       console.log(tempItem)
      //       console.log('已经选择了该行业-热门')
      //       tempItem.selected = false;
      //        this.setData({
      //          selelcttempArr:arr
      //       })
      //       return;
      //     }
      //   }

      // }

      arr.push(tempItem);
      this.setData({
         selelcttempArr:arr
      })
    }else{
      for(var p=0;p<arr.length;p++){
        if(tempItem.id == arr[p].id){
            arr.splice(p,1)
            this.setData({
              selelcttempArr:arr
            })
        }
      }
    }
    // 设置已选择的行业长度
    this.setData({
      seleNumber:this.data.selelcttempArr.length
    })

    var tempIndustryIdStr='';
    var tempIndustryNameStr='';
    for(var n=0;n<this.data.selelcttempArr.length;n++){
        tempIndustryIdStr += this.data.selelcttempArr[n].id;
        tempIndustryNameStr += this.data.selelcttempArr[n].name;

        if(n<this.data.selelcttempArr.length-1){
          tempIndustryIdStr+=',',
          tempIndustryNameStr+=','
        }
    }
    this.setData({
      industryIdStr : tempIndustryIdStr,
      industryNameStr : tempIndustryNameStr
    })
     var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];

    prevPage.setData({
      industryIdStr:this.data.industryIdStr,
      industryCharStr:tempIndustryNameStr,
      industryArr:this.data.selelcttempArr
    });

    // 选择2个行业
    // if(this.data.selelcttempArr.length>=2){
    // 选择4个行业
    if(this.data.selelcttempArr.length>=4){
        this.setData({
          moreThanTwoIndustry:true
        })
        // wx.showToast({
        //   title:'最多两个行业！',
        //   image:'../../../assets/images/icon/error-fff.png',
        //   duration:2000,
        //   mask:true
        // })
    }else{
      this.setData({
        moreThanTwoIndustry:false,
      })
    }
  },


  setStroryData:function(data){
    console.log('data----------')
    console.log(data)
    console.log('data----------')

    var self = this;

    console.log(self.data.storyIndustryList.length)
    // 2个
    // if(self.data.storyIndustryList.length>=2){
    // 4个
    if(self.data.storyIndustryList.length>=4){
      wx.showToast({
        title: "最多四个行业！",
        duration: 2000,
      });
    }else{
      self.data.storyIndustryList.push(data)
      wx.setStorage({
        key:"industryKey",
        data:self.data.storyIndustryList
      })
    }
    // 返回
    // wx.navigateBack({
    //   delta: 1
    // })

  }





})