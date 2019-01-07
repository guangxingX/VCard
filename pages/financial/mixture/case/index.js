// pages/financial/saveInstitutions/idea/index.js
// import {lookforsbmodule} from "../../../../module/lookforsb";
//
// var lookforsb = new lookforsbmodule
import {programemodule} from "../../../../module/programe";
const programe = new programemodule
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ImageTextItem: [],//图文的信息
        pid: '-1', //缓存产品id
        mycase: [],
        options: {}//缓存参数
    },
    onEdit(e) {
        console.log(e.currentTarget.dataset);
        const data = e.currentTarget.dataset
        const index = data.index
        console.log(index)
        const item = data.item
        const mycase = JSON.stringify(this.data.mycase)
        wx.navigateTo({
            url: 'addcase/index?' + `mycase=${mycase}&&pid=${this.data.pid}&&item=${item}&&index=${index}&&type=${this.data.options.type}`
        })
    },
    onAddNew() {
        const mycase = JSON.stringify(this.data.mycase)
        wx.navigateTo({
            url: 'addcase/index?' + `mycase=${mycase}&&pid=${this.data.pid}&&type=${this.data.options.type}`
        })
    },
    onTapSave(e) {
        // JSON.stringify
    },
    onTapView() {
        console.log(2)
    },
    _rander() {

        switch (this.data.options.type) {
            case '17':
                console.log(17);
                programe.getImageTextDatta(this.data.pid,this.data.options.type).then(res=>{
                    console.log(res);
                    //
                    this.setData({
                        mycase:res.customerList
                    })
                })
                break;
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            options,
            pid:options.pid,
        })
        this._rander()

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
        this._rander()
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
