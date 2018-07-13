import io from 'socket.io-client'
import Vue from 'vue'
export const store = new Vue({
  data: {
    tweets: []
  }
})

export default {
  install (Vue) {
    // Connect to socket.io
    const socket = io.connect()
    Vue.prototype.$store = store
    socket.on('connect', () => {
      console.log('connect')
    })
    socket.on('newTweet', (tweet) => {
      // console.log(tweet)
      store.tweets.push({tweet})
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
