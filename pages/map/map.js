const storage = require('../../utils/storage.js')

Page({
  data: {
    center: { lat: 30.0, lng: 100.0 },
    scale: 3,
    markers: [],
    includePoints: [],
    cityStats: [],
    selectedCity: null
  },
  onShow() {
    const list = storage.getAll()
    const grouped = storage.groupByCityCountry(list)
    const markers = grouped.map((g, idx) => ({
      id: idx + 1,
      latitude: g.lat,
      longitude: g.lng,
      width: 32,
      height: 32,
      iconPath: "../../assets/icons/star.png",
      callout: {
        content: g.city + '\n' + g.count + '人',
        display: 'BYCLICK',
        padding: 6,
        borderRadius: 6
      }
    }))
    const includePoints = grouped.map(g => ({
      latitude: g.lat,
      longitude: g.lng
    }))
    const center = includePoints.length
      ? { lat: includePoints[0].latitude, lng: includePoints[0].longitude }
      : this.data.center
    this.setData({
      markers,
      includePoints,
      cityStats: grouped,
      center
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
