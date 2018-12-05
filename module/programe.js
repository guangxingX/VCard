import {
  HTTP
} from '../utils/http.js'
export class programemodule extends HTTP {
  getProjectDetail(){
      return this.request({
        url:'VCard/projectDetail',
        data:{
          projectId:1,
          type:1
        }
      })
  }
  /**
   * 当前页数，默认条数 
   * 并加入缓存
   */
  getProjectList(currentPage,pageSize,id){
    // 缓存中寻找 or API 写入到缓存中
    if(!pageSize){
      pageSize=10;
    }
    if(!id){
      id='-1'
    }
    // key 确定key
   var key = this._getKey(id,currentPage)
   var program = wx.getStorageSync(key)
    var now = new Date().getTime()
   //没有缓存 或者 时间超过10分钟600000毫秒 都重新获取并缓存
   if(!program||(now-program.tiem>600000)){
      // console.log('ajax')
     return this.request({
       url: 'VCard/projectList',
       data: {
         currentPage: currentPage,
         pageSize: pageSize
       }
     }).then(res=>{
       this.setStoragePage(currentPage,res,id)
       return res
     })
   }else{
     return new Promise((resolve)=>{
       resolve(program.data)
     })
   }
  }
  splitbycomma(string){
    // console.log(typeof string)
    if(typeof string != 'string'){
      throw Error('需要字符串')
    }else{
      return string.split(',')
    }
  }
  /***
   * 当前页
   * 搜索的id
   * 缓存的数据
   * 
   */
  setStoragePage(current,data,id){
    if(!id){
      id='-1'
    }
    //追加时间戳
    var time = new Date().getTime()

    var data = {
      data:data,
      time:time
    }

    wx.setStorage({
      key: this._getKey(id,current),
      data: data,
    })
  }
  _getKey(id,index) {
    const key = id +'programe-' + index
    return key
  }
}