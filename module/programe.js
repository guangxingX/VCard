import {
    HTTP
} from '../utils/http.js'

export class programemodule extends HTTP {
    getIndustryList(){
        return this.request({
            url: 'VCard/industryList',})
    }
    /**
     * 详情页面接口
     * @param projectId
     * @param type
     */
    getProjectDetail({
                         projectId, type
                     }) {
        const name = 'ProjectDetail'
        var key = this._getKey(projectId, type, name)
        return this._saveStorage(this.request({
                    url: 'VCard/projectDetail',
                    data: {
                        projectId: projectId,
                        type: type
                    }
                }),key,type,projectId,name)

    }

    /**
     * 当前页数，默认条数
     * 并加入缓存
     */
    getProjectList(currentPage, pageSize, id) {

        let data
        // 缓存中寻找 or API 写入到缓存中
        data={
            currentPage,
            pageSize,
        }
        if (!pageSize) {
            data.pageSize = 10;
        }
        if (!id) {
            id = '-1'
        }else {
            data.industryId=id
        }

        // key 确定key
        var key = this._getKey(id, currentPage)
       return this._saveStorage(this.request({
                   url: 'VCard/projectList',
                   data,
               }),key,currentPage,id)

    }

    /**
     * 逗号变成字符串
     * @param string 以逗号分割的字符串
     * @param isFive 是否是最多5个
     * @returns {*} 数组
     */
    splitbycomma(string, isFive = true) {
        // console.log(typeof string)
        if (typeof string != 'string') {
            throw Error('需要字符串')
        } else {
            var arr = string.split(',')
            //规定至多显示5个。随机给出5个。
            if (isFive) {
                if (arr.length < 5) {
                    return arr
                } else {
                    var result = [];

                    var ranNum = 5;

                    for (var i = 0; i < ranNum; i++) {

                        var ran = Math.floor(Math.random() * (arr.length - i));

                        result.push(arr[ran]);

                        arr[ran] = arr[arr.length - i - 1];

                    }
                    ;
                    return result
                }
            } else {
                return arr
            }


        }
    }

    /***
     * 当前页
     * 搜索的id
     * 缓存的数据
     *
     */
    _setStoragePage(current, data, id,name=null) {
        if (!id) {
            id = '-1'
        }
        //追加时间戳
        var time = new Date().getTime()

        var data = {
            data: data,
            time: time
        }

        wx.setStorage({
            key: this._getKey(id, current,name),
            data: data,
        })
    }

    /**
     *  获得缓存的key名字
     * @param id
     * @param index
     * @param name
     * @returns {*}
     * @private
     */
    _getKey(id, index, name) {
        if (!name) {
            name = 'programe-'
        } else {
            name = 'programe-' + name
        }
        const key = id + name + index
        return key
    }

    /**
     * 封装 缓存
     * @param fn 需要promise 对象
     * @param key key名字
     * @param current 分页
     * @param id
     * @param name
     * @returns {*}
     * @private
     */
    _saveStorage(fn,key,current,id,name){

        var program = wx.getStorageSync(key)
        var now = new Date().getTime()
        if (!program || (now - program.tiem > 600000)) {
            // console.log('ajax')
            return fn.then(res=>{
                this._setStoragePage(current,res,id,name)
                return res
            })
        } else {
            return new Promise((resolve) => {
                resolve(program.data)
            })
        }
    }
}
