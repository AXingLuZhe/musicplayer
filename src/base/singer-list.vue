<template>
  <div class="singerList">
    <p class="singerlistHead uk-margin-remove-top">{{type}}</p>
    <div v-for="item in singerList" @click="toDetail(item)" :key="item.id" class="singerlistCont uk-width-1-1">
      <img class="uk-width-1-6" v-lazy="item.img1v1Url"/>
      <span class="uk-width-4-5 uk-padding">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
import {getSinger} from '../api'
import {mapMutations} from 'vuex'
// 获取渲染歌手列表
export default {
  name: 'singer-list',
  props: ['type'],
  data () {
    return {
      singerList: []
    }
  },
  created () {
    this._getSinger(this._props.type)
  },
  watch: {
    type () {
      this._getSinger(this._props.type)
    }
  },
  methods: {
    _getSinger (type) {
      let num = 16
      if (type === '流行') {
        num = 8
      } else if (type === '男' || type === '女') {
        num = 16
      } else {
        num = 3
      }
      getSinger(type, num).then((res) => {
        this.singerList = res.result.artists
      })
    },
    toDetail (item) {
      this.setsinger(item)
      this.$router.push({ name: 'singerDetail' })
    },
    ...mapMutations({setsinger: 'setsinger'})
  }
}
</script>

<style scoped>
  .singerList{font-size:1rem;}
  .singerlistHead{padding:0 5vw;margin-bottom:1vh;font-size:0.9em;background-color: #dadbdc;color:white;}
  .singerlistCont{padding:1vh 2vw;border-bottom: 1px solid #bfbfbf;color:black;}
  .singerlistCont img{border-radius: 4px;min-height: 55px;}
</style>
