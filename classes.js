const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

class Sobakai {
  constructor () {
    this.w = 120
    this.h = 140
    this.dx = 0
    this.x = (width - this.w) / 2 + this.dx
    this.y = height - this.h
    this.hp = 3

    this.direction = 0

    this.can_shoot = true
    this.bullets = []
    this.bullets_amount
    this.image = new Image()
    this.image.src = '/images/sobakai.png'
  }

  update(ctx) {
    this.move()
    this.draw(ctx)
    if (this.bullets[0]?.y < -this.bullets[0]?.h)
      delete this.bullets.shift()
    this.bullets.forEach(el => {
      el.update(ctx)
    })
  }

  draw(ctx) {
    ctx.shadowBlur = 0
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
  }

  setMove(x) {
    this.direction = x
  }

  move() {
    this.dx += this.direction * 3
    this.x = (width - this.w) / 2 + this.dx
  }

  shoot() {
    if (!this.can_shoot) return

    this.bullets.push(new Bullet(this.x + this.w / 2, this.y + 25, 10, 15, -3, '#4af531'))
    this.can_shoot = false
    setTimeout(() => this.can_shoot = true, 300)
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
}

class Enemy {
  constructor (x, y, w, h, dx, dy, hp, image) {
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

    this.can_shoot = true
    this.bullets = []
  }

  update(ctx) {
    this.setMove()
    this.move()
    this.draw(ctx)
    this.shoot()
  }

  setMove() {
    if (this.x == 0 || this.x == width - this.w) 
      return this.direction = -this.direction

    if (Math.random() < 0.01)
      return this.direction = -this.direction
  }

  move() {
    this.x += this.direction * this.dx
    this.y += this.dy
  }

  shoot() {
    const rand = Math.random()
    if (!this.can_shoot) return
    if (rand > 0.5) return

    const color = '#8a2bd6'

    if (rand == 0) {
      this.bullets.push(new Bullet(this.x + this.w / 2, this.y + 25, 10, 15, 3, color))
    }
    this.bullets.push(new Bullet(this.x + this.w / 2, this.y + 25, 10, 15, 3, color))
    this.can_shoot = false
    setTimeout(() => this.can_shoot = true, 600)
  }

  draw(ctx) {
    ctx.shadowBlur = 0
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
  }
}

function clear(ctx) {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
  }
  
  function drawBg(ctx) {
    ctx.drawImage(bg, 0, 0);
  }