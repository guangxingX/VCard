// pages/financial/mixture/selectIndustry/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      options:null,
      fieldList:[]
  },

    onTapindustry(e){
        let tagData = e.detail
        let tag = []
        let tagId = []
        tagData.forEach(item=>{

            tag.push(item.name)
            tagId.push(item.id)

        })
        tag = tag.join(',')
        tagId = tagId.join(',')

        if(this.data.options.type=='projectinfo'){
            var pages = getCurrentPages();

            var prevPage = pages[pages.length-2];

            //把信息存入共同对象里
            // prevPage.setData({
            //     ImageTextItem:prevPage.data.ImageTextItem
            // })
            prevPage.setData({

                tag,
                tagId,
            })

            wx.navigateBack()

        }


    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.fieldList){
        //TODO 有些问题暂时已经选择的展示问题 搁置
        let fieldList = JSON.parse(options.fieldList)
        this.setData({
            fieldList,
        })
    }

      this.setData({options})

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
