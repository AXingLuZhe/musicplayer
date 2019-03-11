import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import Music from '../components/Music'
import poPul from '../components/popul'
import hotSinger from '../components/hotSinger'
import Radio from '../components/Radio'
import radiolistDetail from '../components/radiolistDetail'
import Mv from '../components/Mv'
import Search from '../components/Search'
import singerlistDetail from '../components/singerlistDetail'
import playDetail from '../components/playDetail'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: '/mymusic',
  routes: [
    {
      path: '/',
      redirect: '/main/music/popular'
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: [{
        path: 'music',
        name: 'Music',
        component: Music,
        children: [
          {
            path: 'popular',
            name: 'poPul',
            component: poPul
          },
          {
            path: 'hotsinger',
            name: 'hotSinger',
            component: hotSinger
          },
          {
            path: 'radio',
            name: 'Radio',
            component: Radio
          }
        ]
      },
      {
        path: 'mv',
        name: 'Mv',
        component: Mv
      }
      ]},
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/singerdetail',
      name: 'singerDetail',
      component: singerlistDetail
    },
    {
      path: '/radiodetail',
      name: 'radioDetail',
      component: radiolistDetail
    },
    {
      path: '/playdetail',
      name: 'playDetail',
      component: playDetail
    }
  ]
})
