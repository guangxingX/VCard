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
        tabs: ["项目介绍", "融资计划", "资源储备", "商业模式"],//写死
        activeIndex: 0,
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
            coTag: [
                {
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
        danmuList: [
            {
                text: '第 1s 出现的弹幕',
                color: '#ff0000',
                time: 1
            },
            {
                text: '第 3s 出现的弹幕',
                color: '#ff00ff',
                time: 3
            }],
        sub: {
            sex: "——",
            tip: "——————",
            intr: "——————————————————————————————————————————————————"
        },
        projectIntro:{}, //项目数据
        label:[],//标签
        amount:'',//标签2
    },
    //tap切换
    tabClick(e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
    _setNav() {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
    },
    _randerData(id, type) {
        programe.getProjectDetail({
            projectId: id,
            type: type,
        }).then(res => {

            console.log(res)
            let projectIntro = res.projectIntro
            let item = res.projectIntro.companyInfo

            item.textlogo = item.name.substring(0, 2)
            item.coTag = item.tag
           var string = res.projectIntro.label

          var label =  programe.splitbycomma(string)
            label = label.join('/')

                var arr = []
            arr.push(projectIntro.amount)
            arr.push(projectIntro.phase)
            arr.push(projectIntro.city)
           let amount = arr.join('·')
            this.setData({
                item: item,
                projectIntro,
                label,
                amount,
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //设置 下划线
        this._setNav();
        console.log(options.id)
        const id = options.id
        //渲染数据
        this._randerData(id, this.data.type)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function (option) {

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
