// component/lookforsb/item/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        lookforitem: Object,
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onTapUpProject(){
            // console.log(onTapUpProject);
        },
        onTapitem(){
            console.log(this.properties.lookforitem);
        },
    },
    lifetimes: {
        attached() {
            // console.log(this.properties.lookforitem)
            // 在组件实例进入页面节点树时执行
        },
        detached() {
            // 在组件实例被从页面节点树移除时执行
        },
    },

})
