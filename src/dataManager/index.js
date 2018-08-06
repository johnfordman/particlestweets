import io from 'socket.io-client'
import store from '../store'

export default {
  install () {
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
  }
}
