import {INCREMENT_SCORE} from '../mutations-types'

const initialState = {
  score: 0
}

export const state = Object.assign({}, initialState)

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [INCREMENT_SCORE] (state, n) {
    state.score += n
  }
}

const getters = {
  score: state => state.score
}

export default {
  state,
  mutations,
  getters
}
