var app = getApp();
//封装ajax方法
/**url
 * data
 * header 默认是json
 */
function _ajax(url, data, header = 'application/json') {
  let type = '';
  if (data) {
    //预留追加对象
    var json = {};
    var json1 = data;
    var json2 = {
    };
    json = eval('(' + (JSON.stringify(json1) + JSON.stringify(json2)).replace(/}{/, ',') + ')');
    data = json;
    type = 'POST';
  } else {
    data = {};
    type = 'GET';
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.data.apiurl + url,
      data: data,
      header: {
        'content-type': header // 默认值
      },
      success: function(res) {
        resolve(res);
      },
      fail: function(res) {
        reject(res)
      },
      method: type,
    })
  });
}

//创建项目接口
const postCreateProject = (data) => _ajax('VCard/createProject', data);
//对外提供接口  需要暴露在外面才能调用
//调用实例 获得全局js变量
// var Data = require('../../data.js');
module.exports = {
  postCreateProject: postCreateProject //图文接口
}