// pages/financial/note/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [
            {
                name: '项目提醒',
                tip: "陈老师发布了留言！《A+项目》",
                num: '5',
                fn: "onTap1",
                src: '/pages/financial/note/image/icon-1.png'
            },
            {
                name: '投资提醒',
                tip: "陈老师发布了留言！《A+项目》",
                num: '5',
                fn: "onTap2",
                src: '/pages/financial/note/image/icon-2.png'
            },
            {
                name: '资源留言',
                tip: "丁老师发布了人才资源留言，最新的人力资...",
                num: '5',
                fn: "onTap3",
                src: '/pages/financial/note/image/icon-3.png'
            },
            {
                name: '需求留言',
                tip: "郭总发布了人才资源留言",
                num: '5',
                fn: "onTap4",
                src: '/pages/financial/note/image/icon-4.png'

            },
            {
                name: '活动报名',
                tip: "暂无",
                num: '5',
                fn: "onTap5",
                src: '/pages/financial/note/image/icon-5.png'
            },

        ]

    },
    onTap1() {
        console.log(1)
    },
    onTap2() {
        console.log(2)
    },
    onTap3() {
        console.log(3)
    },
    onTap4() {
        console.log(4)
    },
    onTap5() {
        console.log(5)
    },

    onTapProject() {
        console.log('onTapProject');
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
