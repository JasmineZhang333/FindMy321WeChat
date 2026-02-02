const storage = require('../../utils/storage.js')

Page({
  data: {
    center: { lat: 30.0, lng: 100.0 },
    scale: 4,
    markers: [],
    includePoints: [],
    cityStats: [],
    list: [],
    selectedCity: null
  },
  onShow() {
    const list = storage.getAll()
    const grouped = storage.groupByCityCountry(list)
    const markers = grouped.map((g, idx) => ({
      id: idx + 1,
      latitude: g.lat,
      longitude: g.lng,
      width: 24,
      height: 24,
      iconPath: "",
      label: {
        content: g.city,
        display: 'ALWAYS',
        padding: 4,
        borderRadius: 4,
        fontSize: 11,
        color: '#ffffff',
        bgColor: '#3b82f6',
        textAlign: 'center'
      },
      callout: {
        content: g.city + ' (' + g.count + '人)',
        display: 'ALWAYS',
        padding: 6,
        borderRadius: 6,
        fontSize: 12
      }
    }))
    const includePoints = grouped.map(g => ({
      latitude: g.lat,
      longitude: g.lng
    }))
    if (includePoints.length > 0) {
      this.setData({
        center: { lat: includePoints[0].latitude, lng: includePoints[0].longitude }
      })
    }
    this.setData({
      markers,
      includePoints,
      cityStats: grouped,
      list: list
    })
  },
  getUserLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          center: {
            lat: res.latitude,
            lng: res.longitude
          },
          scale: 12
        })
        wx.showToast({
          title: '已定位',
          icon: 'success',
          duration: 1500
        })
      },
      fail: (err) => {
        console.error('获取位置失败:', err)
        if (err.errMsg.includes('auth deny')) {
          wx.showModal({
            title: '提示',
            content: '需要您授权位置权限才能使用定位功能',
            confirmText: '去设置',
            success: (res) => {
              if (res.confirm) {
                wx.openSetting()
              }
            }
          })
        } else {
          wx.showToast({
            title: '定位失败',
            icon: 'none'
          })
        }
      }
    })
  },
  onMarkerTap(e) {
    const markerId = e.detail.markerId
    const selectedCity = this.data.cityStats[markerId - 1]
    if (selectedCity) {
      this.setData({
        selectedCity: selectedCity
      })
    }
  },
  closePopup() {
    this.setData({
      selectedCity: null
    })
  }
})
