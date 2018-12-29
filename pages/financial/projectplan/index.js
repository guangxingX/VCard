// pages/financial/projectplan/index.js
import {programemodule} from "../../../module/programe";

let programe = new programemodule
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentPage: 1,
        currentPageClose: 1,
        tabs: ["融资中", "已关闭"],//写死
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        projectList_1: [],//项目
        projectList_2: [],//项目关闭
        totalPage: 10,
        totalPageClose: 10,
        id: -1,//缓存


    },
    onEdit(e) {
        console.log(e.currentTarget.dataset.data)

    },
// 优化下滑线
    _setItemDom() {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                //获取选中item里左面的距离
                var query = wx.createSelectorQuery()
                query.select('.weui-bar__item_on').boundingClientRect(function (rect) {
                    // console.log(rect);
                    that.setData({
                        sliderLeft: (rect.width - 30) / 2, //偏移到中部
                        sliderOffset: rect.left // 节点的左边界坐标
                    });
                }).exec()
            }
        });
    },
    onTabClick(e) {

        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id

        });
        //切换的时候判断是关闭还是融资中
        if (this.data.activeIndex == 0) {
            this.setData({
                currentPage: 1,
                projectList_1: [],
            })
        } else {
            this.setData({
                currentPageClose: 1,
                projectList_2: [],
            })
        }
        this._rander(1)
    },
    _rander(page) {
        if (this.data.activeIndex == 0) {
            programe.getbusinessPlan(this.data.id, '1', page).then(res => {
                console.log(res);
                this.setData({
                    projectList_1: this.data.projectList_1.concat(res.projectList),
                    totalPage:res.totalPageSize
                })
            })
        } else {
            programe.getbusinessPlan(this.data.id, '2', page).then(res => {
                console.log(res);
                this.setData({
                    projectList_2: this.data.projectList_2.concat(res.projectList),
                    totalPageClose:res.totalPageSize
                })
            })
        }

    },

    onAddList(e) {
        if (this.data.activeIndex == 0) {
            var currentPage = this.data.currentPage
            //当总页数时，不再发起请求
            if (this.data.currentPage + 1 > this.data.totalPage) {
                return
            }
            this.setData({
                currentPage: currentPage + 1
            })
            // console.log(this.data.currentPage)
            this._rander(this.data.currentPage)
        } else {
            var currentPage = this.data.currentPageClose
            //当总页数时，不再发起请求
            if (this.data.currentPageClose + 1 > this.data.totalPageClose) {
                return
            }
            this.setData({
                currentPageClose: currentPage + 1
            })
            // console.log(this.data.currentPage)
            this._rander(this.data.currentPageClose)
        }

    },
    onAddnewPlan(){
        wx.navigateTo({
          url: '/pages/financial/edit/index?id='
              +this.data.id+`&&type=new`
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //userId
        this.setData({
            id: options.id,
        })
        this._setItemDom()
        this._rander(1)
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
