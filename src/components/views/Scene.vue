<template>
  <div class="page-scene">
  </div>
</template>

<script>
  import * as PIXI from 'pixi.js'
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
        const resolution = window.devicePixelRatio

        const app = new PIXI.Application(width, height, {
          resolution: resolution,
          autoResize: true,
          transparent: true,
          antialias: true,
          forceFXAA: true
        })
        container.appendChild(app.view)
        var textSample = new PIXI.Text('The tweets \n are coming!', {
          fontFamily: 'Helvetica',
          fontSize: 14,
          lineHeight: 16,
          fill: 'black',
          align: 'left'
        })
        this.$watch('lastTweet', (tweet) => {
          textSample.text = tweet
        })
        textSample.position.set(20)
        app.stage.addChild(textSample)
        createParticle(20, 20, 20)

        function createParticle (x, y, radius) {
          var graphics = new PIXI.Graphics()
          graphics.beginFill(0xe74c3c)
          graphics.drawCircle(x, y, radius)
          graphics.endFill()
          graphics.interactive = true
          graphics.buttonMode = true
          graphics.hitArea = new PIXI.Circle(x, y, radius)
          graphics.click = function (e) {
            console.log(this, e)
          }
          // Add the graphics to the stage
          app.stage.addChild(graphics)
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
