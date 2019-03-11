<template>
  <div id="Board">
    <!--搜索Mv-->
    <div>
      <p class="uk-margin-remove uk-grid">
        <span class="uk-width-1-5 uk-padding-small">
          <svg class="icon" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path fill="#000000" d="M654.322449 575.575967c-17.248849 0-31.233352 13.984503-31.233352 31.233352l0 30.470989c0 17.248849 13.984503 31.233352 31.233352 31.233352s31.233352-13.984503 31.233352-31.233352l0-30.470989C685.556824 589.56047 671.571299 575.575967 654.322449 575.575967zM898.096499 668.51366c17.248849 0 31.233352-13.984503 31.233352-31.233352l0-30.470989c0-17.248849-13.984503-31.233352-31.233352-31.233352s-31.233352 13.984503-31.233352 31.233352l0 30.470989C866.862123 654.529157 880.847649 668.51366 898.096499 668.51366zM810.357202 726.091006c-0.121773 0.198521-13.379729 19.449981-33.968649 19.449981-19.993357 0-32.428573-18.107403-33.271778-19.373233-9.17087-14.417361-28.28009-18.799158-42.829458-9.760295-14.655791 9.104355-19.155269 28.360931-10.04989 43.012629 11.209296 18.047028 41.974997 48.588625 86.151126 48.588625 43.958164 0 75.099419-30.3134 86.573751-48.223305 9.302877-14.528901 5.068436-33.846876-9.455349-43.149752C838.957587 707.336874 819.654962 711.572338 810.357202 726.091006zM917.40731 886.981347 454.633455 886.981347c-17.248849 0-31.233352 13.984503-31.233352 31.233352s13.984503 31.233352 31.233352 31.233352l462.774879 0c17.248849 0 31.233352-13.984503 31.233352-31.233352S934.656159 886.981347 917.40731 886.981347zM845.170079 200.203718c-3.14155-39.235606-21.005406-74.891687-50.301639-100.400664-0.345877-0.294712-0.691755-0.584308-1.046842-0.868787-29.352515-25.102724-66.493413-37.186947-104.742553-33.927717-38.670741 3.258207-73.727165 21.716604-98.697883 51.969629L145.734152 655.392828c-4.722558 5.703909-8.083096 12.266371-9.953699 19.409049L76.921927 895.989511c-4.915963 18.727527 1.276063 38.97057 15.703657 51.507094 9.099239 7.966439 20.924565 12.358469 32.971949 12.358469 1.372254 0 2.745531-0.056282 4.117784-0.172939 5.835915-0.488117 11.524474-2.00261 17.111726-4.590552l202.769147-95.67299c6.548136-3.095501 12.286838-7.518231 17.32969-13.46671l444.661336-538.458605C836.379878 277.464359 848.311629 239.35746 845.170079 200.203718zM320.502571 804.073078l-176.659489 83.350336 51.680033-194.2184 350.625636-424.574858 130.506333 104.162338L320.502571 804.073078zM763.420193 267.723507l-46.984081 56.894801-130.505309-104.162338 52.615335-63.713091c14.18814-17.182334 33.994232-27.659967 55.772234-29.494755 21.726837-1.794879 42.85504 5.164626 59.518558 19.693528 0.264013 0.229221 0.529049 0.452301 0.798179 0.671289 16.440437 14.676257 26.464745 35.07689 28.269857 57.576323C784.735661 228.071416 777.817088 250.282277 763.420193 267.723507z" />
          </svg>
        </span>
        <span class="uk-width-4-5 uk-padding-small">
          <input class="uk-input" ref="search" @keyup.13="searchCont" type="text" placeholder="更多Mv内容请搜索..."/>
        </span>
      </p>
      <mv-list @setMv="openMv($event)" :type="searchType" v-if="searchType !== ''"></mv-list>
    </div>
    <!--默认Mv-->
    <div v-for="(item, index) in mvType" :key="index + 1">
      <mv-list @setMv="openMv($event)" :type="item"></mv-list>
    </div>
    <!--播放Mv-->
    <div class="mvPlay" v-if="isShow">
      <div @click="changeShow" class="bg"></div>
      <video :src="mvSrc" autoplay controls></video>
    </div>
  </div>
</template>

<script>
import MvList from '../base/mv-list'
import {getMVmsg} from '../api'
import {mapMutations} from 'vuex'

export default {
  name: 'Mv',
  data () {
    return {
      mvType: ['精选', '最热', '最新'],
      searchType: '',
      mvSrc: '',
      isShow: false
    }
  },
  methods: {
    searchCont () {
      this.searchType = this.$refs.search.value
    },
    changeShow () {
      this.isShow = false
    },
    openMv (item) {
      this.isShow = true
      getMVmsg(item.id).then((res) => {
        let source = res.data.brs[720]
        let source1 = res.data.brs[480]
        let source2 = res.data.brs[240]
        if (source === undefined) {
          this.mvSrc = source1
        } else if (source1 === undefined) {
          this.mvSrc = source2
        } else {
          this.mvSrc = source
        }
      })
    },
    ...mapMutations({setisPlay: 'setisPlay'})
  },
  watch: {
    // 离开页面停止播放
    $route (to, from) {
      if (to.name === 'Mv') {
        this.isShow = false
      }
    },
    // 播放时停止音乐,停止时播放音乐
    isShow () {
      if (this.isShow === true) {
        this.setisPlay(false)
      } else {
        this.setisPlay(true)
      }
    }
  },
  components: {MvList}
}
</script>

<style scoped>
  #Board{padding-bottom: 102px;margin-top:90px;}
  .mvPlay{position:fixed;top:0;width:100vw;height:100vh;z-index:2000;}
  .bg{position:absolute;top:0;content: '';width:100%;height:100%;background-color: #777777;opacity:0.5;}
  .mvPlay video{position:absolute;top:30vh;}
</style>
