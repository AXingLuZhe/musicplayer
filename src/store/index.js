import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songList: [],
    // 单曲
    song: {
      al: {picUrl: ''},
      name: '',
      ar: [{name: ''}]
    },
    whichSong: 0,
    isPlay: false,
    nowTime: 0,
    totalTime: 0,
    // 歌手
    singer: '',
    // 电台
    radio: ''
  },
  getters: {
    songList (state) { return state.songList },
    song (state) { return state.song },
    whichSong (state) { return state.whichSong },
    isPlay (state) { return state.isPlay },
    nowTime (state) { return state.nowTime },
    totalTime (state) { return state.totalTime },
    singer (state) { return state.singer },
    radio (state) { return state.radio }
  },
  mutations: {
    setsongList (state, songList) { state.songList = songList },
    setSong (state, song) { state.song = song },
    setwhichSong (state, whichSong) { state.whichSong = whichSong },
    setisPlay (state, isPlay) { state.isPlay = isPlay },
    setnowTime (state, nowTime) { state.nowTime = nowTime },
    settotalTime (state, totalTime) { state.totalTime = totalTime },
    setsinger (state, singer) { state.singer = singer },
    setradio (state, radio) { state.radio = radio }
  },
  actions: {}
})
