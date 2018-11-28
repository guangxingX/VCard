// pages/mine/editCompanyInfo/editCompanyInfo.js
var app=getApp();
Page({
  data: {
    // 公司id
    companyId:'',
    avatar:'',
    industryIdStr:'',
    industryCharStr:'',
    failuretip:'',
    errorshow:false,

    // 默认头像地址
    logo:'',
    industry:'',
    companyInfo:{},
    companyName:'',
    url:'',
    address:'',
    // 接口返回的行业数组以及选中的行业数组
    industryArr:[]
  },
  // 更换头像
  changeHeaderImg:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        const src = res.tempFilePaths[0]
        console.log('src')
        console.log(src)
        console.log('src')
        wx.navigateTo({
          url: `../../homePage/upload/upload?src=${src}`

        })
      }
    })
  },
companyNameChange:function (e) {
  var str = app.isHaveEmojiStr(e.detail.value);

  console.log('新的公司名称')
  console.log(str)
  console.log('新的公司名称')

  // var newName = 'this.data.companyInfo.companyName';
  this.setData({
    companyName : str
  })
},
companyUrlChange:function (e) {
  var str = app.isHaveEmojiStr(e.detail.value);
  this.setData({
    url : str
  })
},
companyAddressChange:function (e) {
   var str = app.isHaveEmojiStr(e.detail.value);
  this.setData({
    address : str
  })
},
  // 去选择行业页面
  selectIndustry:function(){
    var self = this;
    wx.setStorage({
      key:'fromEditIndustryArrKey',
      data:self.data.industryArr,
      success:function () {
        wx.navigateTo({
          url: '../../commenPage/selectIndustry/selectIndustry?id='+self.data.companyId
        })
      }
    })
  },

getCompanyInfo:function(){

  console.log('getCompanyInfo')

  var self= this;
    wx.showLoading({
        title: '加载中',
        mask:true
    })
    // 获取公司信息
    wx.request({
      url: app.data.apiurl+'applets/myCompanyBasic',
      data:{
        companyId:self.data.companyId
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log('success+res')
        console.log(res)
        console.log('success+res')

        if(res.statusCode==200){
          if(res.data.success==0){
              // wx.showToast({
              //   title: '提交成功',
              //   icon: 'success',
              //   duration: 2000
              // })
              console.log('获取到的编辑公司页面的基本信息res')
              console.log(res)

              console.log(self.data.companyInfo)
              console.log('获取到的编辑公司页面的基本信息res')

              var obj = res.data.entity.industry;
              var industryIdStr='';
              var industryCharStr='';
              for(var i=0;i<obj.length;i++){
                var str =obj[i].id;
                var charStr = obj[i].name;
                industryIdStr += str;
                industryCharStr += charStr;
                if(i<=obj.length-2){
                  industryIdStr +=',',
                  industryCharStr +=','
                }
              }

              var idStrArr = industryIdStr.split(',');
              console.log('id数组是')
              console.log(idStrArr)
              // ["34", "55", "49", "17"]
              console.log('id数组是')




             // var industryStr = industryArray.join(',');
             // console.log('industryStr')
             // console.log(industryStr)
             // console.log('industryStr')


              self.setData({
                companyInfo:res.data.entity,
                logo:res.data.entity.logo,
                industryIdStr:industryIdStr,
                industryCharStr:industryCharStr,
                industryArr:obj,
                companyName:res.data.entity.companyName,
                url:res.data.entity.url,
                address:res.data.entity.address,
              })

              console.log("res.data.entity")
              console.log(res.data.entity)
              console.log(self.data.industryArr)
              console.log("res.data.entity")

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
        console.log('fail')

        wx.showToast({
          title: '加载失败',
          image:'../../../assets/images/icon/error-fff.png',
          duration: 2000
        })
      },
      complete(){
        wx.hideLoading({
          title: '加载中'
        })
      }
    })

},
isURL:function(domain) {
    var name = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/;
    if( !(name.test(domain))){
        return false;
    }else{
        return true;
    }
},
// 表单提交
submitCompanyInfoform:function(e){
    var that=this;
    var value=e.detail.value;

    console.log('编辑时提交的内容')
    console.log(value)
    console.log('编辑时提交的内容')
    setTimeout(function(){
      that.setData({
        errorshow:false
      })
    },1000)

    if(value.logo==''){
      console.log("name");
      that.setData({errorshow:true,failuretip:'请上传头像'});
      return;
    }else if(value.name==''){
      that.setData({errorshow:true,failuretip:'请填写公司名称'});
      return;
    }else if(value.url==''){
      that.setData({errorshow:true,failuretip:'请填写公司网址'});
      return;
    }else if(!that.isURL(value.url)){
       that.setData({errorshow:true,failuretip:'请填写合法的公司网址,以http://开头'});
      return;
    }
    else if(value.label_id==''){
      that.setData({errorshow:true,failuretip:'请选择公司行业'});
      return;
    }else if(value.address==''){
      that.setData({errorshow:true,failuretip:'请填写公司地址'});
      return;
    }

    //  failuretip:'',
    // errorshow:false,



    wx.showLoading({
      title:'保存中',
      mask:true,
    })

    console.log('编辑公司的form-value')
    console.log(value)
    console.log('编辑公司的form-value')

    wx.request({
      url: app.data.apiurl+'applets/updateCompanyBasic',
      data:value,
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if(res.statusCode==200){
          if(res.data.success==0){

              console.log('编辑公司基本信息res')
              console.log(res)
              console.log('编辑公司基本信息res')
              wx.showLoading({
                title:'保存成功！',
                mask:true,
              })

             setTimeout(function(){
                wx.hideLoading();
                wx.navigateBack({
                  delta: 1
                })
             }, 1000)

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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this;
    console.log('编辑信息的options')
    console.log(options)
    console.log('编辑信息的options')

    var id = options.id;
    self.setData({
      companyId:id
    })
    //获取公司信息
    self.getCompanyInfo();

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
    var self=this;
    //如果有值，把值给logo字段，因为接口字段是logo
    if(self.data.avatar){
      self.setData({
        logo:self.data.avatar
      })
    }

    console.log('on-show-industryArr')
    console.log(this.data.industryArr)
    console.log('on-show-industryArr')

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('编辑信息页面隐藏')


  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('编辑信息页面卸载')
    wx.removeStorage({
      key: 'industryKey',
      success: function(res) {

      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    });
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
  // onShareAppMessage: function () {

  // }
})