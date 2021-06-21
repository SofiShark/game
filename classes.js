const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

class Sobakai {
  constructor () {
    this.w = 90
    this.h = 120
    this.dx = 0
    this.x = (width - this.w) / 2 + this.dx
    this.y = height - this.h
    this.hp = 3

    this.direction = 0

    this.impregnable = false
    this.can_shoot = true
    this.bullets = []
    this.image = new Image()
    this.image.src = '/images/sobakai.png'
  }

  update(ctx) {
    this.move()
    this.draw(ctx)
  }

  draw(ctx) {
    ctx.shadowBlur = 0
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
  }

  setMove(x) {
    this.direction = x
  }

  move() {
    if (control_type.value == 'mouse') return
    if (this.x < -this.w / 2 && this.direction == -1) return 
    if (this.x > width - this.w / 2 - 10 && this.direction == 1) return
    this.dx += this.direction * 5
    this.x = (width - this.w) / 2 + this.dx
  }

  shoot() {
    if (!this.can_shoot) return

    this.bullets.push(new Bullet(this.x + this.w / 2, this.y + 25, 10, 15, -6, '#4af531'))
    this.can_shoot = false
    setTimeout(() => this.can_shoot = true, 400)
  }

  collision(node) {
    return !(this.x + this.w < node.x || this.y + this.h < node.y || this.x > node.x + node.w || this.y > node.y + node.h)
  }
}

class Bullet {
  constructor (x, y, w, h, dy, color) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.direction = dy
    this.color = color
    this.damaged = false
  }

  update(ctx) {
    this.move(ctx)
    this.draw(ctx)
  }

  move() {
    this.y += this.direction
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.shadowColor = "#fce862"
    ctx.shadowBlur = 6
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }

  collision(node) {
    return !(this.x + this.w < node.x || this.y + this.h < node.y || this.x > node.x + node.w || this.y > node.y + node.h)
  }
}

class Enemy {
  constructor (x, y, w, h, dx, dy, hp, image, can_shoot) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.dx = dx
    this.dy = dy
    this.hp = hp
    this.image = new Image()
    this.image.src = image
    this.direction = 1

    this.can_shoot = can_shoot
    this.bullets = []
  }

  update(ctx) {
    this.setMove()
    this.move()
    this.draw(ctx)
    this.shoot()
  }

  setMove() {
    if (this.x < 0 || this.x > width - this.w) 
      return this.direction = -this.direction

    if (Math.random() < 0.01)
      return this.direction = -this.direction
  }

  move() {
    this.x += this.direction * this.dx
    this.y += this.dy
  }

  shoot() {
    if (!this.can_shoot) return

    const rand = Math.random()
    if (rand > 0.1) return

    const color = '#8a2bd6'

    if (rand < 0.02) {
      this.bullets.push(new Bullet(this.x + 30 + this.w / 2, this.y + this.h, 10, 15, 6, color))
    }
    this.bullets.push(new Bullet(this.x + this.w / 2, this.y + this.h, 10, 15, 6, color))
    this.can_shoot = false
    setTimeout(() => this.can_shoot = true, 1300)
  }

  draw(ctx) {
    ctx.shadowColor = "#eb7bf3"
    ctx.shadowBlur = 10
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
  }

  collision(node) {
    return !(this.x + this.w < node.x || this.y + this.h < node.y || this.x > node.x + node.w || this.y > node.y + node.h);
  }
}