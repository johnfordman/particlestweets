/* eslint-disable no-unused-vars */
import Icon from 'bourgeon/Icon.vue'
import Router from 'bourgeon/router'

export default {
  install (Vue, options) {
    Vue.use(Router)
    Vue.component('icon', Icon)
  }
}
