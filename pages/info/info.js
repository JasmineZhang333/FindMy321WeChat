const storage = require('../../utils/storage.js')

Page({
  data: {
    list: []
  },
  onShow() {
    const list = storage.getAll().map(item => ({
      ...item,
      initial: item.name.charAt(0)
    }))
    this.setData({ list })
  }
})
