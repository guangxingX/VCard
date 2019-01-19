const app = getApp()
import {programemodule} from "../../../../module/programe";
import {lookforsbmodule} from "../../../../module/lookforsb";

const programe = new programemodule
const lookforsb = new lookforsbmodule
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
        projectPlanName:'请选择项目计划书',

        cardId: '-1',


        lookforitem: {
            label: '数据服务,无线通讯'
        },

        options: {},




    },
    onSelectBusinessPlan(){
        console.log(this.data.userId);
        wx.navigateTo({
            url: '/pages/financial/projectplan/index?'+`isSelect=1&&id=${this.data.userId}`
        })
    },
    onSelectCard() {
        wx.navigateTo({
            url: '/pages/financial/carlist/index'
        })
    },
    _verify() {
        if (this.data.value.length == 0) {
            wx.showToast({
                title: '请填写留言',
                icon: 'none'
            })
            return false;
        }

        if (this.data.pid == '') {
            wx.showToast({
                title: '您还有没选择商业计划书',
                icon: 'none'
            })
            return false;
        }
        if (this.data.wissoCardId == '') {
            wx.showToast({
                title: '您还未有联系方式，请先创建自己的名片',
                icon: 'none'
            })
            return false;
        }
        if(this.data.companyId == ''){
            wx.showToast({
                title: '您还未绑定公司请先绑定公司',
                icon:'none'
            })
            return false;
        }
        return true
    },
    bindFormSubmit(e) {
        console.log(
            'cardId:'+ this.data.cardId,
            'pid:' +this.data.pid,
            'wissoCardId:'+ this.data.wissoCardId,

        'companyId:'+   this.data.companyId,
          'value:'+  this.data.value,
        )
        // return
        if (this._verify()) {
            programe.postBP(
                this.data.cardId,
                this.data.pid,
                this.data.wissoCardId,
                this.data.companyId,
                this.data.value,
            ).then(res => {
                programe.saveSucceed()
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
        const userId = app.globalData.userId
        // const userId = 90
        console.log(userId);
        console.log(options)
        this.setData({
            options,
            userId,
        })

        switch (options.type) {
            //机构
            case '1':
                var lookforitem = {}
                lookforitem.name = this.data.options.name
                // lookforitem.position = this.data.options.position
                // lookforitem.company = this.data.options.company
                lookforitem.label = this.data.options.label||''
                lookforitem.stage = this.data.options.stage||''
                lookforitem.logo = this.data.options.logo
                lookforitem.type = this.data.options.type
                var cardId = this.data.options.cardId
                var wissoCardId = this.data.options.wissoCardId
                this.setData({
                    lookforitem,
                    cardId,
                    wissoCardId,
                })
                break;

            //人
            case '2':
                var lookforitem = {}
                lookforitem.name = this.data.options.name
                lookforitem.position = this.data.options.position
                lookforitem.company = this.data.options.company
                lookforitem.label = this.data.options.label||''
                lookforitem.stage = this.data.options.stage||''
                lookforitem.logo = this.data.options.logo
                lookforitem.type = this.data.options.type
                var cardId = this.data.options.cardId
                var wissoCardId = this.data.options.wissoCardId
                    this.setData({
                        lookforitem,
                        cardId,
                        wissoCardId,
                    })
                break;

        }
        let info={}
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
                companyId
            })
        })
        console.log(this.data.companyId=='');
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
