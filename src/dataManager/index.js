import io from 'socket.io-client'
import Vue from 'vue'
export const store = new Vue({
  data: {
    user: {}
  }
})

export default {
  install (Vue, options) {
    console.log(options)
    // Connect to socket.io
    const socket = io(options.api)
    Vue.prototype.$store = store
    socket.on('connect', () => {
      console.log('connect')
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
