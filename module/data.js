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
  //行业列表接口 1-1
  getIndustryList(){
    return this.request({
      url:'VCard/industryList'
    })
  }
  //上传服务器需要的token
    getUptoken(){
        return this.request({
            url:'applets/uptoken'
        })
    }
}

// module.exports = {
//   DataModule: DataModule //图文接口
// }
