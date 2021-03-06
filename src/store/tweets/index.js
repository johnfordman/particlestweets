// import {FETCH_ARTICLE} from './actio'
import {NEW_TWEET} from '../mutations-types'
import {GET_TWEET} from '../actions-types'

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
const actions = {
  [GET_TWEET]: ({ commit }, tweet) => {
    commit([NEW_TWEET], tweet)
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
  actions,
  getters
}
