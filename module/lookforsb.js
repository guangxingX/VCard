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
    //投资机构名片
    getinstitutionsCard(cardId,currentPage=1,fieldId=-1){

        const name = 'institutionsCard'
        var key = this._getKey(fieldId, currentPage, name)
        return this._saveStorage(
            this.request({
                url:'VCard/institutionsCard',
                data:{cardId}
            }), key, currentPage, fieldId, name)

    }
    //投资个人名片
    getinvestorsCard(cardId,currentPage=1,fieldId=-1){

        const name = 'investorsCard'
        var key = this._getKey(fieldId, currentPage, name)
        return this._saveStorage(
            this.request({
                url:'VCard/investorsCard',
                data:{cardId}
            }), key, currentPage, fieldId, name)

    }
    //查询机构公司
  getinstitutionsCompany(cardId){
    return this.request({
      url: 'VCard/institutionsCompany',
      data: { cardId }
    })
  }
}
