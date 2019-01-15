import {
    HTTP
} from '../utils/http.js'
export class mymodule extends HTTP {
    // 4-1、我的消息
    getmessageList(userId){
        return this.request({
            url:'VCard/messageList',
            data:{
                userId,
            }
        })
    }
    // 4-7我的留言列表接口
    getownMessageList(userId){
        return this.request({
            url:'VCard/ownMessageList',
            data:{
                userId,
                currentPage:1,
                pageSize:999999999999,
            }
        })
    }
}
