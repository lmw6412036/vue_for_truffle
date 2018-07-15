// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.common.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import install from './lib/install'

import {getParamsFromUrl, makeUrl} from "./lib/utils";
import {openidCache} from "./lib/cache";

Vue.use(install);

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  next();
});

Vue.config.productionTip = false

let urlParams = getParamsFromUrl(location.href), {query} = urlParams;

if (!openidCache.get()) {
  location.replace("oauth2.html?callback=" + encodeURIComponent(location.href));
} else if (!query || !query.version) {
  query = Object.assign({}, query, {version: VERSION});
  location.replace(makeUrl(Object.assign({}, urlParams, {query})));
} else {
  //通过一个空的vue实例放出一个全局的方法
  window.bus = new Vue();
  new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
  })
}
/* eslint-disable no-new */

