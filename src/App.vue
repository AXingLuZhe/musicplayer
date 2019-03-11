<template>
  <div id="app">
    <div id="appCont">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!--固定播放-->
    <div id="play" v-show="this.songSrc.length" class="uk-label-success uk-width-1-1">
      <audio :src='songSrc' @canplay="durationTime" @timeupdate="updateTime" controls="controls" autoplay="autoplay" style="display:none">
        <source :src="songSrc"/>Your browser can not support audio.
      </audio>
      <div class="uk-grid uk-flex">
        <!--歌曲信息-->
        <div @click="$router.push({name: 'playDetail'})" id="appSong" class="uk-width-2-3 uk-grid  uk-flex-middle">
          <div class="uk-width-1-3">
            <img v-lazy="song.al.picUrl" :key="song.al.picUrl" alt="song.name">
          </div>
          <div class="uk-width-2-3 uk-padding-remove-left">
            <p class="uk-margin-remove  uk-text-truncate">{{song.name}}</p>
            <p class="uk-text-small uk-margin-remove  uk-text-truncate">{{song.ar[0].name}}</p>
          </div>
        </div>
        <!--播放收藏-->
        <div id="appPlay" class="uk-width-1-3 uk-grid uk-margin-remove uk-flex-middle">
          <div class="uk-width-1-2" @click="playSong(isPlay)">
            <svg ref="play" class="icon" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path fill="#000000" d="M512 1024C228.266667 1024 0 795.733333 0 512S228.266667 0 512 0s512 228.266667 512 512-228.266667 512-512 512z m0-42.666667c260.266667 0 469.333333-209.066667 469.333333-469.333333S772.266667 42.666667 512 42.666667 42.666667 251.733333 42.666667 512s209.066667 469.333333 469.333333 469.333333z m-106.666667-682.666666c12.8 0 21.333333 8.533333 21.333334 21.333333v384c0 12.8-8.533333 21.333333-21.333334 21.333333s-21.333333-8.533333-21.333333-21.333333V320c0-12.8 8.533333-21.333333 21.333333-21.333333z m213.333334 0c12.8 0 21.333333 8.533333 21.333333 21.333333v384c0 12.8-8.533333 21.333333-21.333333 21.333333s-21.333333-8.533333-21.333334-21.333333V320c0-12.8 8.533333-21.333333 21.333334-21.333333z" />
            </svg>
          </div>
          <div class="uk-width-1-2" @click="loveSong">
            <svg ref="love" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" stroke="#000" stroke-width="1.03" d="M10,4 C10,4 8.1,2 5.74,2 C3.38,2 1,3.55 1,6.73 C1,8.84 2.67,10.44 2.67,10.44 L10,18 L17.33,10.44 C17.33,10.44 19,8.84 19,6.73 C19,3.55 16.62,2 14.26,2 C11.9,2 10,4 10,4 L10,4 Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {getSongmsg, getRadiosrc} from './api/index'
export default {
  name: 'App',
  data () {
    return {
      now: 0,
      total: 0,
      songSrc: ''
    }
  },
  methods: {
    // 获取audio时长
    updateTime () {
      this.now = parseInt(document.querySelector('audio').currentTime)
    },
    durationTime () {
      this.total = parseInt(document.querySelector('audio').duration)
    },
    // 点击改变播放状态
    playSong (isPlay) {
      this.setisPlay(!this.isPlay)
    },
    /* ****************点击收藏（后期vuex可保存收藏状态）*************************/
    loveSong () {
      let loveFlag = this.$refs.love.children[0].attributes.fill.value
      if (loveFlag === 'none') {
        this.$refs.love.children[0].attributes.stroke.value = '#ff3333'
        this.$refs.love.children[0].attributes.fill.value = '#ff3333'
      } else {
        this.$refs.love.children[0].attributes.stroke.value = '#000'
        this.$refs.love.children[0].attributes.fill.value = 'none'
      }
    },
    ...mapMutations({setwhichSong: 'setwhichSong', setSong: 'setSong', setisPlay: 'setisPlay', setnowTime: 'setnowTime', settotalTime: 'settotalTime'})
  },
  watch: {
    // 监听路由默认转到音乐流行
    $route (to, from) {
      if (to.name === 'Music') { this.$router.push({name: 'poPul'}) }
    },
    // 实时刷新播放时间，结束后循环播放
    now () {
      if (this.now !== this.total) {
        this.setnowTime(this.now)
      } else {
        document.querySelector('audio').currentTime = 0
      }
    },
    total () {
      this.settotalTime(this.total)
    },
    // 播放键监听播放状态
    isPlay () {
      // 初始化歌曲，可以audio防止自动播放及403错误(无v-show时初始化)
      // if (!this.song.id) {
      //  this.setSong({
      //    al: {name: '林俊杰', picUrl: '/mymusic/static/image/initPic.jpg'},
      //    name: '醉赤壁',
      //    id: 108478
      //  })
      // }
      // 播放暂停
      if (this.isPlay) {
        document.querySelector('audio').play()
        this.$refs.play.children[0].attributes.d.nodeValue = 'M512 1024C228.266667 1024 0 795.733333 0 512S228.266667 0 512 0s512 228.266667 512 512-228.266667 512-512 512z m0-42.666667c260.266667 0 469.333333-209.066667 469.333333-469.333333S772.266667 42.666667 512 42.666667 42.666667 251.733333 42.666667 512s209.066667 469.333333 469.333333 469.333333z m-106.666667-682.666666c12.8 0 21.333333 8.533333 21.333334 21.333333v384c0 12.8-8.533333 21.333333-21.333334 21.333333s-21.333333-8.533333-21.333333-21.333333V320c0-12.8 8.533333-21.333333 21.333333-21.333333z m213.333334 0c12.8 0 21.333333 8.533333 21.333333 21.333333v384c0 12.8-8.533333 21.333333-21.333333 21.333333s-21.333333-8.533333-21.333334-21.333333V320c0-12.8 8.533333-21.333333 21.333334-21.333333z'
      } else {
        document.querySelector('audio').pause()
        this.$refs.play.children[0].attributes.d.nodeValue = 'M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333c-258.133 0-469.333-211.2-469.333-469.333S253.867 42.667 512 42.667 981.333 253.867 981.333 512 770.133 981.333 512 981.333zM672 441.6L501.333 328.533c-57.6-38.4-106.666-12.8-106.666 57.6v256c0 70.4 46.933 96 106.666 57.6L672 586.667C729.6 544 729.6 480 672 441.6z'
      }
    },
    // 点击歌曲时获取src,歌曲所在列表下标
    song () {
      this.setisPlay(true)
      // 若是电台则搜索电台
      if (this.song.mode === 'radio') {
        getRadiosrc(this.song.id).then((res) => {
          this.songSrc = res.data[0].url
        })
      } else {
        // 否则搜索音乐
        getSongmsg(this.song.id).then((res) => {
          this.songSrc = res.data[0].url
        })
      }
    },
    // song先变，songList后变，app的songList先于playDetail
    // 获取索引要等songList变后，且在playDetail之前
    // 歌曲改变获取所在歌单索引，方便操作
    songList () {
      console.log('App watch List change')
      var whs = this.songList.map(item => item.name).indexOf(this.song.name)
      this.setwhichSong(whs)
    }
  },
  computed: {
    ...mapGetters(['songList', 'song', 'isPlay', 'nowTime'])
  }
}
</script>

<style>
  #appCont{background: #F2F3F4;min-height:100vh;z-index: 0;font-size:1rem;}
  #play{position: fixed;bottom:0;z-index: 1000;color: #1f1f1f;background-color: white;opacity: 0.9;}
  #appSong{margin:0;padding-left:10px;}
  #appSong img{border-radius:100%;max-height: 70px;
    -webkit-transform: scale(0.8);
    -moz-transform: scale(0.8);
    -ms-transform: scale(0.8);
    -o-transform: scale(0.8);
    transform: scale(0.8);}
  #appPlay{padding:0;}
  #appPlay div{padding:16px;text-align: center;}
</style>
