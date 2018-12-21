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
    // 查询机构投资方向
    getinstitutionsDirection(cardId){
        return this.request({
            url: 'VCard/institutionsDirection',
            data: { cardId }
        })
    }
  //查询机构投资阶段
    getinstitutionsStage(cardId){
        return this.request({
            url: 'VCard/institutionsStage',
            data: { cardId }
        })
    }
    //查询机构核心团队
    getinstitutionsCoreTeam(cardId){
        return this.request({
            url: 'VCard/institutionsCoreTeam',
            data: { cardId }
        })
    }
    //公司下所有员工
    getcompanyEmployee(cardId){
        return this.request({
            url: 'applets/companyEmployee',
            data: { companyId:cardId,
                currentPage:'1',

            }
        })
    }
    //保存机构信息
    /**
     *
     * @param cardId
     * @param type
    *    type=1保存投资方向
         type=2保存投资阶段
         type=3保存核心团队
         type=4保存投资理念
         type=5保存基金规模
         type=6保存客户案例
     * @param data的属性如下传送
     * industryList
     * stageList
     * coreTeam
     * imageText
     * case
     */
    postsaveInstitutions(cardId,type,data){
        data.cardId =cardId
        data.type=type
        // console.log(data)
        return this.request({
            url: 'VCard/saveInstitutions',
            data: data
        })
    }
}
