import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  score: 0,
  tweets: []
}

const mutations = {
  increment (state) {
    state.count++
  },
  NEW_TWEET: (state, tweet) => {
    state.tweets.push({tweet})
  }
}

const actions = {
  increment: ({ commit }) => commit('increment')
}

const getters = {
  tweets: state => state.tweets,
  lastTweet: state => {
    if (state.tweets.length > 0) {
      return state.tweets.slice(-1)[0]
    } else {
      return ''
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
