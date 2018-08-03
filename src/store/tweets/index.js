// import {FETCH_ARTICLE} from './actio'
import {NEW_TWEET} from '../mutations-types'

const initialState = {
  tweets: []
}

export const state = Object.assign({}, initialState)

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [NEW_TWEET]: (state, tweet) => {
    state.tweets.push({tweet})
  }
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

export default {
  state,
  mutations,
  getters
}
