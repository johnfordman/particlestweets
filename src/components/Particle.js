import * as PIXI from 'pixi.js'
import {TweenMax} from 'gsap'
import * as glm from 'gl-matrix'
// import { add, vec2 } from 'gl-matrix/src/gl-matrix/vec2'

export default class Particle {
  constructor (tweetText, app, scoreText) {
    this.tweetText = tweetText
    this.scoreText = scoreText
    this.app = app
    this.particleArr = []
    this.score = 0
  }

  init (x, y, radius, alpha, color, lastTweet, speedX, speedY) {
    let particle = new PIXI.Graphics()
    let location = glm.vec2.create()
    let velocity = glm.vec2.create()
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
    location = glm.vec2.fromValues(x, y)
    velocity = glm.vec2.fromValues(speedX, speedY)
    particleSprite.location = location
    particleSprite.velocity = velocity
    this.entryParticle(particleSprite, alpha)

    particleSprite.mouseover = (e) => {
      this.tweetText.text = particleSprite.data
      TweenMax.to(particleSprite.scale, 0.5, {x: 1.2, y: 1.2})
      TweenMax.to(this.tweetText, 0.3, {alpha: 1})
    }
    particleSprite.click = (e) => {
      this.score++
      this.destroyParticle(particleSprite, this.score)
    }
    // Add the graphics to the stage
    this.app.stage.addChild(particleSprite)
    this.particleArr.push(particleSprite)
  }

  update () {
    for (let i = 0; i < this.particleArr.length; i++) {
      let location = this.particleArr[i].location
      let velocity = this.particleArr[i].velocity
      glm.vec2.add(location, location, velocity)
      if (location[0] > window.innerWidth || location[0] < 0) {
        velocity[0] = velocity[0] * -1
      }

      if (location[1] > window.innerHeight || location[1] < 0) {
        velocity[1] = velocity[1] * -1
      }
      this.particleArr[i].x = location[0]
      this.particleArr[i].y = location[1]
    }
  }

  entryParticle (particle, alpha) {
    TweenMax.to(particle.scale, 0.5, {x: 1, y: 1})
    TweenMax.to(particle, 0.5, {alpha: alpha})
    this.getEntrySound()
  }
  destroyParticle (particle, score) {
    this.scoreText.text = `Score : ${score}`
    TweenMax.to(this.tweetText, 0.3, {alpha: 0})
    TweenMax.to(particle.scale, 0.5, {x: 3, y: 3})
    TweenMax.to(particle, 0.5, {alpha: 0,
      onComplete: () => {
        let index = this.particleArr.indexOf(particle)
        this.particleArr.splice(index, 1)
        particle.destroy()
      }
    })
  }
  getEntrySound () {
    let soundURL = '../../static/audio/bruitage_msg.mp3'
    var sound = document.createElement('audio')
    sound.id = 'audio-player'
    sound.src = soundURL
    sound.type = 'audio/mpeg'
    sound.load()
    sound.play()
  }
}
