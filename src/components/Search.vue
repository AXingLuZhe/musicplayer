<template>
  <div id="search">
    <div class="uk-padding-small uk-label-success uk-width-1-1" id="searchHead">
      <p class="uk-margin-remove uk-grid">
        <span @click="$router.back(-1)" class="uk-width-1-5 uk-padding-small">
          <svg class="icon" width="20px" height="29.60px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" d="M475.9 193.8L182.7 487H937v50H182.7l293.2 293.2-35.4 35.4L87 512l353.6-353.6 35.3 35.4z"  />
          </svg>
        </span>
        <span class="uk-width-4-5 uk-flex uk-padding-small">
          <input ref="search" @keyup.13="searchSong" class="uk-width-1-1" type="text" placeholder="搜索歌曲..."/>
        </span>
      </p>
    </div>
    <div id="searchCot">
      <ul class="searchUl uk-margin-remove">
        <li v-for="song in searchList" @click="openSong(song)" :key="song.id">
          <p class="uk-margin-remove uk-text-truncate">{{song.name}}</p>
          <p class="uk-text-small uk-text-muted uk-margin-remove uk-text-truncate">
            {{song.ar[0].name}}-{{song.al.name}}
          </p>
        </li>
      </ul>
      <p class="searchP uk-text-center">到底部了...</p>
    </div>
  </div>
</template>

<script>
import {getSonglist} from '../api/index'
import {mapMutations} from 'vuex'
export default {
  name: 'Search',
  data () {
    return {
      searchList: []
    }
  },
  methods: {
    searchSong () {
      var sName = this.$refs.search.value
      getSonglist(sName, 60).then((res) => {
        if (res.code === 200) {
          this.searchList = res.result.songs
        } else {
          this.searchList = []
        }
      })
    },
    openSong (song) {
      this.setSong(song)
      var searchL = []
      searchL.push(song)
      this.setsongList(searchL)
    },
    ...mapMutations({setSong: 'setSong', setsongList: 'setsongList'})
  }
}
</script>

<style scoped>
#search{padding-bottom: 60px;padding-top:90px;}
#searchHead{position:fixed;top:0;background: #d4453a;}
#searchHead input{background-color:#D4453A;color:white;border:none;outline:none;border-bottom:1px solid white;}
#searchHead input::-webkit-input-placeholder{color:white;}
.searchUl{padding:1vh 2vw;}
#searchCot li{list-style: none;border-bottom:0.02vh solid rgba(25, 25, 25, 0.34);padding-bottom: 10px;}
.searchP{font-size:0.9rem;}
</style>
