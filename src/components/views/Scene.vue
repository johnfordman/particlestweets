<template>
  <div class="page-scene">
    <p>{{lastTweet}}</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        lastTweet: ''
      }
    },
    methods: {
      getLastTweet () {
        this.$store.$watch('tweets', (tweets) => {
          let lastData = tweets[tweets.length - 1]
          let lastTweet = lastData.tweet.text
          if (lastTweet !== this.lastTweet) {
            this.lastTweet = lastTweet
            console.log(this.lastTweet)
          }
        })
      }
    },
    created () {
      this.getLastTweet()
    }
  }
</script>
