// pages/financial/investmentplan/index.js
import {
    lookforsbmodule
} from "../../../module/lookforsb";

var lookforsb = new lookforsbmodule
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //缓存
      id:-1,
      /****找投资***/
      //pop//
      hidlookType: true,//显示选择投资人/机构
      typename: '投资机构/投资人',//显示选项名字
      lookforList: [
          // {
          //     stage: "1,2,3,4,5",
          //     name: "----",
          //     logo: "https://oe75tqwfd.qnssl.com/tmp_722d4426033bc9b6a0d6cc4c8ea1a8f1.png",
          //     projectNum: "--",
          //     company: "----",
          //     id: 1,
          //     label: "1,2,3",
          //     position: "----",
          //     type: "----"
          // }
      ],
      currentPageL:1,
      totalPageL:10,
      value:[0,1,2],
      array: ['投资机构/投资人', '投资机构', '投资人'],
      type:0,//post , 参数
      fieldId:0,//post ,参数
      showtapindustry:false,
      fieldname:'全部领域',
  },
    onBindChange(e){
        const val = e.detail.value
        // console.log(val)
        this.setData({
            typename:this.data.array[val],
            type:val,
            currentPageL:1
        })
        this._randerlookforsbData(this.data.currentPageL,this.data.type,this.data.fieldId,true)

    },
    onAddListL(){
        var currentPage = this.data.currentPageL

        //当总页数时，不再发起请求
        if (this.data.currentPageL+1 >= this.data.totalPageL) {
            return
        }
        this.setData({
            currentPageL: currentPage + 1
        })
        // console.log(this.data.currentPage)
        this._randerlookforsbData(this.data.currentPageL,this.data.type,this.data.filedID)
    },
    onShowtapindustry(e){
        this.setData({
            showtapindustry:true,
        })
    },
    onTapindustry(e){
        // console.log(e.detail.currentTarget.dataset.industry)
        let target= e.detail.currentTarget.dataset.industry
        console.log(target);
        this.setData({
            showtapindustry:false,
            fieldname:target.name,
            fieldId:target.id,
        })
        this._randerlookforsbData(1,this.data.type,this.data.fieldId,true)
    },
    _randerlookforsbData(currentPage =1,type = 0,fieldId = 0,isNewArry) {
        var id = this.data.id
    lookforsb.getinvestmentCardList({
            fieldId,
            type,
            currentPage
        },id).then(res => {
            console.log(res)
            if(isNewArry){
                var list = res.list
            }else {
                var list = this.data.lookforList.concat(res.list)
            }

            this.setData({
                lookforList:list,
              totalPageL:res.totalPageSize
            })
        })
    },
    /********Plan新方法*******/
    onLook(){
        wx.navigateTo({
          url: '/pages/financial/card/index?'+`id=${this.data.id}&&type=${this.data.type}`
        })
    },
    onAddnewPlan(){
        //TODO 未有接口
        console.log('onAddnewPlan')
    },
    onEdit(e){
        // console.log(e.currentTarget.dataset.type);
        let type = e.currentTarget.dataset.type
        if(type == '1'){
            wx.navigateTo({
              url: '/pages/financial/institutionintr/index?'+`id=${this.data.id}`
            })
        }else {
            wx.navigateTo({
                url: '/pages/financial/savemencard/index?'+`id=${this.data.id}`
            })
        }
        // console.log('onEdit')
    },
    onShare(){
        console.log('onShare');
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
      this.setData({
          id:options.id
      })
      this._randerlookforsbData()
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
