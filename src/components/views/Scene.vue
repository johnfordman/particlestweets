<template>
  <div class="page-scene">
  </div>
</template>

<script>
  import * as PIXI from 'pixi.js'
  import {TweenMax} from 'gsap'
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
          transparent: true,
          antialias: true
          // forceFXAA: true
        })
        container.appendChild(app.view)
        // Tweet text
        let tweetText = new PIXI.Text('Hover a particle to see its contents', {
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
          var radius = utils.map(Math.random(), 0, 1, 5, 30)
          const minPos = radius
          const maxPosX = width - radius
          const maxPoY = height - radius
          let randomX = utils.map(Math.random(), 0, 1, minPos, maxPosX)
          let randomY = utils.map(Math.random(), 0, 1, minPos, maxPoY)
          let alpha = utils.map(Math.random(), 0, 1, 0.2, 1)
          let randomColor = colors[Math.floor(Math.random() * colors.length)]
          // add new particle to screen
          createParticle(randomX, randomY, radius, alpha, randomColor, tweet)
         // console.log(tweet.length)
        })
        // Resize canvas && property
        window.addEventListener('resize', onWindowResize, false)
        /* Methods */
        function createParticle (x, y, radius, alpha, color, lastTweet) {
          let particle = new PIXI.Graphics()
          particle.beginFill(`0x${color}`)
          particle.drawCircle(0, 0, radius)
          particle.endFill()

          var texture = particle.generateCanvasTexture()
          // Create Sprite and apply texture
          var particleSprite = new PIXI.Sprite(texture)
          particleSprite.alpha = 0
          particleSprite.x = x
          particleSprite.y = y
          particleSprite.interactive = true
          particleSprite.buttonMode = true
          particleSprite.anchor.set(0.5)
          particleSprite.scale.set(0, 0)
          particleSprite.data = lastTweet
          entryParticle(particleSprite, alpha)
          particleSprite.mouseover = function (e) {
            tweetText.text = this.data
            TweenMax.to(this.scale, 0.5, {x: 1.2, y: 1.2})
          }
          particleSprite.mouseout = function (e) {
            tweetText.text = this.data
            TweenMax.to(this.scale, 0.5, {x: 1, y: 1})
          }
          particleSprite.click = function (e) {
            destroyParticle(this)
          }
          // Add the graphics to the stage
          app.stage.addChild(particleSprite)
        }
        function entryParticle (particle, alpha) {
          TweenMax.to(particle.scale, 0.5, {x: 1, y: 1})
          TweenMax.to(particle, 0.5, {alpha: alpha})
        }
        function destroyParticle (particle) {
          TweenMax.to(particle.scale, 0.5, {x: 3, y: 3})
          TweenMax.to(particle, 0.5, {alpha: 0,
            onComplete: function () {
              particle.destroy()
            }
          })
        }
        function onWindowResize () {
          width = window.innerWidth
          height = window.innerHeight
          tweetText.position.set(width / 2, height / 2)
          app.renderer.resize(width, height)
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
