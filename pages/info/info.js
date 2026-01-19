const storage = require('../../utils/storage.js')

Page({
  data: {
    list: []
  },
  onShow() {
    this.setData({ list: storage.getAll() })
  }
})
