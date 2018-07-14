import * as PIXI from 'pixi.js'
import {TweenMax} from 'gsap'
import * as glm from 'gl-matrix'
// import { add, vec2 } from 'gl-matrix/src/gl-matrix/vec2'

export default class Particle {
  constructor (tweetText, app) {
    this.tweetText = tweetText
    this.app = app
    this.particleArr = []
    console.log(glm)
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
    particleSprite.mouseout = (e) => {
      TweenMax.to(this.tweetText, 0.3, {alpha: 0})
      TweenMax.to(particleSprite.scale, 0.5, {x: 1, y: 1})
    }
    particleSprite.click = (e) => {
      this.destroyParticle(particleSprite)
    }
    // Add the graphics to the stage
    this.app.stage.addChild(particleSprite)
    this.particleArr.push(particleSprite)
  }

  update () {
    for (let i = 0; i < this.particleArr.length; i++) {
      let location = this.particleArr[i].location
      let velocity = this.particleArr[i].velocity
      location = glm.vec2.add(location, location, velocity)
      console.log(location)
    }
  }

  entryParticle (particle, alpha) {
    TweenMax.to(particle.scale, 0.5, {x: 1, y: 1})
    TweenMax.to(particle, 0.5, {alpha: alpha})
  }
  destroyParticle (particle) {
    TweenMax.to(this.tweetText, 0.3, {alpha: 0})
    TweenMax.to(particle.scale, 0.5, {x: 3, y: 3})
    TweenMax.to(particle, 0.5, {alpha: 0,
      onComplete: function () {
        particle.destroy()
      }
    })
  }
}
