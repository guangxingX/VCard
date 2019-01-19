// pages/financial/contactme/index.js
const app = getApp()
import {programemodule} from "../../../module/programe";

const programe = new programemodule
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: '',//缓存userId

        info: {},
        length: 0,
        value: '',
        companyId: '',//缓存companyId
        wissoCardId: '',//缓存wissoCardId
        pid: '',//缓存projectId
    },
    onSelectCard(){
        wx.navigateTo({
          url: '/pages/financial/carlist/index'
        })
    },
    _verify(){
        if(this.data.value.length==0){
            wx.showToast({
              title: '请填写留言',
                icon:'none'
            })
            return false;
        }
        if(this.data.wissoCardId == ''){
            wx.showToast({
                title: '您还未有联系方式，请先创建自己的名片',
                icon:'none'
            })
            return false;
        }
        if(this.data.companyId == ''){
            wx.showToast({
              title: '您还未绑定公司请先绑定公司或公司未存在',
                icon:'none'
            })
            return false;
        }
        return true
    },
    bindFormSubmit(e) {
        console.log(
           'companyId:'+ this.data.companyId,
            this.data.pid,
            this.data.wissoCardId,
            this.data.value,
        )
        
        if(this._verify()){
            programe.postmessagecontactCompany(
                this.data.pid,
                this.data.wissoCardId,
                this.data.companyId,

                this.data.value,
            ).then(res=>{
                // programe.saveSucceed()

                wx.navigateBack()
                wx.showToast({
                  title:'发送成功',
                  icon:'none',

                })
            })
        }


    },
    bindTextAreaBlur(e) {
        console.log(e.detail.value)

        this.setData({
            length: e.detail.value.length,
            value: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        var info = JSON.parse(options.info)
        console.log(info)
        const userId = app.globalData.userId
      // const userId = -1
        // const companyId = info.companyId
        const pid = info.pid
        this.setData({
            info,
            userId,
            pid,
        })
        programe.getmyCardList(userId).then(res => {
            console.log(res);
            //默认给第一个设置参数
            let mycard = res.cardList[0]||{}
            info.legalPerson = mycard.name||'选择联系人'
            info.companyname = mycard.companyName||'联系人名片未绑定公司'
          let companyId = mycard.companyId||''
            this.setData({
                info: info,
                wissoCardId: mycard.id||'',
              companyId, //

            })
        })
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
