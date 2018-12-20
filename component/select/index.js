// component/select/index.js
import {
    programemodule
} from '../../module/programe.js'

var programe = new programemodule
Component({
    /**
     * 组件的属性列表
     */

    properties: {
        hidden:{
            type:Boolean,
            value:true
        },
        id: Number,
        limitNum:{
            type:Number,
            value:5
        },
        haveAddbar:{
            type:Boolean,
            value:true
        },
        isSolo:{
            type:Boolean,
            value:false
        },
        // selectedIndustryArr:Array,//缓存已经选中的数组
    },

    options: {
        addGlobalClass: true, //支持外部样式
        multipleSlots: true // 在组件定义时的选项中启用多slot支持

    },
    /**
     * 组件的初始数据
     */
    data: {
        newTagListArr: [], //存字母数组
        searchLetter: [], //滚动条的字母
        industryList: [], //行业数组
        industryData: {},
        hotList: [], //热门行业
        winHeight: 0,
        itemH: 0, //字母高度
        scrollTop: 0, // 滚动到
        industryArr: [], //缓存已经选中的标签
        showLetter: '', //显示字母
        startPageY: 0, //开始的Y轴
        isShowLetter: false, //是否显示字母
        bHeight: 0, //开始高度
        tHeight: 0, //后一个的高度
        industryNameStr: '',//选中的名字
        industryIdStr: '',//选中的id

        //pop
        showMask: false, //点击添加的弹窗
        overflowHiden: false, //输入行业弹窗
        selelcttempArr: [],//选中的数组
        seleNumber: 0,//选中数组的长度
        limit: false,//设置可以继续选
        ismulSelect:true,//显示多选框

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onCancleClick() {
            this.setData({
                showMask: false,
                industryIdStr: '',
                overflowHiden: false
            })
        },
        //单击了热门
        onBindIndustryHost(e, auto){
            if(this._isSolo()){
                // console.log(e)
                this.triggerEvent('onTapSolo', e)
            }else {
                this.__onBindIndustryHost(e, auto)
            }
        },

        __onBindIndustryHost(e, auto) {
            var item = '';
            var itemindex = '';
            if (auto == 'auto') {
                var id = e.id;
                var name = e.name;
                for (var d = 0; d < this.data.hotList.length; d++) {
                    if (id == this.data.hotList[d].id) {
                        item = this.data.hotList[d];
                        itemindex = d;
                    }
                }
            } else {
                item = e.currentTarget.dataset.industry;
                // 在改组中的位置
                itemindex = e.currentTarget.dataset.itemindex;
            }
            var temp = !item.selected;
            if (!this.data.limit && !item.selected) {
                var willChangeItem = "hotList[" + itemindex + "].selected";
                this.setData({
                    [willChangeItem]: true
                })
            } else if (this.data.limit && !item.selected) {
                wx.showToast({
                    title: '最多五个行业！',
                    image: '/assets/images/icon/error-fff.png',
                    duration: 2000,
                    mask: true
                })
            } else {
                var willChangeItem = "hotList[" + itemindex + "].selected";
                this.setData({
                    [willChangeItem]: false
                })
            }
            var tempItem = this.data.hotList[itemindex];
            var arr = this.data.selelcttempArr;
            if (tempItem.selected) {
                arr.push(tempItem);
                this.setData({
                    selelcttempArr: arr
                })
            } else {
                for (var p = 0; p < arr.length; p++) {
                    if (tempItem.id == arr[p].id) {
                        arr.splice(p, 1)
                        this.setData({
                            selelcttempArr: arr
                        })
                    }
                }
            }
            // 设置已选择的行业长度
            this.setData({
                seleNumber: this.data.selelcttempArr.length
            })

            var tempIndustryIdStr = '';
            var tempIndustryNameStr = '';
            for (var n = 0; n < this.data.selelcttempArr.length; n++) {
                tempIndustryIdStr += this.data.selelcttempArr[n].id;
                tempIndustryNameStr += this.data.selelcttempArr[n].name;
                if (n < this.data.selelcttempArr.length - 1) {
                    tempIndustryIdStr += ',',
                        tempIndustryNameStr += ','
                }
            }
            this.setData({
                industryIdStr: tempIndustryIdStr,
                industryNameStr: tempIndustryNameStr
            })
            // var pages = getCurrentPages();
            // var prevPage = pages[pages.length - 2];
            // prevPage.setData({
            //   industryIdStr: this.data.industryIdStr,
            //   industryCharStr: tempIndustryNameStr,
            //   industryArr: this.data.selelcttempArr
            // });


            if (this.data.selelcttempArr.length >= this.properties.limitNum) {
                this.setData({
                    limit: true
                })
            } else {
                this.setData({
                    limit: false,
                })
            }
        },
        // 单击了一个行业
        onBindIndustry(e, auto){
            if(this._isSolo()){
                this.triggerEvent('onTapSolo', e)
            }else {
                this.__onBindIndustry(e, auto)
            }
        },
        __onBindIndustry: function (e, auto) {

            var item = '';
            // 在改组中的位置
            var itemindex = '';
            //

            //获取已经已经选的数据
            if (auto == 'auto') {
                //常规行业
                var id = e.id;
                var name = e.name;
                // 行业非空数组，就是每个数组里面都已几个行业
                var noEmpetyArr = [];

                for (var a = 0; a < this.data.industryList.length; a++) {
                    if (this.data.industryList[a].length) {
                        noEmpetyArr.push(this.data.industryList[a])
                    }
                }
                for (var b = 0; b < noEmpetyArr.length; b++) {
                    for (var c = 0; c < noEmpetyArr[b].length; c++) {
                        if (id == noEmpetyArr[b][c].id) {
                            item = noEmpetyArr[b][c];
                            itemindex = c;
                        }
                    }
                }
            } else {
                item = e.currentTarget.dataset.industry;
                // 在改组中的位置
                itemindex = e.currentTarget.dataset.itemindex;
            }
            // 在allDataArr中的位置
            var allDataArrIndex = this._getinabcIndex(item.pinyin);
            var temp = !item.selected;
            // 选样式
            if (!this.data.limit && !item.selected) {
                var willChangeItem = "industryList[" + allDataArrIndex + "][" + itemindex + "].selected";
                this.setData({
                    [willChangeItem]: true,
                })
            } else if (this.data.limit && !item.selected) {
                wx.showToast({
                    title: '最多五个行业！',
                    image: '/assets/images/icon/error-fff.png',
                    duration: 2000,
                    mask: true
                })
            } else {
                // 取消选中
                var willChangeItem = "industryList[" + allDataArrIndex + "][" + itemindex + "].selected";
                this.setData({
                    [willChangeItem]: false
                })
            }
            var tempItem = this.data.industryList[allDataArrIndex][itemindex];
            var arr = this.data.selelcttempArr;
            if (tempItem.selected) {
                arr.push(tempItem);
                this.setData({
                    selelcttempArr: arr
                })
                // 数组长度为零时，直接放进来

            } else {

                for (var p = 0; p < arr.length; p++) {
                    if (tempItem.id == arr[p].id) {
                        arr.splice(p, 1)
                        this.setData({
                            selelcttempArr: arr
                        })

                    }
                }
            }


            // 设置已选择的行业长度
            this.setData({
                seleNumber: this.data.selelcttempArr.length
            })


            var tempIndustryIdStr = '';
            var tempIndustryNameStr = '';
            for (var n = 0; n < this.data.selelcttempArr.length; n++) {
                tempIndustryIdStr += this.data.selelcttempArr[n].id;
                tempIndustryNameStr += this.data.selelcttempArr[n].name;

                if (n < this.data.selelcttempArr.length - 1) {
                    tempIndustryIdStr += ',',
                        tempIndustryNameStr += ','
                }
            }
            this.setData({
                industryIdStr: tempIndustryIdStr,
                industryNameStr: tempIndustryNameStr
            })


            // var pages = getCurrentPages();
            // var prevPage = pages[pages.length - 2];

            // prevPage.setData({
            //   industryIdStr: this.data.industryIdStr,
            //   industryCharStr: tempIndustryNameStr,
            //   industryArr: this.data.selelcttempArr
            // });

            //限制选中数量
            if (this.data.selelcttempArr.length >= this.properties.limitNum) {
                this.setData({
                    limit: true
                })

            } else {
                this.setData({
                    limit: false,
                })
            }

        },
        //点击底部栏的事件
        onBindunIndustry(e) {

            var item = '';
            // 在改组中的位置
            item = e.currentTarget.dataset.industry;

            if(typeof (item.pinyin) =='undefined'){
                // console.log(item);
                let dataList =  this.data.hotList
                // console.log(dataList);
                for(var j  = 0;j<dataList.length;j++){
                    if(item.id==dataList[j].id){

                        dataList[j]['selected'] = false
                        console.log(dataList[j])
                    }
                }

                this.setData({
                    hotList: dataList
                })




            }else {
                var  allDataArrIndex = this._getinabcIndex(item.pinyin)
                let dataLists =  this.data.industryList
                for(var j  = 0;j<dataLists[allDataArrIndex].length;j++){
                    if(item.id==dataLists[allDataArrIndex][j].id){
                        dataLists[allDataArrIndex][j]['selected'] = false
                    }
                }
                this.setData({
                    industryList:dataLists
                })
            }
            // 在改组中的位置
           // console.log(item)





            var arr = this.data.selelcttempArr;

            for (var p = 0; p < arr.length; p++) {
                if (item.id == arr[p].id) {
                    arr.splice(p, 1)
                    this.setData({
                        selelcttempArr: arr
                    })

                }
            }




        },
        onTapAdd: function () {
            this.setData({
                showMask: true,
                overflowHiden: true
            })
        },
        /**滚动事件**/
        searchStart: function (e) {
            var showLetter = e.currentTarget.dataset.letter;
            var pageY = e.touches[0].pageY;
            this._setScrollTop(this, showLetter);
            this._nowLetter(pageY, this);
            this.setData({
                showLetter: showLetter,
                startPageY: pageY,
                isShowLetter: true,
            })
        },
        searchMove: function (e) {
            var pageY = e.touches[0].pageY;
            var startPageY = this.data.startPageY;
            var tHeight = this.data.tHeight;
            var bHeight = this.data.bHeight;
            var showLetter = 0;

            if (startPageY - pageY > 0) { //向上移动
                if (pageY < tHeight) {

                    this._nowLetter(pageY, this);
                }
            } else { //向下移动
                if (pageY > bHeight) {

                    this._nowLetter(pageY, this);
                }
            }
        },
        searchEnd: function (e) {
            // console.log(e);
            // var showLetter=e.currentTarget.dataset.letter;
            var that = this;
            setTimeout(function () {
                that.setData({
                    isShowLetter: false
                })
            }, 1000)

        },
        _showFixBar(){
            this.setData({
                ismulSelect:false
            })
        },
        _hideFixBar(){
            this.setData({
                ismulSelect:true
            })
        },
        _isSolo(){
            return this.properties.isSolo
        },
        _nowLetter: function (pageY, that) { //当前选中的信息
            var letterData = this.data.searchLetter;
            var bHeight = 0;
            var tHeight = 0;
            var showLetter = "";
            for (var i = 0; i < letterData.length; i++) {
                if (letterData[i].tHeight <= pageY && pageY <= letterData[i].bHeight) {
                    bHeight = letterData[i].bHeight;
                    tHeight = letterData[i].tHeight;
                    showLetter = letterData[i].name;
                    break;
                }
            }
            this._setScrollTop(that, showLetter);
            that.setData({
                bHeight: bHeight,
                tHeight: tHeight,
                showLetter: showLetter,
                startPageY: pageY
            })
        },
        _setScrollTop: function (that, showLetter) {
            var scrollTop = 0;
            var List = this.data.newTagListArr;
            var Count = 0;
            var initialCount = 0;
            for (var i = 0; i < List.length; i++) {
                if (showLetter == List[i]) {
                    scrollTop = initialCount * 100 + Count * 46;
                    break;
                } else {
                    initialCount++;
                    Count += List[i].length;
                }
            }
            that.setData({
                scrollTop: scrollTop
            })
        },
        /***滚动结束**/
        _randerData() {
            // 去除出来的行业数据，以在此页面选中
            wx.getStorage({
                key: 'selectedIndustryArr',
                success: function (res) {
                    that.setData({
                        industryArr: res.data
                    })
                }
            })

            this.data.industryArr.forEach(function (item, index, arr) {
                this.onBindIndustry(item, 'auto')
            })

            programe.getOldIndustryList().then(res => {
                let industryData = res.industryList
                industryData = programe.resortbyalphabet(industryData, 'pinyin')
                let searchLetter = industryData.searchLetter
                let newTagListArr = industryData.searchLetter
                let sysInfo = wx.getSystemInfoSync();
                var winHeight = sysInfo.windowHeight;
                var itemH = winHeight / searchLetter.length;
                var tempObj = [];
                for (var i = 0; i < searchLetter.length; i++) {
                    var temp = {};
                    temp.name = searchLetter[i];
                    temp.tHeight = i * itemH; //添加高度
                    temp.bHeight = (i + 1) * itemH;
                    tempObj.push(temp)
                }
                //去重
                let indstryNewData = []
                industryData.allDataArr.forEach(item => {
                    item = this._de_tin(item, res.hotList)
                    indstryNewData.push(item)
                })
                if(this.properties.isSolo){
                    res.hotList.unshift({name: "全部领域", id: 0})
                }

                this.setData({
                    searchLetter: tempObj,
                    hotList: res.hotList,
                    winHeight,
                    itemH,
                    industryList: indstryNewData,
                    newTagListArr,

                })
            })

        },
        _getinabcIndex(titleStr){
            var allDataArrIndex = 0;
            var charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            for (var i = 0; i < charStr.length; i++) {
                if (titleStr == charStr[i]) {
                    allDataArrIndex = i;
                }
            }
            return allDataArrIndex
        },
        //去重
        _de_tin(mainArr, subArr) {
            let newMyArrList = []
            for (var i = 0, arrayLen = mainArr.length; i < arrayLen; i++) {
                for (var j = 0, resLen = subArr.length; j < resLen; j++) {
                    if (mainArr[i].id === subArr[j].id) {
                        break;
                    }
                }
                // 如果array[i]是唯一的，那么执行完循环，j等于resLen
                if (j === resLen) {
                    newMyArrList.push(mainArr[i])
                }
            }
            return newMyArrList
        },
    },
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行
            this._randerData()
        },
    }
})
