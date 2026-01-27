const KEY = 'classmates'
const PROFILE_KEY = 'myProfile'

function getAll() {
  return wx.getStorageSync(KEY) || []
}

function setAll(list) {
  wx.setStorageSync(KEY, list)
}

function initFromFile() {
  const existing = wx.getStorageSync(KEY)
  if (existing && existing.length) return existing
  return resetFromFile()
}

function resetFromFile() {
  const data = require('../data/classmates.js')
  wx.setStorageSync(KEY, data)
  return data
}

function add(item) {
  const list = getAll()
  const id = list.length ? Math.max.apply(null, list.map(x => x.id)) + 1 : 1
  const newItem = Object.assign({ id }, item)
  list.push(newItem)
  setAll(list)
  return newItem
}

function update(id, patch) {
  const list = getAll()
  const idx = list.findIndex(x => x.id === id)
  if (idx >= 0) {
    list[idx] = Object.assign({}, list[idx], patch)
    setAll(list)
    return list[idx]
  }
  return null
}

function groupByCityCountry(list) {
  const map = {}
  list.forEach(x => {
    const key = x.country + '-' + x.city
    const lat = Number(x.location.lat)
    const lng = Number(x.location.lng)
    
    if (isNaN(lat) || isNaN(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
      console.warn('Invalid location for user:', x.name, x.location)
      return
    }

    if (!map[key]) {
      map[key] = {
        country: x.country,
        city: x.city,
        names: [],
        lat: lat,
        lng: lng,
        count: 0
      }
    }
    map[key].names.push(x.name)
    map[key].count++
  })
  
  const result = Object.values(map).sort((a, b) => b.count - a.count)
  
  result.forEach(g => {
    g.names.sort((a, b) => a.localeCompare(b, 'zh-CN'))
  })
  
  return result
}

function getProfile() {
  return wx.getStorageSync(PROFILE_KEY) || {}
}

function setProfile(profile) {
  wx.setStorageSync(PROFILE_KEY, profile)
}

module.exports = {
  KEY,
  PROFILE_KEY,
  getAll,
  setAll,
  initFromFile,
  resetFromFile,
  add,
  update,
  groupByCityCountry,
  getProfile,
  setProfile
}
