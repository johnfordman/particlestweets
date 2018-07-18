<template>
  <div class="page-scene"></div>
</template>

<script>
  import * as PIXI from 'pixi.js'
  import utils from '../../utils/'
  import Particle from '../Particle'
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([
      'lastTweet'
    ]),
    methods: {
      initPixi () {
        const container = document.querySelector('.page-scene')
        let width = window.innerWidth
        let height = window.innerHeight
        const resolution = 1
        const colors = ['ff0099', 'f3f315', '83f52c', 'ff6600', '6e0dd0']

        const app = new PIXI.Application(width, height, {
          resolution: resolution,
          autoResize: true,
          transparent: true,
          antialias: true
        })
        container.appendChild(app.view)
        // Score text
        let scoreText = new PIXI.Text('Score : 0', {
          fontFamily: 'Helvetica',
          fontSize: 22,
          lineHeight: 16,
          fill: 'black',
          align: 'left'
        })
        // Positioning score text
        scoreText.x = 10
        scoreText.y = 10

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
        app.stage.addChild(tweetText, scoreText)

        let particle = new Particle(tweetText, app, scoreText)
        // Watch lastTweet property
        this.$watch('lastTweet', (tweetObj) => {
          const tweet = tweetObj.tweet
          var radius = utils.map(Math.random(), 0, 1, 5, 30)
          const minPos = radius
          const maxPosX = width - radius
          const maxPoY = height - radius
          let randomX = utils.map(Math.random(), 0, 1, minPos, maxPosX)
          let randomY = utils.map(Math.random(), 0, 1, minPos, maxPoY)
          let speedX = utils.map(Math.random(), 0, 1, 0.1, 3.5)
          let speedY = utils.map(Math.random(), 0, 1, 0.1, 3.5)
          let alpha = utils.map(Math.random(), 0, 1, 0.2, 1)
          let randomColor = colors[Math.floor(Math.random() * colors.length)]
          // add new particle to screen
          particle.init(randomX, randomY, radius, alpha, randomColor, tweet, speedX, speedY)
        })
        app.ticker.add(() => {
          particle.update()
        })
        // Resize canvas && property
        window.addEventListener('resize', onWindowResize, false)
        /* Methods */
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
