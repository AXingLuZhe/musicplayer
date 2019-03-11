import axios from 'axios'

// 获取电台类型列表
export function getRadiolist (searchName) {
  const url = 'https://api.imjad.cn/cloudmusic/'
  const params = {
    type: 'search',
    search_type: 1009,
    s: searchName,
    limit: 6
  }
  return axios.get(url, { params: params }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取电台主播列表
export function getRadiomsg (radioId) {
  const url = 'https://api.imjad.cn/cloudmusic/'
  const params = {
    type: 'djradio',
    id: radioId,
    limit: 300
  }
  return axios.get(url, { params: params }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取电台信息
export function getRadiosrc (Id) {
  const url = 'https://api.imjad.cn/cloudmusic/'
  const params = {
    type: 'dj',
    id: Id
  }
  return axios.get(url, { params: params }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取MV列表
export function getMVlist (searchName, num) {
  const url = 'https://api.imjad.cn/cloudmusic/'
  const params = {
    type: 'search',
    search_type: 1004,
    s: searchName,
    limit: num
  }
  return axios.get(url, { params: params }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取MV信息
export function getMVmsg (mvId) {
  const url = 'https://api.imjad.cn/cloudmusic/'
  const params = {
    type: 'mv',
    id: mvId
  }
  return axios.get(url, { params: params }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取歌曲列表
export function getSonglist (searchCon, num) {
  const url = 'https://api.imjad.cn/cloudmusic/'
  const params = {
    type: 'search',
    limit: num,
    s: searchCon
  }
  return axios.get(url, { params: params }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取歌曲信息
export function getSongmsg (songId) {
  const url = 'https://api.imjad.cn/cloudmusic/'
  const params = {
    type: 'song',
    id: songId,
    br: 198000
  }
  return axios.get(url, { params: params }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取歌手列表
export function getSinger (searchCon, num) {
  const url = 'https://api.imjad.cn/cloudmusic/'
  const params = {
    type: 'search',
    search_type: 100,
    limit: num,
    s: searchCon
  }
  return axios.get(url, { params: params }).then((res) => {
    return Promise.resolve(res.data)
  })
}
