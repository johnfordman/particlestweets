<template>
  <div class="page-scene">
  </div>
</template>

<script>
  import * as PIXI from 'pixi.js'
  import utils from '../../utils/'

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
          }
        })
      },
      initPixi () {
        const container = document.querySelector('.page-scene')
        let width = window.innerWidth
        let height = window.innerHeight
        const resolution = 1
        const colors = ['ff0099', 'f3f315', '83f52c', 'ff6600', '6e0dd0']
        // const resolution = window.devicePixelRatio

        const app = new PIXI.Application(width, height, {
          resolution: resolution,
          autoResize: true,
          transparent: true
          // antialias: true,
          // forceFXAA: true
        })
        container.appendChild(app.view)
        // Tweet text
        let tweetText = new PIXI.Text('The tweets are coming!', {
          fontFamily: 'Helvetica',
          fontSize: 14,
          lineHeight: 16,
          fill: 'black',
          align: 'left'
        })

        // Center tweet
        tweetText.anchor.set(0.5, 0.5)
        tweetText.position.set(width / 2, height / 2)
        // add text to screen
        app.stage.addChild(tweetText)
      
        // Watch lastTweet property
        this.$watch('lastTweet', (tweet) => {
          tweetText.text = tweet
          var radius = utils.map(Math.random(), 0, 1, 5, 30)
          const minPos = radius
          const maxPosX = width - radius
          const maxPoY = height - radius
          let randomX = utils.map(Math.random(), 0, 1, minPos, maxPosX)
          let randomY = utils.map(Math.random(), 0, 1, minPos, maxPoY)
          let alpha = utils.map(Math.random(), 0, 1, 0.2, 1)
          let randomColor = colors[Math.floor(Math.random() * colors.length)]
          // add new particle to screen
          createParticle(randomX, randomY, radius, alpha, randomColor)
         // console.log(tweet.length)
        })
        /* Methods */
        function createParticle (x, y, radius, alpha, color) {
          let particle = new PIXI.Graphics()
          particle.beginFill(`0x${color}`)
          particle.alpha = alpha
          particle.drawCircle(x, y, radius)
          particle.endFill()
          particle.interactive = true
          particle.buttonMode = true
          particle.hitArea = new PIXI.Circle(x, y, radius)
          particle.click = function (e) {
            console.log(this, e)
          }
          // Add the graphics to the stage
          app.stage.addChild(particle)
        }
      }
    },
    mounted () {
      this.initPixi()
      this.getLastTweet()
    }
  }
</script>
<style lang="stylus">
  canvas {
    position absolute
    top 0
    left 0
    right 0
    bottom 0
  }
</style>
