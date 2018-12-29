import {
    programemodule
} from 'programe.js'

//数据模块
export class lookforsbmodule extends programemodule {
    arraycomma(arry,name){
        let id = []
        arry.forEach(item=>{
            id.push( item[name])
        })
        id = id.join(',')
        return id
    }

    //投资机构列表
    getinvestmentCardList({
                              fieldId, type, currentPage, pageSize = 10
                          },userId) {
        //名字上加上type来缓存

        const name = 'investmentCardList' + '-' + type
        var key = this._getKey(fieldId, currentPage, name)

        if(!userId){
            return this._saveStorage(this.request({
                url: 'VCard/investmentCardList',
                data: {
                    fieldId,
                    type,
                    currentPage,
                    pageSize
                }
            }), key, currentPage, fieldId, name)
        }else{
            return this._saveStorage(this.request({
                url: 'VCard/investmentCardList',
                data: {
                    fieldId,
                    type,
                    currentPage,
                    pageSize,
                    userId,
                }
            }), key, currentPage, fieldId, name)
        }
    }

    //投资机构名片
    getinstitutionsCard(cardId, currentPage = 1, fieldId = -1) {

        const name = 'institutionsCard'
        var key = this._getKey(fieldId, currentPage, name)
        return this._saveStorage(
            this.request({
                url: 'VCard/institutionsCard',
                data: {cardId}
            }), key, currentPage, fieldId, name)

    }

    //投资个人名片
    getinvestorsCard(cardId, currentPage = 1, fieldId = -1) {

        const name = 'investorsCard'
        var key = this._getKey(fieldId, currentPage, name)
        return this._saveStorage(
            this.request({
                url: 'VCard/investorsCard',
                data: {cardId}
            }), key, currentPage, fieldId, name)

    }



    /////////////////////////////////机构/////////////////////////////////
    //查询机构公司
    getinstitutionsCompany(cardId) {
        return this.request({
            url: 'VCard/institutionsCompany',
            data: {cardId}
        })
    }

    // 查询机构投资方向
    getinstitutionsDirection(cardId) {
        return this.request({
            url: 'VCard/institutionsDirection',
            data: {cardId}
        })
    }

    //查询机构投资阶段
    getinstitutionsStage(cardId) {
        return this.request({
            url: 'VCard/institutionsStage',
            data: {cardId}
        })
    }

    //设置投资阶段
    setinstitutionsStage(cardId, data) {
        let mydata = {}
        mydata.stageList = data
        return this.postsaveInstitutions(cardId, '2', mydata)
    }


    //查询机构核心团队
    getinstitutionsCoreTeam(cardId) {
        return this.request({
            url: 'VCard/institutionsCoreTeam',
            data: {cardId}
        })
    }

    //设置机构核心团队
    setinstitutionsCoreTeam(cardId, data) {
        return this.postsaveInstitutions(cardId, '3', data)

    }

    //查询投资理念
    getinstitutionsImageText_idea(cardId) {
        return this.request({
            url: 'VCard/institutionsImageText',
            data: {
                cardId,
                type: '1'
            }
        })
    }
    //设置投资理念图文
    setinstitutionsImageText_idea(cardId,data){
        let mydata = {}
        mydata.imageText = data
        return this.postsaveInstitutions(cardId,'4',mydata)
    }
    //查询基金规模
    getinstitutionsImageText_money(cardId) {
        return this.request({
            url: 'VCard/institutionsImageText',
            data: {
                cardId,
                type: '2'
            }
        })
    }
    //设置基金规模
    setinstitutionsImageText_money(cardId,data){
        let mydata = {}
        mydata.imageText = data
        return this.postsaveInstitutions(cardId,'5',mydata)
    }
    //查询客户案例
    getinstitutionsCase(cardId){
        return this.request({
            url: 'VCard/institutionsCase',
            data: {
                type: '1',
                cardId,

            }
        })
    }
    //设置客户案例
    setinstitutionsCase(cardId,data){
        let mydata= {}
        mydata.case = data
        return this.postsaveInstitutions(cardId,'6',mydata)
    }
    //公司下所有员工
    getcompanyEmployee(cardId) {
        return this.request({
            url: 'VCard/getCompanyTeam',
            data: {
                cardId,
                Type:'1'
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
    postsaveInstitutions(cardId, type, data) {
        data.cardId = cardId
        data.type = type
        // console.log(data)
        return this.request({
            url: 'VCard/saveInstitutions',
            data: data
        })
    }
    ///////////////////////////////////////////机构结束//////////////////////////////////////////////


    //***************************************投资人********************************************//
    //获取投资人名片信息
    getpeopleCard(cardId){
        return this.request({
            url: 'VCard/peopleCard',
            data: {cardId}
        })
    }

    //获取投资需求
    getinvestmentDemand(cardId){
        return this.request({
            url: 'VCard/investmentDemand',
            data: {cardId}
        })
    }
    //保存投资需求
    /**
     *
     * @param cardId
     * @param field 投资领域（多个使用逗号分隔）
     * @param stage 投资阶段（标签多个使用逗分隔）
     * @param amount 金额范围（中间使用-隔开）
     * @param model 融资模式标签（多个使用逗号分隔）
     * @returns {*}
     */
    setinvestmentDemand(cardId,field,stage,amount,model){
        let mydata= {}
        mydata.field = field
        mydata.stage = stage
        mydata.amount = amount
        mydata.model = model
        return this.postsaveInvestors(cardId,'1',mydata)
    }

    //获取投资理念
    getmenidea(cardId){
        return this.request({
            url: 'VCard/institutionsImageText',
            data: {cardId,
            type:'1'
            }
        })
    }
    setmenidea(id,data){
        let mydata = {}
        mydata.concept = data
        return this.postsaveInvestors(id,'3',mydata)
    }
    //保存投资人案例
    setPeopleCase(cardId,data){
        let mydata= {}
        mydata.case = data
        return this.postsaveInvestors(cardId,'2',mydata)
    }
    //保存投资人名片
    /**
     *
     * @param cardId
     * @param type
     * @param data
     * type=1 投资需求
     * field
     * stage
     * amount
     * model
     * type=2 投资案例
     * case
     *
     */
    postsaveInvestors(cardId, type, data){
        data.cardId = cardId
        data.type = type
        // console.log(data)
        return this.request({
            url: 'VCard/saveInvestors',
            data: data
        })
    }
    //获取核心成员联系人介绍图文接口
    getUserIntro(cardId,userId,id){
        return this.request({
            url: 'VCard/getUserIntro',
            data: {cardId,
                type:'1',
                userId,
                id,

            }
        })
    }
    //核心成员编辑-新增-保存
    setsaveCoreTeam(cardId,userId,id,userIntro){
        return this.request({
            url: 'VCard/saveCoreTeam',
            data: {cardId,
                type:'1',
                userId,
                id,
                userIntro
            }
        })
    }
    //********************************************投资人结束***********************************************//


}
