// pages/financial/card/index.js
import {lookforsbmodule} from "../../../module/lookforsb";

var lookforsb = new lookforsbmodule
Page({

    /**
     * 页面的初始数据
     */
    data: {
        item: {},
        iconList: {
            photoWhite: "/assets/images/icon/icon-phone.png",
            emailWhite: "/assets/images/icon/icon-email.png",
            addressWhite: "/assets/images/icon/icon-address.png",
            authentication: '/assets/images/icon/icon-authentication-yellow.png',
            share: '/assets/images/icon/icon-share.png',
            bluetag: '/assets/images/icon/icon-tag.png',
            mapSmall: '/assets/images/icon/map-small.png'
        },
        type: 1,
        mockData: {
            tag: ['1', '2'],
            coreTeam: [{}, {}],
            imgTextList: [{
                name: '投资理念'
            },
                {
                    name: '基金规模'
                },
                {
                    name: '客户案例'
                }
            ],
        },
        /**机构**/
        cardinfo: {},//公司介绍
        imgTextList: [
            {
                name: '投资理念'
            },
            {
                name: '基金规模'
            },
            {
                name: '客户案例'
            }
        ],
        myinfo:{},//个人简介

    },
    onSendBook() {

    },
    _randerBData(id) {
        lookforsb.getinstitutionsCard(
            id
        ).then(res => {
            // console.log(res)
            let imgTextList = this.data.imgTextList
            imgTextList[0].data = res.idea
            imgTextList[1].data = res.fundSize
            imgTextList[2].data = res.case

            this.setData({
                cardinfo: res,
                imgTextList,
            })
        }).catch(e=>{
            console.log(e)
        })
    },
    _randerCData(id){
        lookforsb.getinvestorsCard(id).then(res=>{
            console.log(res);
            this.setData({
                myinfo:res,
            })
        }).catch(e=>{
            //重置为空
            this.setData({
                myinfo:{}
            })
            console.log(e)
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)

        this.setData({
            type: options.type
        })
        let title = ''
        //2是人1是公司
        if (options.type == 2) {
            title = options.name
            this._randerBData(options.id)

        } else {
            title = options.name+'的投资名片'
            this._randerCData(options.id)
        }
        wx.setNavigationBarTitle({
            title:title
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
        // 销毁数据
        this.setData({

        })
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