<template>
  <div class="mvlist">
    <div class="mvHead">
      <span>{{type}}</span>
      <span>
        <svg class="icon" width="40px" height="30px" viewBox="0 0 1099 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path fill="#000000" d="M431.46 273.2c8.1-6.4 14.3-6.5 24 3.3 0 0 200.1 194.3 207.7 201.9 5.8 5.8 9.7 10.2 9.7 16.9 0 7.5-3.9 12.8-9.7 18.1L454.96 716.5c-7.9 7.7-13.8 12.1-23.2 3.7-10.7-9.8-7-13.9 3.9-26l205.3-198.6L437.16 301C427.16 291.6 419.56 284.4 431.46 273.2z" />
      </svg>
      </span>
    </div>
    <div class="mvCont uk-grid uk-width-1-1 uk-margin-remove">
      <div id="mvList" v-for="(item, index) in mvList" :key="item.id" :class="{'uk-width-1-2': index !==0}">
        <div @click="$emit('setMv',item)" class="mvImg">
          <img v-lazy="item.cover"/>
          <p class="uk-margin-remove uk-text-truncate">
            <span>
              <svg class="icon" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path fill="#ffffff" d="M179.796 369.171c-10.762 0-19.489 8.725-19.489 19.487 0 10.766 8.727 19.489 19.489 19.489 10.764 0 19.489-8.723 19.489-19.489 0-10.762-8.726-19.487-19.489-19.487z m769.18-57.106a19.409 19.409 0 0 0-19.888 0.743L705.996 460.173V349.68c0-43.053-34.904-77.953-77.955-77.953H140.818c-43.053 0-77.953 34.901-77.953 77.953v389.776c0 43.055 34.901 77.955 77.953 77.955H628.04c43.051 0 77.955-34.901 77.955-77.955v-93.93l222.94 149.59a19.454 19.454 0 0 0 19.964 0.877 19.47 19.47 0 0 0 10.239-17.15V329.174a19.473 19.473 0 0 0-10.162-17.109z m-281.96 180.688a19.547 19.547 0 0 0-0.4 3.903v112.063c0 1.321 0.14 2.624 0.4 3.894v126.845c0 21.527-17.452 38.98-38.976 38.98H140.818c-21.525 0-38.978-17.452-38.978-38.98V349.68c0-21.525 17.452-38.978 38.978-38.978H628.04c21.523 0 38.976 17.452 38.976 38.978v143.073z m253.146 249.929L705.996 598.48v-91.471l214.166-142.055v377.728z" />
              </svg>
            </span>
            {{item.playCount}}</p>
        </div>
        <p class="uk-margin-remove uk-text-truncate">{{item.artistName}}</p>
        <p class="uk-margin-remove uk-text-truncate">{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {getMVlist} from '../api'

export default {
  name: 'mv-list',
  props: [
    'type'
  ],
  data () {
    return {
      mvList: []
    }
  },
  created () {
    this._getMVlist(this._props.type)
  },
  watch: {
    // 搜索时类型改变即更新
    type () {
      this._getMVlist(this._props.type)
    }
  },
  methods: {
    _getMVlist (type) {
      let num = 7
      if (type !== '最热' && type !== '最新' && type !== '精选') {
        num = 5
      }
      getMVlist(type, num).then((res) => {
        this.mvList = res.result.mvs
      })
    }
  }
}
</script>

<style scoped>
  .mvlist{font-size:0.8rem;color:black;overflow: hidden;}
  .mvHead{font-size:1.5em;padding:2vh 2vw;}
  .mvCont p{font-size: 1em;}
  #mvList{padding:2.5vh 1vw;}
  .mvImg{position:relative;}
  .mvImg img{border-radius:4px;}
  .mvImg::after{
    content:'';position:absolute;top:1.6vh;width:102%;height:2vh;
    background-color: grey;filter:blur(15px);}
  .mvImg p{position:absolute;top:0;right:0.5vw;font-size: 1em;color:white;z-index:5;}
</style>
