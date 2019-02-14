import {
    programemodule
} from '../../module/programe.js'
import {
    lookforsbmodule
} from '../../module/lookforsb.js'

var program = new programemodule
var lookforsb = new lookforsbmodule
var sliderWidth = 0 // 需要设置slider的宽度，用于计算中间位置，//废除
// pages/financial/index/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

        showtapindustry2:false,
        projectIndustryLeft:0,
        projectActivateIndex:0,
        toView:'',

        /**找项目***/
        currentPage: 1,
        tabs: ["找投资", "找项目"],//写死
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        projectList: [],
        totalPage: 10,

        /****找投资***/
        //pop//
        hidlookType: true,//显示选择投资人/机构
        typename: '投资机构/投资人',//显示选项名字
        lookforList: [

        ],
        currentPageL:1,
        totalPageL:10,
        value:[0,1,2],
        array: ['投资机构/投资人', '投资机构', '投资人'],
        type:0,//post , 参数
        fieldId:0,//post ,参数
        showtapindustry:false,
        fieldname:'全部领域',

        industrySelection:[],
        projectIndustryId:'',
        selectedIndustry:[],
    },

    //项目点击行业
    onTapindustry2(e){
        let target= e.detail.currentTarget.dataset.industry
        console.log(target);

        this._initializeProject()

        this.setData({
            projectIndustryId:target.id
        })

        console.log(this.data.industrySelection);

        this.data.industrySelection.forEach((item,index)=>{
            if(item.name == target.name){
                this.setData({
                    projectActivateIndex:index
                })
            }
        })

        let data = this.data.industrySelection[this.data.projectActivateIndex]
        console.log(this.data.projectActivateIndex);
        setTimeout(()=>{
            this.setData({
                toView:'sw'+this.data.projectActivateIndex
            })
            console.log(this.data.toView);
        },0)

        var that = this;
        // wx.getSystemInfo({
        //     success: function (res) {
                //获取选中item里左面的距离
                // var query = wx.createSelectorQuery()
                // query.select('.blue').boundingClientRect(function (rect) {
                //     console.log(rect);
                //     that.setData({
                //
                //         projectIndustryLeft: rect.left // 节点的左边界坐标
                //     });
                // })
            // }
        // });
        // wx.createSelectorQuery().select('.blue').fields({
        //     dataset: true,
        //     size: true,
        //     scrollOffset: true,
        //     properties: ['scrollX', 'scrollY'],
        //     computedStyle: ['margin', 'backgroundColor','id'],
        //     context: true,
        // }, function (res) {
        //     console.log(res);
        //     // res.dataset // 节点的dataset
        //     // res.width // 节点的宽度
        //     // res.height // 节点的高度
        //     // res.scrollLeft // 节点的水平滚动位置
        //     // res.scrollTop // 节点的竖直滚动位置
        //     // res.scrollX // 节点 scroll-x 属性的当前值
        //     // res.scrollY // 节点 scroll-y 属性的当前值
        //     // // 此处返回指定要返回的样式名
        //     // res.margin
        //     // res.backgroundColor
        //     // res.context // 节点对应的 Context 对象
        // }).exec()





        this._randerData(this.data.currentPage,this.data.projectIndustryId)

        this.setData({
            showtapindustry2:false,
        })
    },
    //点击行业下箭头
    onProjectIndustryDownArray(){
        this.setData({
            showtapindustry2:true,
        })

    },
    _initializeProject(){
        this.setData({
            currentPage:1,
            projectIndustryId:'',
            projectList:[],
        })
    },
    onProjectIndustrySelection(e){
        console.log(e);
        this.setData({
            projectActivateIndex:e.currentTarget.dataset.index,
            projectIndustryLeft:e.currentTarget.offsetLeft,
        })
        this._initializeProject()
        this.setData({
            projectIndustryId:e.currentTarget.dataset.item.id
        })
        this._randerData(this.data.currentPage,this.data.projectIndustryId)


        // var that = this;
        // wx.getSystemInfo({
        //     success: function (res) {
        //         //获取选中item里左面的距离
        //         var query = wx.createSelectorQuery()
        //         query.select('.weui-bar__item_on').boundingClientRect(function (rect) {
        //             console.log(rect);
        //             // that.setData({
        //             //     sliderLeft: (rect.width - 30) / 2, //偏移到中部
        //             //     sliderOffset: rect.left // 节点的左边界坐标
        //             // });
        //         }).exec()
        //     }
        // });
    },
  onSearch(){
    console.log(this.data.activeIndex)
    let url = '/pages/commenPage/searchPage/searchPage'
    if(this.data.activeIndex==0){
      url = url +`?storageKey=investmentSearch`
    }else if(this.data.activeIndex==1){
      url = url + `?storageKey=projectSearch`
    }
    wx.navigateTo({
      url,
    })
  },
    /**找投资**/
  onTapUpProject(e){
    console.log(e.detail.lookforitem)
    let lookforitem = e.detail.lookforitem
    const position = lookforitem.position||""
    wx.navigateTo({
      url: '/pages/financial/card/sendBP/index?' + `type=${lookforitem.type}&&name=${lookforitem.name}&&logo=${lookforitem.logo}&&company=${lookforitem.company}&&label=${lookforitem.label}&&stage=${lookforitem.stage}&&position=${position}&&cardId=${lookforitem.id}`,
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

    onShowtapindustry(e){
        this.setData({
            selectedIndustry:[{id:this.data.fieldId}],
            showtapindustry:true,
        })
    },
    onAddListL(){
        var currentPage = this.data.currentPageL

        //当总页数时，不再发起请求
        if (this.data.currentPageL+1 > this.data.totalPageL) {
            return
        }
        this.setData({
            currentPageL: currentPage + 1
        })
        // console.log(this.data.currentPage)
        this._randerlookforsbData(this.data.currentPageL,this.data.type,this.data.filedID)
    },
    _randerlookforsbData(currentPage =1,type = 0,fieldId = 0,isNewArry) {
        lookforsb.getinvestmentCardList({
            fieldId,
            type,
            currentPage
        }).then(res => {
            console.log(res)
            if(isNewArry){
                var list = res.list
            }else {
                var list = this.data.lookforList.concat(res.list)
            }

            this.setData({
                lookforList:list,
                totalPageL: res.totalPageSize //重置总page

            })
        })
    },

    onShowPicker(){

    },
    /***找项目****/
  onBindChange(e) {
    const val = e.detail.value
    // console.log(val)
    this.setData({
      typename: this.data.array[val],
      type: val

    })
    //重置为1
    this.setData({
      currentPageL:1,
    })
    this._randerlookforsbData(this.data.currentPageL, this.data.type, this.data.fieldId, true)

  },
    onTapAddBtn() {
      lookforsb.getcardandcompany(app.globalData.userId).then(res=>{
            console.log(res)
        if (res.cardInfo[0]){
          wx.navigateTo({
            url: '/pages/financial/edit/index?type=new' + `&wissoCardId=${res.cardInfo[0].id}`,
          })
        }else{
          wx.showToast({
            title: '请先创建我的名片',
            icon:'none'
          })
        }
      })

    },
    onAdd() {

        // console.log("onAdd")
    },
    onAddList(e) {
        var currentPage = this.data.currentPage
        //当总页数时，不再发起请求
        if (this.data.currentPage+1 > this.data.totalPage) {
            return
        }
        this.setData({
            currentPage: currentPage + 1
        })
        // console.log(this.data.currentPage)
        this._randerData(this.data.currentPage,this.data.projectIndustryId)
    },
    onTabClick(e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id,
            projectIndustryLeft:0
        });
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

    _randerData(page,id) {



        program.getProjectList(page,id).then(res => {
            // console.log(res)
          var list=[]
          if (res.projectList){
            var list = this.data.projectList.concat(res.projectList)
          }

            this.setData({
                projectList: list,
                totalPage: res.totalPageSize
            })
        })
        //渲染找投资列表

        // program.getIndustryList().then(res=>{
        //   console.log(res);
        // })
    },

    _clearData() {
        this.setData({
            projectList: [],
            currentPage: 1,
          lookforList:[],
          currentPageL:1,
        })
        this._randerData(this.data.currentPage)
      this._randerlookforsbData(this.data.currentPageL)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(app.currenttab);
        if(app.currenttab == 0){
            this.setData({
                activeIndex:0
            })
        }else if(app.currenttab == 1){
            this.setData({
                activeIndex:1
            })
        }
        console.log(options);
        this._setItemDom()
        this._randerlookforsbData()

        program.getIndustryList().then((res)=>{
            let industrySelection = [{
                name:'全部领域',
                id:0,
            }]
            res.hotList.forEach(item=>{
                industrySelection.push(item)
            })
            res.industryList.forEach(item=>{
                industrySelection.push(item)
            })
            this.setData({
                industrySelection,
            })

        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this._randerData(1)

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
      //隐藏领域
      this.setData({showtapindustry:false})
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     * 清除缓存 并 加载新数据
     */
    onPullDownRefresh: function () {
        wx.clearStorage()
        this._clearData()

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // console.log(1)
        // this.onAddList();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
