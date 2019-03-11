<template>
  <div id="music">
    <!--音乐区导航-->
    <div class="uk-width-1-1">
      <div id="musicHeader" class="uk-width-1-1">
        <div class="uk-button-group uk-width-1-1 uk-padding-small uk-padding-remove-top">
          <router-link :to="{name:'poPul'}" tag='span' class="uk-text-center uk-width-2-6">
            <span class="musicText">流行</span>
          </router-link>
          <router-link :to="{name:'hotSinger'}" tag='span' class="uk-text-center uk-width-2-6">
            <span class="musicText">歌手</span>
          </router-link>
          <router-link :to="{name:'Radio'}" tag='span' class="uk-text-center uk-width-2-6">
            <span class="musicText">电台</span>
          </router-link>
        </div>
      </div>
    </div>
    <!--子页内容-->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'Music'
}
</script>

<style scoped>
  #music{padding-bottom: 55px;margin-top:129px;}
  #musicHeader{background-color: #d4453a;position:fixed;top:0;z-index:500;margin-top:88px;}
  .musicText{color:white;width:20vw;}
  .router-link-active span{font-weight: bold;border-bottom: 3px solid white;}
</style>
