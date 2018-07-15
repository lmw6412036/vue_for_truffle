import Vue from 'vue'
import Router from 'vue-router'
import My from './my'
import Account from './account'
import Asset from './asset'
import Market from './market'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/asset'
    },
    ...Asset,
    ...My,
    ...Account,
    ...Market
  ]
})
