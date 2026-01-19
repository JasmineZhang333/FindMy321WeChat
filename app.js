App({
  onLaunch() {
    const storage = require('./utils/storage.js')
    // 强制使用最新的 classmates.js 数据重置本地存储
    // 这样更新后的数据才能同步到地图
    storage.resetFromFile()
  }
})
