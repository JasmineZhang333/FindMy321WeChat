const storage = require('../../utils/storage.js')

Page({
  data: {
    profile: {
      name: '',
      wechatId: '',
      country: '',
      city: ''
    }
  },
  onShow() {
    const p = storage.getProfile()
    this.setData({ profile: Object.assign({}, this.data.profile, p) })
  },
  login() {
    wx.getUserProfile({
      desc: '完善资料',
      success: res => {
        const name = res.userInfo && res.userInfo.nickName ? res.userInfo.nickName : ''
        this.setData({ 'profile.name': name })
      }
    })
  },
  onInputName(e) {
    this.setData({ 'profile.name': e.detail.value })
  },
  onInputWechatId(e) {
    this.setData({ 'profile.wechatId': e.detail.value })
  },
  onInputCountry(e) {
    this.setData({ 'profile.country': e.detail.value })
  },
  onInputCity(e) {
    this.setData({ 'profile.city': e.detail.value })
  },
  saveProfile() {
    const p = this.data.profile
    storage.setProfile(p)
    wx.showToast({ title: '已保存', icon: 'success' })
  }
})
