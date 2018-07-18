// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Bourgeon from './components/bourgeon'
import App from './App'
import dataManager from './dataManager/index.js'
import store from './store'

Vue.use(Bourgeon, {
  locales: ['fr', 'en']
})

Vue.use(dataManager)

export const bus = new Vue()

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  store
}).$mount('#app')
