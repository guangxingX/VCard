var app = getApp()
Page({
  data: {
    isFixed: false,
    hiddenSearchBtn: false,
    storageKey: "",
    historyDataList: [],
    searchkey: "",
    currIndex: '',
    historyclick: true,
    currenttab: '',
    focus: true,
    // 输入框是否获取到键盘
    isFocus: false,
    bottom: 0
  },
  clickhistory(e) {
    if (this.data.historyclick) {
      this.setData({
        searchkey: this.data.historyDataList[e.currentTarget.dataset.index]
      });
      this.beginSerch();
    }
  },
  clearSearch() {
    this.setData({
      searchkey: ''
    })
  },
  getHistory: function() {
    var self = this;
    wx.getStorage({
      // 注释代码是异步获取
      key: self.data.storageKey,
      success: function(res) {
        self.setData({
          historyDataList: res.data
        })
      },
      fail: function(res) {
        if (res.data == null || res.data.length == 0 || res.data == undefined) {
          //无缓存
          wx.setStorage({
            key: self.data.storageKey,
            data: [],
            success: function() {
              wx.getStorage({
                key: self.data.storageKey,
                success: function(res) {
                  // 创建成功，返回新创建的缓存数据
                  self.setData({
                    historyDataList: res.data
                  })
                },
                fail: function() {

                }
              })
            },
          })
        }
      }
    })
  },
  // 开始搜索
  beginSerch: function(e) {
    this.setData({
      historyclick: false
    });
    var that = this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]
    if (e && !e.detail.value) {
      wx.showToast({
        title: '请填写搜索信息',
        image: '../../../assets/images/icon/error-fff.png',
        duration: 2000
      })
    } else if (e && e.detail.value) {
      console.log("搜索框搜索");
      if (this.data.storageKey == "hightcocsearch") {
        wx.navigateTo({
          url: "../../maillist/cocsearchResult/cocsearchResult?searchname=" + e.detail.value + "&type=2&isHighQuality=1"
        })
      } else if (this.data.storageKey == "hightcompanysearch") {
        wx.navigateTo({
          url: "../../maillist/cocsearchResult/cocsearchResult?searchname=" + e.detail.value + "&type=1"
        })
      } else if (this.data.storageKey == "allcocsearch") {
        wx.navigateTo({
          url: "../../maillist/cocsearchResult/cocsearchResult?searchname=" + e.detail.value + "&type=2"
        })
      } else if (this.data.storageKey == "allcompanysearch") {
        wx.navigateTo({
          url: "../../maillist/cocsearchResult/cocsearchResult?searchname=" + e.detail.value + "&type=1"
        })
      } else if (this.data.storageKey == "resourcesSearch") {
        wx.navigateTo({
          url: "../../supply/supplysearchResult/supplysearchResult?searchname=" + e.detail.value + "&type=0" + '&currenttab=' + that.data.currenttab
        })
      } else if (this.data.storageKey == "demandSearch") {
        wx.navigateTo({
          url: "../../supply/supplysearchResult/supplysearchResult?searchname=" + e.detail.value + "&type=1" + '&currenttab=' + that.data.currenttab
        })
      } else if (this.data.storageKey == "activitySearch") {
        wx.navigateTo({
          url: "../../activity/activitySearchResult/activitySearchResult?searchname=" + e.detail.value
        })
      }
      this.data.historyDataList.forEach(function(item, index, arr) {
        if (e.detail.value == item) {
          arr.splice(index, 1);
        }
      })
      setTimeout(function() {
        that.data.historyDataList.unshift(e.detail.value);
        that.setData({
          historyDataList: that.data.historyDataList
        });
        wx.setStorage({
          key: that.data.storageKey,
          data: that.data.historyDataList
        });
      }, 300);
    } else {
      if (that.data.storageKey == "hightcocsearch") {
        wx.navigateTo({
          url: "../../maillist/cocsearchResult/cocsearchResult?searchname=" + that.data.searchkey + "&type=2&isHighQuality=1",
          success: res => {},
          fail: res => {
            that.setData({
              historyclick: true
            });
          },
          complete: res => {

          }
        })
      } else if (that.data.storageKey == "hightcompanysearch") {
        wx.navigateTo({
          url: "../../maillist/cocsearchResult/cocsearchResult?searchname=" + that.data.searchkey + "&type=1",
          success: res => {},
          fail: res => {},
          complete: res => {
            that.setData({
              historyclick: true
            });
          }
        })
      } else if (this.data.storageKey == "allcocsearch") {
        wx.navigateTo({
          url: "../../maillist/cocsearchResult/cocsearchResult?searchname=" + that.data.searchkey + "&type=1",
          success: res => {},
          fail: res => {},
          complete: res => {
            that.setData({
              historyclick: true
            });
          }
        })
      } else if (this.data.storageKey == "allcompanysearch") {
        wx.navigateTo({
          url: "../../maillist/cocsearchResult/cocsearchResult?searchname=" + that.data.searchkey + "&type=1",
          success: res => {},
          fail: res => {},
          complete: res => {
            that.setData({
              historyclick: true
            });
          }
        })
      } else if (this.data.storageKey == "resourcesSearch") {
        wx.navigateTo({
          url: "../../supply/supplysearchResult/supplysearchResult?searchname=" + that.data.searchkey + "&type=0" + '&currenttab=' + that.data.currenttab,
          success: res => {},
          fail: res => {},
          complete: res => {
            that.setData({
              historyclick: true
            });
          }
        })
      } else if (this.data.storageKey == "demandSearch") {
        wx.navigateTo({
          url: "../../supply/supplysearchResult/supplysearchResult?searchname=" + that.data.searchkey + "&type=1" + '&currenttab=' + that.data.currenttab,
          success: res => {},
          fail: res => {},
          complete: res => {
            that.setData({
              historyclick: true
            });
          }
        })
      } else if (this.data.storageKey == "activitySearch") {
        wx.navigateTo({
          url: "../../activity/activitySearchResult/activitySearchResult?searchname=" + that.data.searchkey,
          success: res => {},
          fail: res => {},
          complete: res => {
            that.setData({
              historyclick: true
            });
          }
        })
      }
      that.data.historyDataList.forEach(function(item, index, arr) {
        if (that.data.searchkey == item) {
          arr.splice(index, 1);
        }
      })
      setTimeout(function() {
        that.data.historyDataList.unshift(that.data.searchkey);
        that.setData({
          historyDataList: that.data.historyDataList
        });
        wx.setStorage({
          key: that.data.storageKey,
          data: that.data.historyDataList
        });
      }, 300);
    }
  },
  // 输入框获取到焦点，要显示历史记录
  onfocus: function() {
    var self = this;
    // 获取数据长度
    var length = this.data.historyDataList
    if (length <= 0) {
      //隐藏清空历史记录按钮
      self.setData({
        hiddenSearchBtn: true
      })
    } else {
      self.setData({
        hiddenSearchBtn: false
      })
    }


    // if(length>=11){
    //   self.setData({
    //     isFixed:true
    //   })
    // }else{
    //   self.setData({
    //     isFixed:false
    //   })
    // }
    self.setData({
      isFocus: true
    })

    // 获取焦点


    wx.getSystemInfo({
      success: function(res) {
        // 是ios版本
        if (res.platform.indexOf('ios') != -1) {
          console.log('ios版本')
          var temp = '43%'
          self.setData({
            bottom: temp
          })
        } else {
          console.log('其它版本')
          // 其它版本
          var temp = '48%'
          self.setData({
            bottom: temp
          })
        }



      },
      fail: function() {

      },
      complete: function() {}

    })

  },
  onblur: function() {

    this.setData({
      isFocus: false,
      bottom: 0
    })

    wx.getSystemInfo({
      success: function(res) {},
      fail: function() {

      },
      complete: function() {}

    })

  },
  clearhistory() {
    var self = this;
    wx.showModal({
      title: '警告',
      content: '删除后不可恢复!',
      success: function(res) {
        if (res.confirm) {
          wx.setStorage({
            key: self.data.storageKey,
            data: []
          })
          self.setData({
            hiddenSearchBtn: true,
            historyDataList: []
          })
        } else if (res.cancel) {}
      },
      fail() {

      }
    })
  },
  cancelSearch() {
    this.setData({
      searchkey: ''
    });
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]
    if (this.data.storageKey == "cocsearch") {
      console.log("chongzhichenggg ");
    }
    wx.navigateBack({
      delta: 1
    });

  },
  getInputContent(e) {
    var str = app.isHaveEmojiStr(e.detail.value)
    this.setData({
      searchkey: str
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var title = options.title;
    this.setData({
      storageKey: options.storageKey,
      currenttab: options.currenttab
    })
    if (options.storageKey == "hightcocsearch" || options.storageKey == "allcocsearch") {
      wx.setNavigationBarTitle({
        title: '商会搜索'
      })
    } else if (options.storageKey == "hightcompanysearch" || options.storageKey == "allcompanysearch") {
      wx.setNavigationBarTitle({
        title: '公司搜索'
      })
    } else if (options.storageKey == "resourcesSearch") {
      wx.setNavigationBarTitle({
        title: '资源搜索'
      })
      wx.setStorageSync('currentpage', {
        currenttab: 0,
        currentpage: 'supplypage'
      });
    } else if (options.storageKey == "demandSearch") {
      wx.setNavigationBarTitle({
        title: '需求搜索'
      })
      wx.setStorageSync('currentpage', {
        currenttab: 1,
        currentpage: 'supplypage'
      });
    } else if (options.storageKey == "activitySearch") {
      wx.setNavigationBarTitle({
        title: '活动搜索'
      })
    }
    // if(this.data.currenttab == 2){
    //   wx.setNavigationBarTitle({
    //     title:'商会搜索'
    //   })
    // }else if(title){
    //   wx.setNavigationBarTitle({
    //     title:title
    //   })
    // }else{
    //   wx.setNavigationBarTitle({
    //     title:'公司搜索'
    //   })
    // }
    // if(options.storageKey=="hightcompanysearch"||options.storageKey=="allcompanysearch"){
    //   this.setData({searchPlaceholder:"填写公司名称"});
    // }else if(){
    //   this.setData({searchPlaceholder:"填写公司名称"});
    // }
    this.getHistory();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // if (this.data.currIndex)
    // wx.setNavigationBarTitle({
    //   title: '商会搜索',
    // })
    // this.setData({focus:true});
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})