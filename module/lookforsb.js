import {
  programemodule
} from 'programe.js'
//数据模块
export class lookforsbmodule extends programemodule {
  //投资机构列表
  getinvestmentCardList({
    fieldId, type, currentPage, pageSize=10
  }) {
    //名字上加上type来缓存
    const name = 'investmentCardList' +'-'+ type
    var key = this._getKey(fieldId, currentPage, name)
    return this._saveStorage(this.request({
      url: 'VCard/investmentCardList',
      data: {
        fieldId,
        type,
        currentPage,
        pageSize
      }
    }), key, currentPage, fieldId, name)
  }
}