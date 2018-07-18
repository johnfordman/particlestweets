import io from 'socket.io-client'
import store from '../store'

export default {
  install (Vue) {
    // Connect to socket.io
    const socket = io.connect()
    let lastTweet = ''
    socket.on('connect', () => {
      console.log('connect')
    })
    socket.on('newTweet', (tweet) => {
      if (lastTweet !== tweet.text) {
        store.commit('NEW_TWEET', tweet.text)
      }
      lastTweet = tweet.text
    })
    Vue.mixin({
      methods: {
        connect (username, avatarURL) {
          socket.emit('user connected', {username, avatarURL})
        }
      }
    })
  }
}
