<template>
  <div class="radiolistDetail">
    <!--头部-->
    <div class="listHead uk-padding-remove uk-width-1-1">
      <p class="uk-margin-remove uk-grid">
        <span @click="$router.back(-1)" class="uk-width-1-5 uk-padding-small">
          <svg class="icon" width="20px" height="29.60px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" d="M475.9 193.8L182.7 487H937v50H182.7l293.2 293.2-35.4 35.4L87 512l353.6-353.6 35.3 35.4z"  />
          </svg>
        </span>
        <span class="uk-width-4-5 uk-flex uk-padding-small">
           <span class="uk-text-truncate">
             {{radio.name}}
           </span>
        </span>
      </p>
    </div>
    <!--背景-->
    <div class="listBg">
      <img v-lazy="radio.picUrl" :key="radio.id">
    </div>
    <!--歌单-->
    <div class="listdtCont">
      <div class="listCont uk-padding-small">
        <span class="uk-padding-small">
          <svg class="icon" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path fill="#000000" d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333c-258.133 0-469.333-211.2-469.333-469.333S253.867 42.667 512 42.667 981.333 253.867 981.333 512 770.133 981.333 512 981.333zM672 441.6L501.333 328.533c-57.6-38.4-106.666-12.8-106.666 57.6v256c0 70.4 46.933 96 106.666 57.6L672 586.667C729.6 544 729.6 480 672 441.6z" />
          </svg>
        </span>
        <span>播放全部(共{{radiolist.length}}首)</span>
      </div>
      <div v-for="(item,index) in radiolist" @click="openRadio(item)" class="listCont uk-grid uk-width-1-1 uk-margin-remove" :key="index">
        <div class="uk-width-1-6 uk-padding-small uk-text-center">
          <span>{{index + 1}}</span>
        </div>
        <div class="listP uk-width-5-6 uk-padding-small">
          <p class="uk-margin-remove uk-text-truncate">{{item.name}}</p>
          <p class="uk-margin-remove uk-text-truncate">{{item.ar[0].name}}</p>
        </div>
      </div>
      <div>
        <p class="uk-text-center uk-margin-remove">到底部了...</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {getRadiomsg} from '../api'
// 获取渲染电台详细列表
export default {
  name: 'radiolistDetail',
  data () {
    return {
      radiolist: []
    }
  },
  created () {
    this._getRadiomsg(this.radio.id)
  },
  watch: {
    radio () {
      this._getRadiomsg(this.radio.id)
    }
  },
  methods: {
    // 初始化数据
    _getRadiomsg (radioid) {
      getRadiomsg(radioid).then((res) => {
        this.radiolist = this.radioTosong(res.programs)
      })
    },
    // 点击保存歌曲，歌单以便监听播放
    openRadio (item) {
      this.setSong(item)
      this.setsongList(this.radiolist)
    },
    // 将电台数据转换成歌曲相应属性数据
    radioTosong (radio) {
      let radioList = []
      for (let i = 0, len = radio.length; i < len; i++) {
        let item = radio[i]
        let song = {id: item.id, mode: 'radio', al: {picUrl: item.coverUrl}, name: item.name, ar: [{name: item.mainSong.artists[0].name}]}
        radioList.push(song)
      }
      return radioList
    },
    ...mapMutations({setSong: 'setSong', setsongList: 'setsongList'})
  },
  computed: {
    ...mapGetters(['radio'])
  }
}
</script>

<style scoped>
  .radiolistDetail{font-size: 1rem;padding-top:60px;padding-bottom:60px;}
  .listHead{background-color: #d4453a;color:white;position:fixed;top:0;z-index:2;}
  .listBg{height: 40vh;}
  .listBg img{position:relative;z-index:0;top:-4vh;}
  .listdtCont{width:100vw;position:relative;background-color: #f2f3f4;z-index:1;border-radius:15px 10px;}
  .listCont{border-bottom:0.02vh solid rgba(25, 25, 25, 0.34);}
  .listP p:nth-child(1){color:black;}
  .listP p:nth-child(2){font-size: 0.8em;}
</style>
