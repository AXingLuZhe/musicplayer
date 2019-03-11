<template>
  <div id="popul">
    <!--滑块-->
    <div>
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide><img src="/mymusic/static/image/slider1.jpg"></swiper-slide>
        <swiper-slide><img src="/mymusic/static/image/slider2.jpg"></swiper-slide>
        <swiper-slide><img src="/mymusic/static/image/slider3.jpg"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!--------------------------------子按钮导航(后期可添加)--------------------------------->
    <!--歌单-->
    <div id="populCont">
      <div id="populHeader" class="uk-card-header uk-padding-small">
        <span class="uk-text-bold">最新</span>
        <span class="uk-align-right">
          <svg class="icon" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path fill="#000000" d="M762.76 371.92l-2.68-2.68a48.24 48.24 0 0 0-68 0l-180 180-180-180a48.24 48.24 0 0 0-68 0l-2.68 2.68a48.24 48.24 0 0 0 0 68l214.65 214.84a53.19 53.19 0 0 0 71.9 0L762.76 440a48.24 48.24 0 0 0 0-68.08z"  />
          </svg>
        </span>
      </div>
      <div id="song" class="uk-grid uk-grid-collapse">
        <div v-for="item in popsongList" @click="openSong(item)" :key="item.id" class="uk-width-1-3 uk-margin-bottom uk-text-small uk-text-contrast">
          <div class="popImg"><img v-lazy="item.al.picUrl" alt="item.name"></div>
          <p class="uk-margin-remove uk-text-truncate">{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import {getSonglist} from '../api/index'
import {mapMutations} from 'vuex'

export default {
  name: 'poPul',
  data () {
    return {
      // 歌单数据
      popsongList: [],
      // 自动轮播数据
      swiperOption: {
        notNextTick: true,
        pagination: {el: '.swiper-pagination'},
        loop: true,
        autoplay: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true
      }
    }
  },
  created () {
    this._getSonglist()
  },
  methods: {
    // 获取热门歌单信息
    _getSonglist () {
      getSonglist('流行', 39).then(res => {
        this.popsongList = res.result.songs
        // console.log(res, this.popsongList)
      })
    },
    // 点击歌曲，设置播放歌曲，保存所在歌单
    openSong (item) {
      this.setsongList(this.popsongList)
      this.setSong(item)
    },
    ...mapMutations({setsongList: 'setsongList', setSong: 'setSong', setisPlay: 'setisPlay'})
  },
  component: {
    swiper,
    swiperSlide
  }
}
</script>

<style scoped>
#song{padding:0.4vw;}
#song div{padding:0.8vh 0.4vw;}
#song p{padding-top:5px;font-size:0.9em;color:black;}
.popImg img{border-radius: 5px;}
</style>
