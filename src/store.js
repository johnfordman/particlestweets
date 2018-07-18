import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  score: 0,
  tweets: []
}

const mutations = {
  INCREMENT_SCORE (state, n) {
    state.score += n
  },
  NEW_TWEET: (state, tweet) => {
    state.tweets.push({tweet})
  }
}

const getters = {
  score: state => state.score,
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
  getters
})
