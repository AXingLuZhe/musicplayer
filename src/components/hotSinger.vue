<template>
  <div id="singer">
    <!--搜索列表-->
    <div>
      <p class="singerSearch uk-margin-remove">
        <input class="uk-input" ref="search" @keyup.13="searchCont" type="text" placeholder="搜索歌手..."/>
      </p>
      <div>
        <singer-list v-if="this.searchType !== ''" :type="this.searchType"></singer-list>
      </div>
    </div>
    <!--默认列表-->
    <div v-for="(item, index) in singerType" :key="index">
     <singer-list :type="item"></singer-list>
    </div>
  </div>
</template>

<script>
import SingerList from '../base/singer-list'

export default {
  name: 'hotSinger',
  data () {
    return {
      singerType: ['流行', '男', '女'],
      searchType: ''
    }
  },
  methods: {
    searchCont () {
      this.searchType = this.$refs.search.value
    }
  },
  components: {SingerList}
}
</script>

<style scoped>
.singerSearch{padding:1vh 10vw;}
.singerSearch input{border-radius: 20px;height: 4vh;}
</style>
