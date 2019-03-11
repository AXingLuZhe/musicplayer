<template>
  <div id="songlist">
    <!--搜索列表-->
    <div>
      <p class="radioSearch uk-margin-remove">
        <input class="uk-input" ref="search" @keyup.13="searchCont" type="text" placeholder="搜索电台..."/>
      </p>
      <div>
        <radio-list v-if="this.searchType !== ''" :type="this.searchType"></radio-list>
      </div>
    </div>
    <!--默认列表-->
    <div v-for="(item,index) in radioType" :key="index + 1">
      <radio-list :type="item"></radio-list>
    </div>
  </div>
</template>

<script>
import RadioList from '../base/radio-list'

export default {
  name: 'radio',
  data () {
    return {
      radioType: ['人文历史', '外语世界', '美文读物', '音乐故事', '广播剧', '商业财经'],
      searchType: ''
    }
  },
  methods: {
    searchCont () {
      this.searchType = this.$refs.search.value
    }
  },
  components: {RadioList}
}
</script>

<style scoped>
  .radioSearch{padding:1vh 10vw;}
  .radioSearch input{border-radius: 20px;height: 4vh;}
</style>
