// pages/financial/edit/funding-programs/index.js
import {programemodule} from "../../../../module/programe";
const programe = new programemodule
Page({

  /**
   * 页面的初始数据
   */
  data: {
      radioItems:
          [
              { name: '债权', value: '债权', },
              { name: '股权', value: '股权', }
          ],

      options:{},//缓存参数
      his:[],//investment
      phase:'', //需要跨页面修改
      usePlan:[], // 需要跨页面修改
      businessplanning:[],// 需要跨页面修改
      model:'',//模式
      isView:false,
    financingValuation: '',//融资估值
    financingAmount: '',//融资金额
  },
  onTabfinancingAmount(){
      wx.navigateTo({
        url: '/pages/financial/edit/funding-programs/valuation/index?name=本轮融资金额&&type=1',
      })
  },
  onTabfinancingValuation(){
    wx.navigateTo({
      url: '/pages/financial/edit/funding-programs/valuation/index?name=本轮融资估值&&type=2',
    })
  },
    onTapChangeChoice(e){
        console.log(e.detail);
        this.setData({
            model:e.detail
        })
    },

  //资金使用规划
  onTapUsePlan(){
    //需要隐藏
      wx.navigateTo({
          url: '/pages/financial/edit/funding-programs/text-image/index?'+`pid=${this.data.options.pid}&&type=1&&name=资金使用规划`
      })
  },
    //业务规划
    onBusinessPlanning(){
      wx.navigateTo({
        url: '/pages/financial/edit/funding-programs/text-image/index?'+`pid=${this.data.options.pid}&&type=2&&name=业务规划`
      })
    },
    //阶段
    onTabStage(){
        wx.navigateTo({
            url: '/pages/financial/edit/funding-programs/stage/index?'+`value=${this.data.phase}`
        })
    },
    onHis(){
      wx.navigateTo({
        url: 'his/index?type=new'
      })
    },
    onItems(e){

        let info =JSON.stringify(e.currentTarget.dataset.info)
        let index =JSON.stringify(e.currentTarget.dataset.index)
        wx.navigateTo({
            url: 'his/index?'+`info=${info}&&index=${index}`
        })

    },
    onSave(){

        if(this._verify()){
            let investment = []
            console.log()
            this.data.his.forEach(item=>{

                let obj = {}
                obj.time = item.time
                obj.phase = item.phase
                obj.investmentAmount=item.investmentAmount

              obj.investors = item.investors.join(',')
                investment.push(obj)
            })
            programe.setfinancingInfo(
                this.data.options.pid,
                this.data.model,
                this.data.phase,
                investment,
                this.data.usePlan,
                this.data.businessplanning,
                this.data.financingAmount,
                this.data.financingValuation
            ).then(res=>{
                programe.saveSucceed()
            })
        }

    },
    onView(){
        if(this._verify()){
            this.setData({
                isView:true,
            })
        }
    },
    onTapView(){
      this.setData({
        isView:false
      })
    },
    _rander(){
      programe.getfinancingInfo(this.data.options.pid).then(res => {
        console.log(res);
        let data = res.financingInfo

        //渲染融资阶段
        // 投资模式

        let radioItems = this.data.radioItems
        if (data.model == '股权') {

          radioItems[0].checked = false
          radioItems[1].checked = true
          this.setData({
            radioItems,
            model: '股权'
          })

        } else if (data.model == '债权') {
          radioItems[0].checked = true
          radioItems[1].checked = false
          this.setData({
            radioItems,
            model: '债权'
          })
        }
        let investment = data.investment
        let his = []
        investment.forEach(item => {
          item.investors = programe.splitbycomma(item.investors, false)
          his.push(item)
        })
        this.setData({
          his,
          phase: data.phase,
            financingAmount:data.financingAmount,
            financingValuation:data.financingValuation,
        })
      })
    },
  onLoad: function (options) {
      console.log(options)
    this.setData({
        options,
    })
    this._rander()
  },

    _verify(){
        console.log(this.data.model);
        if(typeof this.data.model == 'undefined'||this.data.model == ''){
            wx.showToast({
                title: '请选择投资模式',
                icon:'none',
            })
            return
        }

        console.log(this.data.phase)
        if(this.data.phase == ''){
            wx.showToast({
                title: '请选择融资阶段',
                icon:'none',
            })
            return false;
        }
        if(this.data.financingAmount==''){
            wx.showToast({
                title: '请选择本轮融资金额',
                icon:'none',
            })
            return false;
        }
        if(this.data.financingValuation==''){
            wx.showToast({
                title: '请选择本轮融资估值',
                icon:'none',
            })
            return false;
        }
        console.log(this.data.his);
        if(this.data.his.length == 0){
            wx.showToast({
                title: '至少填写一次历史融资',
                icon:'none',
            })
            return false;
        }

        console.log(this.data.usePlan);
        if(this.data.usePlan.length==0){
            wx.showToast({
                title: '请填写资金使用计划',
                icon:'none',
            })
            return false;
        }
        console.log(this.data.businessplanning);
        if(this.data.businessplanning.length==0){
            wx.showToast({
                title: '请填业务规划',
                icon:'none',
            })
            return false;
        }

        return true;
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
    // if(this.data.options.isNew!=1){
    //   this._rander()
    // }else{

    // }

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
