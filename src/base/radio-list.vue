<template>
  <div class="radio">
    <div class="radiohead">
      <span>{{type}}</span>
      <span>
        <svg class="icon" width="40px" height="30px" viewBox="0 0 1099 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path fill="#000000" d="M431.46 273.2c8.1-6.4 14.3-6.5 24 3.3 0 0 200.1 194.3 207.7 201.9 5.8 5.8 9.7 10.2 9.7 16.9 0 7.5-3.9 12.8-9.7 18.1L454.96 716.5c-7.9 7.7-13.8 12.1-23.2 3.7-10.7-9.8-7-13.9 3.9-26l205.3-198.6L437.16 301C427.16 291.6 419.56 284.4 431.46 273.2z" />
      </svg>
      </span>
    </div>
    <div class="radiocont uk-grid uk-width-1-1 uk-margin-remove">
      <div v-for="item in radiolist" :key="item.id" class="radioli uk-width-1-3">
        <div class="radioimg" @click="toRadio(item)">
          <img v-lazy="item.picUrl"/>
          <p class="uk-margin-remove uk-text-truncate">{{item.name}}</p>
        </div>
        <p class="uk-margin-remove uk-text-truncate">{{item.desc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {getRadiolist} from '../api'
import {mapMutations} from 'vuex'
// 获取渲染电台类型列表
export default {
  name: 'RadioList',
  data () {
    return {
      radiolist: []
    }
  },
  props: ['type'],
  created () {
    this._getRadiolist(this._props.type)
  },
  watch: {
    type () {
      this._getRadiolist(this._props.type)
    }
  },
  methods: {
    _getRadiolist (type) {
      getRadiolist(type).then((res) => {
        this.radiolist = res.result.djRadios
      })
    },
    toRadio (item) {
      this.setradio(item)
      this.$router.push({name: 'radioDetail'})
      // console.log(item)
    },
    ...mapMutations({setradio: 'setradio'})
  }
}
</script>

<style scoped>
.radio{font-size:0.8rem;color:black;}
.radiohead{font-size:1.5em;padding:1vh 2vw;}
.radiocont{padding:0 0.5vw;}
.radioli{padding:2.5vh 0.5vw;}
.radioli p{font-size:1.1em;}
.radioimg{position:relative;}
.radioimg img{border-radius: 5px;}
.radioimg::after{
    position:absolute;bottom:0;left:1vw;content:'';
    width:30vw;height:4vh;background-color:grey;filter:blur(5px);opacity:0.4;}
.radioimg p{position:absolute;bottom:0;left:1vw;color:white;font-size: 1em;z-index: 5;}
</style>
