import {
  programemodule
} from '../../../module/programe.js'

var programe = new programemodule
var sliderWidth = 28; // 需要设置slider的宽度，用于计算中间位置
// pages/financial/details/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    tabs: ["项目介绍", "融资计划", "资源储备", "商业模式"], //写死
    gallery: [{
      name: "适用客户",
      gdata: [],
    }, {
      name: "产品价值",
      gdata: [],
    }, {
      name: "客户案例",
      gdata: []
    }], //写死
    tagsData:[{
      name: "·投资模式",
      color:"#3073E3",
    }, {
        name: "·融资阶段",
        color: "#E64340",
      }, {
        name: "·本轮融资⾦额",
        color: "#E28F19",
      }, {
        name: "·本轮融资估值",
        color: "#09BB07",
      }],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    //写死
    iconList: {
      photo: "../../../assets/images/icon/icon-phone-gray.png",
      email: "../../../assets/images/icon/icon-email-gray.png",
      position: "../../../assets/images/icon/icon-map.png",
      authentication: "../../../assets/images/icon/icon-authentication-yellow.png"
    },
    // 占位数据 一律用 ---- 数字 0
    item: {
      isAuthentication: 1,
      address: "--------",
      legalPerson: "----",
      name: "--------",
      coTag: [{
          coTagName: "----",
          coTagType: 0
        },
        {
          coTagName: "----",
          coTagType: 0
        }
      ],
      logo: "",
      id: 0,
      companyTemplate: "--------",
      bgId: 0,
      setUpTime: "0000-00-00"
    },
    pid:0,
    sub: {

    },
    projectIntro: {}, //项目数据
    label: [], //标签
    amount: '', //标签2

    financingValuation:[],//融资估值
    financingAmount:[],//融资金额

    phase:[],//融资阶段
  },
  onGoNextPage() {
    wx.navigateTo({
      url: '../contactme/index',
    })
    // wx.redirectTo({
            //     url: '../../mine/cardDetails/cardDetails?mycardid=' + mycardid + '&from=' + from
            // })
  },
  //tap切换
  tabClick(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    switch (this.data.activeIndex){
      case '1':
        this._randerTwoData()
        break

    }
    console.log(this.data.activeIndex)

  },
  _setNav() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  _randerTwoData(){
    programe.getProjectDetail({
      projectId: this.data.pid,
      type:2,
    }).then(res=>{
      console.log(res)
      let financingInfo = res.financingInfo
      let model = financingInfo.model
      let phase = financingInfo.phase
      let financingAmount = financingInfo.financingAmount
      let financingValuation = financingInfo.financingValuation
      model= programe.splitbycomma(model,false)
      phase = programe.splitbycomma(phase, false)
      financingAmount = programe.splitbycomma(financingAmount, false)
      financingValuation = programe.splitbycomma(financingValuation, false)
      let tagsData = this.data.tagsData
      tagsData[0].tData = model //融资计划 - 投资模式
        tagsData[1].tData = phase //融资阶
        tagsData[2].tData = financingAmount //本轮融资
        tagsData[3].tData = financingValuation //本轮融资估值

      this.setData({
          tagsData,//
      })
    })
  },
  _randerOneData(id) {
    programe.getProjectDetail({
      projectId: id,
      type: 1,
    }).then(res => {
      let projectIntro = res.projectIntro
      let item = res.projectIntro.companyInfo
      item.textlogo = item.name.substring(0, 2)
      item.coTag = item.tag
      var string = res.projectIntro.label
      var label = programe.splitbycomma(string)
      label = label.join('/')
      var arr = []
      arr.push(projectIntro.amount)
      arr.push(projectIntro.phase)
      arr.push(projectIntro.city)
      let amount = arr.join('·')
      let contact = projectIntro.contact
      let coreTeam = projectIntro.coreTeam
      let customer = projectIntro.customer
      let value = projectIntro.value
      let cases = projectIntro.cases
      let gallery = this.data.gallery
      gallery[0].gdata = customer
      gallery[1].gdata = value
      gallery[2].gdata = cases
      // console.log(gallery)
      this.setData({
        item, //名片
        projectIntro, //
        label, //标签
        amount, //融资标签
        contact, //联系人
        coreTeam, //核心团队
        gallery, //图文介绍集
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //设置 下划线
    this._setNav();
    // console.log(options.id)
    const id = options.id
    this.setData({pid:id});
    //渲染数据
    this._randerOneData(id)
    this._randerTwoData() // TODO删除
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(option) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
