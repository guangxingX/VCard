import {
  HTTP
} from '../utils/http.js'
//数据模块
export class DATAMODULE extends HTTP {
  //图文项目接口
  postCreateProject(data) {
    return this.request({
      url: 'VCard/createProject',
      method: 'POST',
      data: data
    })
  }
  //行业列表接口
  getIndustryList(){
    return this.request({
      url:'applets/industryList'
    })
  }

}

// module.exports = {
//   DataModule: DataModule //图文接口
// }
