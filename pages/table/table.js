const storage = require('../../utils/storage.js')

Page({
  data: {
    list: [],
    form: {
      name: '',
      country: '',
      city: '',
      location: null
    }
  },
  onShow() {
    this.refresh()
  },
  refresh() {
    this.setData({ list: storage.getAll() })
  },
  onInputName(e) {
    this.setData({ 'form.name': e.detail.value })
  },
  onInputCountry(e) {
    this.setData({ 'form.country': e.detail.value })
  },
  onInputCity(e) {
    this.setData({ 'form.city': e.detail.value })
  },
  chooseLocation() {
    wx.chooseLocation({
      success: res => {
        const loc = { lat: res.latitude, lng: res.longitude }
        this.setData({ 'form.location': loc })
      }
    })
  },
  addClassmate() {
    const f = this.data.form
    if (!f.name || !f.country || !f.city || !f.location) {
      wx.showToast({ title: '请完善信息', icon: 'none' })
      return
    }
    storage.add({
      name: f.name,
      country: f.country,
      city: f.city,
      location: f.location
    })
    this.setData({
      form: { name: '', country: '', city: '', location: null }
    })
    wx.showToast({ title: '已新增', icon: 'success' })
    this.refresh()
  },
  editLocation(e) {
    const id = e.currentTarget.dataset.id
    wx.chooseLocation({
      success: res => {
        storage.update(id, {
          location: { lat: res.latitude, lng: res.longitude }
        })
        wx.showToast({ title: '位置已更新', icon: 'success' })
        this.refresh()
      }
    })
  }
})
