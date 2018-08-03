import Vue from 'vue'
import Vuex from 'vuex'

import tweets from './tweets'
import score from './score'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tweets,
    score
  }
})
