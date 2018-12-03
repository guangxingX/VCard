var app = getApp()
//封装HTTP
/* params.url
 * params.data
 * params.method 默认是json
 */
class HTTP{
  request(params){
    if (params.data) {
      //预留追加对象
      var json = {};
      var json1 = params.data;
      var json2 = {
      };
      json = eval('(' + (JSON.stringify(json1) + JSON.stringify(json2)).replace(/}{/, ',') + ')');
      params.data = json;
    }else{
      params.data = {}
    }
    //兼容 给出默认方法
    if (typeof params.method == 'undefined'){
      params.method = 'GET'
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: app.data.apiurl + params.url,
        data: params.data,
        header: {
          'content-type': 'application/json'
        },
        method: params.method,
        success: function (res) {
            let code = res.statusCode.toString()
            if (code.startsWith('2')) {
              //TODO 自我判断
              resolve(res.data.entity)
            }else{
                this._show_error(res.data.success,res.data.message)
            }
        },
        fail: function (err) {
          this._show_error()
        }
      })
    });
  }
    _show_error(error_code,msg) {
        if (!error_code) {
            error_code = -1
        }
        if(!msg){
            msg = '错误'
        }
        wx.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
        })
    }
 }
// var HTTP1 = new HTTP
export { HTTP };
